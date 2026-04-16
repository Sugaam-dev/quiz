import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

const rules = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A5EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
    text: "50 questions · 120 marks total · 90 minutes duration.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A5EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    text: "Each question has its own 108-second timer that resets automatically on every new question.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A5EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    text: "Topics covered: MCQs, Logical Reasoning, Visual & Spatial Ability, and General Aptitude.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A5EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    text: "Questions on Design Principles & Elements — identify patterns, composition, colour, and visual concepts.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A5EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
    text: "Questions on Monument & Architecture Identification — recognise famous buildings, architects, and styles.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A5EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    text: "Each question carries 2 or 3 marks as specified alongside the question.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A5EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    text: "No negative marking — a wrong or unattempted answer scores zero, nothing is deducted.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A5EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    text: "All 50 questions are compulsory. Every question must be attempted before submitting.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A5EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
    text: "If the timer runs out, the quiz auto-advances to the next question with no answer recorded for that question.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A5EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
      </svg>
    ),
    text: "Use the Previous button at any time to go back and change your answer on any earlier question.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A5EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
    text: "Some questions display images — either as part of the question or as answer choices. Ensure a stable internet connection.",
  },
];

const Home = ({ onStart }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const handleStart = () => {
    if (!name.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onStart(name.trim());
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        background: "#F0EDE6",
      }}
    >
      <div
        style={{
          background: "#FAFAF8",
          borderRadius: "20px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05)",
          border: "1px solid #ECEAE4",
          padding: "2.25rem",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.75rem" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "9px",
              background: "#2A5EE8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3 6.27L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1L12 2z" />
            </svg>
          </div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: "#1C1B18" }}>
            NATA APTITUDE MOCK TEST 2026 – PART B
          </span>
        </div>

        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "24px", color: "#1C1B18", lineHeight: 1.3, marginBottom: "6px" }}>
          Ready to test your knowledge?
        </h1>
        <p style={{ fontSize: "14px", color: "#5C5A54", marginBottom: "1.75rem", lineHeight: 1.6 }}>
          Enter your name and start the timed quiz. Each question has its own countdown.
        </p>

        {/* Name field */}
        <label
          style={{
            display: "block",
            fontSize: "12px",
            fontWeight: 600,
            color: "#5C5A54",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "7px",
          }}
        >
          Your name{" "}
          <span style={{ color: "#2A5EE8", fontSize: "14px" }}>*</span>
        </label>
        <InputField
          value={name}
          onChange={(e) => { setName(e.target.value); setError(false); }}
          placeholder="e.g. Arjun Sharma"
          error={error}
        />
        {error && (
          <p style={{ fontSize: "12px", color: "#B5373A", marginTop: "5px" }}>
            Please enter your name to begin.
          </p>
        )}

        {/* Rules */}
        <div
          style={{
            background: "#F4F3EF",
            borderRadius: "8px",
            padding: "1rem 1.1rem",
            margin: "1.25rem 0 1.6rem",
            border: "1px solid #ECEAE4",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              color: "#9A9890",
              marginBottom: "10px",
            }}
          >
            Before you start
          </p>
          {rules.map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "9px",
                fontSize: "13px",
                color: "#5C5A54",
                lineHeight: 1.5,
                marginBottom: i < rules.length - 1 ? "8px" : 0,
              }}
            >
              <span style={{ marginTop: "1px", flexShrink: 0 }}>{r.icon}</span>
              <span>{r.text}</span>
            </div>
          ))}
        </div>

        <Button onClick={handleStart} fullWidth>
          Begin test
        </Button>
      </div>
    </div>
  );
};

export default Home;