const PDFDocument = require("pdfkit");
const fontMap = require("../utils/fontMap");

// POST /api/download/pdf
exports.downloadPDF = async (req, res) => {
  try {
    const {
      text,
      language = "English",
      fileName = "simplified_text",
    } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ error: "No text provided to generate PDF." });
    }

    // Create a new PDF document
    const doc = new PDFDocument({ margin: 50 });

    // Handle PDF stream errors (prevents crashing)
    doc.on("error", (err) => {
      console.error("PDF generation error:", err.message);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to generate PDF" });
      }
    });

    // Set headers so browser knows it's a file download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${fileName}.pdf`
    );

    // Pipe PDF to response (streaming)
    doc.pipe(res);

    // Pick correct font
    const font = fontMap[language.toLowerCase()] || fontMap.english;
    console.log("Using font:", font.name, "path:", font.path);

    try {
      if (font.path) {
        doc.registerFont(font.name, font.path);
        doc.font(font.name);
      } else {
        doc.font(font.name);
      }
    } catch (e) {
      console.error("Font load failed, falling back:", e.message);
      doc.font("Helvetica");
    }
    
    // Write text
    doc.fontSize(14).text(text, { align: "left" });

    doc.end();
  } catch (err) {
    console.error("Error generating PDF:", err.message);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};
