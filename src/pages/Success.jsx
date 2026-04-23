import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Button from "../components/Button";
import api from "../api/api";   

const Success = ({ result, onRetry }) => {
  const reportRef              = useRef(null);
  const [generating, setGenerating]   = useState(false);
  const [downloading, setDownloading] = useState(false);  // ← new

  const obtainedMarks = result?.obtained_marks ?? 0;
  const totalMarks    = result?.total_marks    ?? 0;
  const percentage    = result?.percentage     ?? 0;
  const userName      = result?.user_name      ?? "Student";
  const testName      = result?.test_name      ?? "Mock Test";
  const dateTaken     = new Date().toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  const scoreColor = percentage >= 70 ? "#2D6A2A" : "#B5373A";
  const scoreBg    = percentage >= 70 ? "#EFF6ED" : "#FEF3F2";
  const scoreBand  =
    percentage >= 80 ? "Excellent" :
    percentage >= 60 ? "Good" :
    percentage >= 40 ? "Average" :
    "Needs Improvement";
  const message =
    percentage >= 70
      ? `Great job, ${userName}!`
      : `Keep practising, ${userName}!`;

  const radius        = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset    = circumference - (percentage / 100) * circumference;

  // ── Download PDF (existing — unchanged)
  const handleDownload = async () => {
    const el = reportRef.current;
    if (!el) return;
    setGenerating(true);

    el.style.display = "block";
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });
    el.style.display = "none";

    const imgData = canvas.toDataURL("image/png");
    const pdf     = new jsPDF("p", "mm", "a4");
    const pdfW    = pdf.internal.pageSize.getWidth();
    const pdfH    = (canvas.height * pdfW) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
    pdf.save(`${userName.replace(/\s+/g, "_")}_Mock_report.pdf`);

    setGenerating(false);
  };

  // ── Download Excel (new)
