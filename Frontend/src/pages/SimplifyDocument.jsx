import { useState, useRef, useEffect } from "react";

const SimplifyDocument = () => {
  const [file, setFile] = useState(null);
  const [simplified, setSimplified] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("simplified_text");
  const [fileType, setFileType] = useState("txt"); // default .txt
  const [language, setLanguage] = useState("English");

  const textareaRef = useRef(null);

  // Auto-resize textarea as content grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset height
      const newHeight = Math.min(textareaRef.current.scrollHeight, 400); // max 400px
      textareaRef.current.style.height = newHeight + "px";
    }
  }, [simplified]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid PDF file.");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (file) {
      alert(`File "${file.name}" is ready to be processed!`);
    } else {
      alert("Please select a PDF first.");
    }
    console.log("Selected file:", file);

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("language", language);

      // Updated endpoint to match backend route
      const res = await fetch("http://localhost:5000/api/document/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSimplified(data.simplifiedText);
      } else {
        alert(data.error || "Failed to simplify document.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong while processing the PDF.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (fileType === "txt") {
      // Old Blob method
      const blob = new Blob([simplified], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (fileType === "pdf" || fileType === "docx") {
      // New API call
      try {
        const endpoint =
          fileType === "pdf"
            ? "http://localhost:5000/api/download/pdf"
            : "http://localhost:5000/api/download/docx";

        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: simplified, language, fileName }),
        });

        if (!res.ok)
          throw new Error(`${fileType.toUpperCase()} download failed`);

        // Convert response to Blob
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}.${fileType}`;
        a.click();

        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error(`Error downloading ${fileType.toUpperCase()}:`, err);
        alert(`Failed to download ${fileType.toUpperCase()}`);
      }
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-[#eae0f9]">
        {/* Card container */}
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-[#8B5FBF] mb-4">
            Simplify a Document
          </h2>
          <p className="text-gray-600 mb-6">
            Upload a PDF document and let us simplify it for you.
          </p>

          {/* File input */}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full border border-[#c18bfa] rounded-lg cursor-pointer p-2 mb-4 bg-[#f5ebff]"
          />

          {/* Upload button */}
          <button
            onClick={handleUpload}
            className="bg-[#8B5FBF] text-white px-6 py-2 rounded-xl shadow hover:bg-[#6d48a5] transition"
          >
            {loading ? "Processing..." : "Upload & Simplify"}
          </button>

          {/* Language Selection */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 m-2 border border-[#c18bfa] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5FBF] mt-2"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Marathi">Marathi</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Bengali">Bengali</option>
          </select>

          {/* Show file name if selected */}
          {file && (
            <p className="mt-4 text-sm text-gray-700">
              Selected: <span className="font-medium">{file.name}</span>
            </p>
          )}

          {/* Show simplified text */}
          {simplified && (
            <div className="mt-4">
              <textarea
                ref={textareaRef}
                value={simplified}
                onChange={(e) => setSimplified(e.target.value)}
                className="w-full border border-[#c18bfa] rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#8B5FBF]"
                placeholder="Simplified text will appear here..."
              />

              {/* Download controls */}
              <div className="flex flex-col sm:flex-row sm:items-center mt-4 gap-2">
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Enter file name"
                  className="flex-1 p-2 border border-[#c18bfa] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5FBF]"
                />
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  className="p-2 border border-[#c18bfa] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5FBF]"
                >
                  <option value="txt">.txt</option>
                  <option value="docx">.docx</option>
                  <option value="pdf">.pdf</option>
                </select>
                <button
                  onClick={handleDownload}
                  className="bg-[#8B5FBF] text-white px-4 py-2 rounded-xl shadow hover:bg-[#6d48a5] transition"
                >
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SimplifyDocument;
