import { useState, useEffect } from "react";
import {
  getQuestions,
  startAttempt,
  saveAnswer,
  saveTextAnswer,
  finishTest,
} from "../api/quizApi";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import Button from "../components/Button";

const Quiz = ({ userName, testId, onFinish }) => {
  const [questions, setQuestions]     = useState([]);
  const [index, setIndex]             = useState(0);
  const [answers, setAnswers]         = useState({});
  const [textAnswers, setTextAnswers] = useState({});
  const [attemptId, setAttemptId]     = useState(null);
  const [loading, setLoading]         = useState(true);
  const [submitting, setSubmitting]   = useState(false);
  const [error, setError]             = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const qs = await getQuestions(testId);
        setQuestions(qs);
        const attempt = await startAttempt(userName, testId);
        setAttemptId(attempt.attempt_id);
      } catch (err) {
        console.error("Failed to initialize quiz:", err);
        setError("Failed to load quiz. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  if (loading) return <p style={{ textAlign: "center", marginTop: "3rem" }}>Loading quiz...</p>;
  if (error)   return <p style={{ textAlign: "center", color: "red", marginTop: "3rem" }}>{error}</p>;
  if (!questions.length) return <p style={{ textAlign: "center" }}>No questions found.</p>;

  const current  = questions[index];
  const isLast   = index === questions.length - 1;
  const progress = ((index + 1) / questions.length) * 100;

  const isTextAnswer  = current.marking_type === "text_answer";
  const isMultiSelect = !isTextAnswer && (
    current.question_text?.includes("all answers are right") ||
    current.marking_type === "partial"
  );

  const mapQuestion = (q) => ({
    id: q.id,
    question: q.question_text,
    image: q.image_url || null,
    marks: q.marks,
    marking_type: q.marking_type,
    options: (q.options || []).map((o) => ({
      id: o.id,
      text: o.option_text || "",
      image: o.image_url || null,
    })),
  });

  const mapped         = mapQuestion(current);
  const currentAnswers = answers[current.id] || [];
  const currentText    = textAnswers[current.id] || "";
  const hasAnswer      = isTextAnswer
    ? currentText.trim().length > 0
    : currentAnswers.length > 0;

  const handleSelect = async (optionId) => {
    let newSelected;
    if (isMultiSelect) {
      const prev = answers[current.id] || [];
      newSelected = prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId];
    } else {
      newSelected = [optionId];
    }
    setAnswers((prev) => ({ ...prev, [current.id]: newSelected }));
    try {
      await saveAnswer(attemptId, current.id, newSelected);
    } catch (err) {
      console.error("Failed to save MCQ answer:", err);
    }
  };

  const handleTextChange = (value) => {
    setTextAnswers((prev) => ({ ...prev, [current.id]: value }));
  };

  const handleTextBlur = async () => {
    const text = textAnswers[current.id] || "";
    if (!text.trim()) return;
    try {
      await saveTextAnswer(attemptId, current.id, text);
    } catch (err) {
      console.error("Failed to save text answer:", err);
    }
  };

  const handleNext = async () => {
    if (isTextAnswer && currentText.trim()) {
      try { await saveTextAnswer(attemptId, current.id, currentText); }
      catch (err) { console.error("Failed to save text answer on next:", err); }
    }
    if (!isLast) { setIndex(index + 1); }
    else { handleSubmit(); }
  };

  const handlePrev = () => { if (index > 0) setIndex(index - 1); };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const result = await finishTest(attemptId);
      onFinish({ ...result, attempt_id: attemptId });
    } catch (err) {
      console.error("Failed to submit test:", err);
      setError("Failed to submit test. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F0EDE6", padding: "1.5rem 1rem" }}>
      <div style={{ maxWidth: "580px", margin: "0 auto" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <p style={{ fontSize: "13px", color: "#5C5A54" }}>
            Question <strong>{index + 1}</strong> of <strong>{questions.length}</strong>
          </p>
          <Timer key={index} duration={108} onTimeUp={handleNext} />
        </div>

        <div style={{ height: "5px", background: "#ECEAE4", borderRadius: "999px", marginBottom: "1.5rem" }}>
          <div style={{ width: `${progress}%`, background: "#2A5EE8", height: "100%", borderRadius: "999px", transition: "width 0.3s" }} />
        </div>

        {isMultiSelect && (
          <p style={{ fontSize: "12px", color: "#2A5EE8", marginBottom: "10px", fontWeight: 600 }}>
            ✓ Select all correct answers for this question
          </p>
        )}
        {isTextAnswer && (
          <p style={{ fontSize: "12px", color: "#2A5EE8", marginBottom: "10px", fontWeight: 600 }}>
            ✍ Write your answer in the box below
          </p>
        )}

        {/* For text answer questions — show textarea instead of QuestionCard options */}
        {isTextAnswer ? (
          <div style={{ background: "#FAFAF8", borderRadius: "16px", border: "1px solid #ECEAE4", padding: "1.5rem", marginBottom: "1.25rem" }}>
            {mapped.image && (
              <img src={mapped.image} alt="Question" style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }} />
            )}
            <p style={{ fontSize: "15px", color: "#1C1B18", lineHeight: 1.6, marginBottom: "1rem" }}>
              {mapped.question}
            </p>
            <p style={{ fontSize: "11px", color: "#9A9890", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Your Answer ({mapped.marks} marks)
            </p>
            <textarea
              value={currentText}
              onChange={(e) => handleTextChange(e.target.value)}
              onBlur={handleTextBlur}
              placeholder="Write your answer here..."
              rows={5}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "14px",
                color: "#1C1B18",
                background: "#F4F3EF",
                border: "1px solid #DEDAD3",
                borderRadius: "10px",
                resize: "vertical",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "inherit",
                lineHeight: 1.6,
              }}
            />
          </div>
        ) : (
          <QuestionCard
            question={mapped}
            questionNumber={index + 1}
            selected={isMultiSelect ? currentAnswers : currentAnswers[0] || null}
            onSelect={handleSelect}
            isMultiSelect={isMultiSelect}
          />
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          <Button onClick={handlePrev} variant="secondary" disabled={index === 0} fullWidth>
            ← Previous
          </Button>
          <Button onClick={handleNext} fullWidth disabled={!hasAnswer || submitting}>
            {submitting ? "Submitting..." : isLast ? "Submit" : "Next →"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;