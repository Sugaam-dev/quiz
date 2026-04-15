import Button from "../components/Button";

/**
 * Success
 * Props:
 *   result   — { user_name, total_marks, obtained_marks, percentage }
 *   onRetry  — callback to restart the quiz
 */
const Success = ({ result, onRetry }) => {
  // Fallback to 0 if result is missing
  const obtainedMarks = result?.obtained_marks ?? 0;
  const totalMarks    = result?.total_marks    ?? 0;
  const percentage    = result?.percentage     ?? 0;
  const userName      = result?.user_name      ?? "Student";

  const message =
    percentage === 100
      ? "Perfect score — outstanding!"
      : percentage >= 70
      ? `Great job, ${userName}!`
      : `Keep practising, ${userName}!`;

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
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#EFF6ED",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2D6A2A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "22px",
            color: "#1C1B18",
            marginBottom: "8px",
          }}
        >
          Test submitted!
        </h2>
        <p style={{ fontSize: "14px", color: "#5C5A54", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          All your responses have been recorded. Here's how you did.
        </p>

        {/* Percentage circle */}
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: percentage >= 70 ? "#EFF6ED" : "#FEF3F2",
            border: `3px solid ${percentage >= 70 ? "#2D6A2A" : "#B5373A"}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}
        >
          <span style={{ fontSize: "22px", fontWeight: 700, color: "#1C1B18" }}>
            {Math.round(percentage)}%
          </span>
        </div>

        {/* Score breakdown */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "20px", fontWeight: 700, color: "#1C1B18", margin: 0 }}>
              {obtainedMarks}
            </p>
            <p style={{ fontSize: "12px", color: "#9A9890", margin: 0 }}>Obtained</p>
          </div>

          <div style={{ width: "1px", background: "#ECEAE4" }} />

          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "20px", fontWeight: 700, color: "#1C1B18", margin: 0 }}>
              {totalMarks}
            </p>
            <p style={{ fontSize: "12px", color: "#9A9890", margin: 0 }}>Total</p>
          </div>
        </div>

        {/* Message chip */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#F4F3EF",
            border: "1px solid #ECEAE4",
            borderRadius: "8px",
            padding: "10px 18px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#1C1B18",
            marginBottom: "1.75rem",
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2A5EE8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2l3 6.27L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1L12 2z" />
          </svg>
          {message}
        </div>

        <Button onClick={onRetry} variant="primary">
          Try again
        </Button>
      </div>
    </div>
  );
};

export default Success;