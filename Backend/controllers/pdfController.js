const pdfparse = require("pdf-parse");
const queryGroq = require("../services/grokService");

// Helper: split text into chunks
function chunkText(text, chunkSize = 3000) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + chunkSize));
    i += chunkSize;
  }
  return chunks;
}

exports.uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

     // Get language from frontend, default to English if missing
    const language = req.body.language || "English";

    // Extract text from PDF
    const data = await pdfparse(req.file.buffer);
    const rawText = (data.text || "").replace(/\s+/g, " ").trim();

    if (!rawText) {
      return res
        .status(400)
        .json({ error: "No text found in PDF. Is it a scanned document?" });
    }

    console.log("Received PDF:", req.file.originalname, "size:", req.file.size);
    console.log("Raw text length:", rawText.length);

    // Split into chunks and filter out empty/short chunks
    const chunks = chunkText(rawText).filter(chunk => chunk.trim().length > 50);

    if (chunks.length === 0) {
      return res.status(400).json({ error: "No valid text chunks to process." });
    }

    // Limit number of chunks to prevent overload
    const MAX_CHUNKS = 5;
    const limitedChunks = chunks.slice(0, MAX_CHUNKS);

    // Parallel Hugging Face calls with error handling
    const summaries = await Promise.all(
      limitedChunks.map(async (chunk, idx) => {
        try {
          return await queryGroq(chunk, language);
        } catch (err) {
          console.error(`Groq API error for chunk ${idx + 1}:`, err.message);
          return `[Chunk ${idx + 1} could not be simplified]`;
        }
      })
    );

    // Combine summaries into readable text
    const finalSummary = summaries.join("\n\n"); // separate chunks by double newline
    res.json({ simplifiedText: finalSummary });

  } catch (err) {
    console.error("Error processing PDF:", err.message);
    res.status(500).json({ error: "Failed to process PDF" });
  }
};
