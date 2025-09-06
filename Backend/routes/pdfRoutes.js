const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const { uploadPDF } = require("../controllers/pdfController");

// Route for PDF upload
router.post("/upload", upload.single("file"), uploadPDF);

module.exports = router;