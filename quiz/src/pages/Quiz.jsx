import { useState } from "react";
import { questions } from "../data/questions";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import Button from "../components/Button";

const Quiz = ({ onFinish }) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const current = questions[index];
  const isLast = index === questions.length - 1;

  const handleNext = () => {
    if (!isLast) setIndex(index + 1);
    else onFinish(answers);
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleSelect = (optionId) => {
    setAnswers({ ...answers, [current.id]: optionId });
  };

  const progress = ((index + 1) / questions.length) * 100;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F0EDE6",
        padding: "1.5rem 1rem",
      }}
    >
      <div style={{ maxWidth: "580px", margin: "0 auto" }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "14px",
          }}
        >
          <p style={{ fontSize: "13px", color: "#5C5A54", fontFamily: "'DM Sans', sans-serif" }}>
            Question{" "}
            <strong style={{ color: "#1C1B18", fontWeight: 600 }}>{index + 1}</strong>
            {" "}of{" "}
            <strong style={{ color: "#1C1B18", fontWeight: 600 }}>{questions.length}</strong>
          </p>

          {/* Timer — key forces re-mount (reset) on question change */}
          <Timer key={index} duration={108} onTimeUp={handleNext} />
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: "5px",
            background: "#ECEAE4",
            borderRadius: "999px",
            overflow: "hidden",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "#2A5EE8",
              borderRadius: "999px",
              transition: "width 0.4s ease",
            }}
          />
        </div>

        {/* Question card */}
        <QuestionCard
          question={current}
          questionNumber={index + 1}
          selected={answers[current.id]}
          onSelect={handleSelect}
        />

        {/* Navigation */}
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={handlePrev}
            variant="secondary"
            disabled={index === 0}
            fullWidth
          >
            ← Previous
          </Button>
          <Button onClick={handleNext} variant="primary" fullWidth disabled={!answers[current.id]}>
            {isLast ? "Submit" : "Next →"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;