const handleDownloadExcel = async () => {
  if (!result?.attempt_id) return;
  setDownloading(true);
  try {
    const res = await api.get(
      `/results/${result.attempt_id}/download`,
      {
        responseType: "blob",           // ← tells axios to treat response as file
        params: { t: Date.now() },      // ← cache buster
      }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a   = document.createElement("a");
    a.href    = url;
    a.download = `${userName.replace(/\s+/g, "_")}_NATA_report.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error("Excel download failed:", err);
    alert(`Download failed: ${err.response?.data?.detail || err.message}`);
  } finally {
    setDownloading(false);
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F0EDE6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      {/* ── Visible result card ── */}
      <div
        style={{
          background: "#FAFAF8",
          borderRadius: "20px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05)",
          border: "1px solid #ECEAE4",
          padding: "2.5rem",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        {/* Check icon */}
        <div
          style={{
            width: "60px", height: "60px", borderRadius: "50%",
            background: "#EFF6ED", display: "flex",
            alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
            stroke="#2D6A2A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "#1C1B18", marginBottom: "8px" }}>
          Test submitted!
        </h2>
        <p style={{ fontSize: "14px", color: "#5C5A54", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          All your responses have been recorded. Here's how you did.
        </p>

        {/* Score circle */}
        <div
          style={{
            width: "90px", height: "90px", borderRadius: "50%",
            background: scoreBg, border: `3px solid ${scoreColor}`,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}
        >
          <span style={{ fontSize: "22px", fontWeight: 700, color: "#1C1B18" }}>
            {Math.round(percentage)}%
          </span>
        </div>

        {/* Marks */}
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "1.5rem" }}>
          <div>
            <p style={{ fontSize: "20px", fontWeight: 700, color: "#1C1B18", margin: 0 }}>{obtainedMarks}</p>
            <p style={{ fontSize: "12px", color: "#9A9890", margin: 0 }}>Obtained</p>
          </div>
          <div style={{ width: "1px", background: "#ECEAE4" }} />
          <div>
            <p style={{ fontSize: "20px", fontWeight: 700, color: "#1C1B18", margin: 0 }}>{totalMarks}</p>
            <p style={{ fontSize: "12px", color: "#9A9890", margin: 0 }}>Total</p>
          </div>
        </div>

        {/* Message chip */}
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#F4F3EF", border: "1px solid #ECEAE4",
            borderRadius: "8px", padding: "10px 18px",
            fontSize: "14px", fontWeight: 600, color: "#1C1B18",
            marginBottom: "1.75rem",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="#2A5EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3 6.27L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1L12 2z" />
          </svg>
          {message}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

          {/* PDF button — unchanged */}
          <button
            onClick={handleDownload}
            disabled={generating}
            style={{
              width: "100%", padding: "11px", borderRadius: "10px",
              background: generating ? "#9A9890" : "#2A5EE8",
              color: "#fff", border: "none",
              fontSize: "14px", fontWeight: 600,
              cursor: generating ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: "8px",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {generating ? "Generating PDF..." : "Download Report (PDF)"}
          </button>

          {/* Excel button — new */}
          <button
            onClick={handleDownloadExcel}
            disabled={downloading}
            style={{
              width: "100%", padding: "11px", borderRadius: "10px",
              background: downloading ? "#9A9890" : "#1D6F42",  // Excel green
              color: "#fff", border: "none",
              fontSize: "14px", fontWeight: 600,
              cursor: downloading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: "8px",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {downloading ? "Downloading..." : "Download Report (Excel)"}
          </button>

          <Button onClick={onRetry} variant="primary">
            Try again
          </Button>
        </div>
      </div>

      {/* ── Hidden PDF template — unchanged ── */}
      <div
        ref={reportRef}
        style={{
          display: "none",
          position: "fixed",
          top: 0, left: 0,
          width: "794px",
          background: "#ffffff",
          fontFamily: "sans-serif",
          padding: "48px",
          boxSizing: "border-box",
          zIndex: -1,
        }}
      >
        {/* PDF Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "2px solid #2A5EE8", paddingBottom: "20px", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1C1B18", margin: "0 0 4px" }}>
              NATA Performance Report
            </h1>
            <p style={{ fontSize: "12px", color: "#5C5A54", margin: 0 }}>
              Generated on {dateTaken}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "11px", color: "#9A9890", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Score</p>
            <p style={{ fontSize: "22px", fontWeight: 700, color: "#2A5EE8", margin: 0 }}>
              {Math.round(percentage)}%
            </p>
          </div>
        </div>

        {/* Candidate + test info */}
        <div style={{ display: "flex", gap: "48px", marginBottom: "32px" }}>
          <div>
            <p style={{ fontSize: "11px", color: "#9A9890", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>Candidate</p>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "#1C1B18", margin: 0 }}>{userName}</p>
          </div>
          <div>
            <p style={{ fontSize: "11px", color: "#9A9890", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>Test</p>
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#1C1B18", margin: 0 }}>{testName}</p>
          </div>
          <div>
            <p style={{ fontSize: "11px", color: "#9A9890", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>Date</p>
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#1C1B18", margin: 0 }}>{dateTaken}</p>
          </div>
        </div>

        {/* Score stats */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "36px" }}>
          {[
            { label: "Marks Obtained", value: obtainedMarks },
            { label: "Total Marks",    value: totalMarks },
            { label: "Percentage",     value: `${Math.round(percentage)}%` },
            { label: "Performance",    value: scoreBand },
          ].map((s) => (
            <div key={s.label} style={{ flex: 1, background: "#F4F3EF", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
              <p style={{ fontSize: "20px", fontWeight: 700, color: "#2A5EE8", margin: 0 }}>{s.value}</p>
              <p style={{ fontSize: "11px", color: "#9A9890", margin: "4px 0 0" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Donut chart */}
        <div style={{ display: "flex", alignItems: "center", gap: "48px", marginBottom: "36px" }}>
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={radius} fill="none" stroke="#ECEAE4" strokeWidth="14" />
            <circle
              cx="70" cy="70" r={radius} fill="none"
              stroke={scoreColor} strokeWidth="14"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
            />
            <text x="70" y="65" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1C1B18">
              {Math.round(percentage)}%
            </text>
            <text x="70" y="83" textAnchor="middle" fontSize="11" fill="#9A9890">
              Score
            </text>
          </svg>

          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "11px", color: "#9A9890", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 6px" }}>
              Performance Band
            </p>
            <p style={{ fontSize: "22px", fontWeight: 700, color: scoreColor, margin: "0 0 12px" }}>
              {scoreBand}
            </p>
            <div style={{ height: "10px", background: "#ECEAE4", borderRadius: "999px", overflow: "hidden" }}>
              <div style={{ width: `${percentage}%`, height: "100%", background: scoreColor, borderRadius: "999px" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#9A9890", marginTop: "4px" }}>
              <span>0%</span><span>50%</span><span>100%</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid #ECEAE4", paddingTop: "16px", fontSize: "11px", color: "#9A9890" }}>
          This report was automatically generated upon test completion. Results are final.
        </div>
      </div>
    </div>
  );
};

export default Success;