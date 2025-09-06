const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pdfRoutes = require("./routes/pdfRoutes");
const downloadRoutes = require("./routes/downloadRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/document", pdfRoutes);
app.use("/api/download", downloadRoutes);

console.log("pdfRoutes:", pdfRoutes);
console.log("downloadRoutes:", downloadRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
