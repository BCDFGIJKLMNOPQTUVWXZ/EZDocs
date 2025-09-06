// routes/downloadRoutes.js
const express = require("express");
const router = express.Router();
const downloadPDFController = require("../controllers/downloadPDFController");
const downloadDOCXController = require("../controllers/downloadDOCXController");

// POST request because we’re sending text + language in body
router.post("/pdf", downloadPDFController.downloadPDF);
router.post("/docx", downloadDOCXController.downloadDOCX);

module.exports = router;
