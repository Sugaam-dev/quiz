import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

const rules = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A5EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    text: "108 seconds per question — timer resets each time",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A5EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
    text: "Auto-advances when the timer runs out",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A5EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
      </svg>
    ),
    text: "Use the Previous button to revisit any answer",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A5EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
    text: "Some questions include images in the choices",
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
            Quizcraft
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