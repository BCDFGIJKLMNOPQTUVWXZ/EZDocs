const path = require("path");

const fontMap = {
  hindi: {
    name: "NotoSansDevanagari",
    path: path.join(__dirname, "../fonts/NotoSansDevanagari_Condensed-Regular.ttf"),
  },
  marathi: {
    name: "NotoSansDevanagari",
    path: path.join(__dirname, "../fonts/NotoSansDevanagari_Condensed-Regular.ttf"),
  },
  gujarati: {
    name: "NotoSansGujarati",
    path: path.join(__dirname, "../fonts/NotoSansGujarati_Condensed-Regular.ttf"),
  },
  tamil: {
    name: "NotoSansTamil",
    path: path.join(__dirname, "../fonts/NotoSansTamil_Condensed-Regular.ttf"),
  },
  telugu: {
    name: "NotoSansTelugu",
    path: path.join(__dirname, "../fonts/NotoSansTelugu_Condensed-Regular.ttf"),
  },
  bengali: {
    name: "NotoSansBengali",
    path: path.join(__dirname, "../fonts/NotoSansBengali_Condensed-Regular.ttf"),
  },
  english: {
    name: "Helvetica", // built-in
    path: null,       // no external file needed
  },
};

module.exports = fontMap;
