const { Document, Packer, Paragraph, TextRun } = require("docx");
const fontMap = require("../utils/fontMap");

// POST /api/download/docx
exports.downloadDOCX = async (req, res) => {
  try {
    const {
      text,
      language = "English",
      fileName = "simplified_text",
    } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ error: "No text provided to generate DOCX." });
    }

    const font = fontMap[language.toLowerCase()] || fontMap.english;

    // Create DOCX document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text,
                  font: "Nirmala UI", // font family
                  size: 28, // 14pt (half-point units)
                }),
              ],
            }),
          ],
        },
      ],
    });

    // Set headers for download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${fileName}.docx`
    );

    // Send DOCX as stream
    const buffer = await Packer.toBuffer(doc);
    res.send(buffer);
  } catch (err) {
    console.error("Error generating DOCX:", err.message);
    res.status(500).json({ error: "Failed to generate DOCX" });
  }
};
