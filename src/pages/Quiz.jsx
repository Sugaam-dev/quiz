import { useState, useEffect } from "react";
import {
  getQuestions,
  startAttempt,
  saveAnswer,
  finishTest,
} from "../api/quizApi";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import Button from "../components/Button";

/**
 * Quiz page
 *
 * Props:
 *   userName  — name entered on Home page
 *   onFinish  — called with result data when test is submitted
 */
const Quiz = ({ userName, onFinish }) => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: [optionId, ...] }
  const [attemptId, setAttemptId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // ── On mount: load questions and start attempt
  useEffect(() => {
    const init = async () => {
      try {
        // 1. Load questions
        const qs = await getQuestions();
        setQuestions(qs);

        // 2. Start attempt — get attempt_id
        const attempt = await startAttempt(userName);
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

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "3rem" }}>Loading quiz...</p>
    );
  if (error)
    return (
      <p style={{ textAlign: "center", color: "red", marginTop: "3rem" }}>
        {error}
      </p>
    );
  if (!questions.length)
    return <p style={{ textAlign: "center" }}>No questions found.</p>;

  const current = questions[index];
  const isLast = index === questions.length - 1;
  const progress = ((index + 1) / questions.length) * 100;

  // ── Map API response shape to what QuestionCard expects
  // API returns: { id, question_text, image_url, options: [{ id, option_label, option_text, image_url }] }
  // QuestionCard expects: { id, question, image, options: [{ id, text, image }] }
  const mapQuestion = (q) => ({
    id: q.id,
    question: q.question_text,
    image: q.image_url || null,
    marks: q.marks,
    marking_type: q.marking_type,
    options: q.options.map((o) => ({
      id: o.id,
      text: o.option_text || "",
      image: o.image_url || null,
    })),
  });

  const mapped = mapQuestion(current);

  // ── Check if question allows multiple answers
  // Questions with marking_type 'partial' or more than 4 options in correct_answers
  // We detect multi-select by checking if question_text contains "(Marks will be awarded only if all answers are right)"
  const isMultiSelect =
    current.question_text?.includes("all answers are right") ||
    current.marking_type === "partial";

  // ── Handle option selection
  const handleSelect = async (optionId) => {
    let newSelected;

    if (isMultiSelect) {
      // Toggle option in/out of selection array
      const current_selection = answers[current.id] || [];
      if (current_selection.includes(optionId)) {
        newSelected = current_selection.filter((id) => id !== optionId);
      } else {
        newSelected = [...current_selection, optionId];
      }
    } else {
      // Single select — replace selection
      newSelected = [optionId];
    }

    // Update local state immediately (feels instant to user)
    setAnswers((prev) => ({ ...prev, [current.id]: newSelected }));

    // Save to backend in background
    try {
      await saveAnswer(attemptId, current.id, newSelected);
    } catch (err) {
      console.error("Failed to save answer:", err);
    }
  };

  // ── Move to next question
  const handleNext = () => {
    if (!isLast) {
      setIndex(index + 1);
    } else {
      handleSubmit();
    }
  };

  // ── Move to previous question
  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  // ── Submit test
  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const result = await finishTest(attemptId);
      onFinish(result); // pass result up to App.jsx → Success page
    } catch (err) {
      console.error("Failed to submit test:", err);
      setError("Failed to submit test. Please try again.");
      setSubmitting(false);
    }
  };

  // ── Check if current question has any selection
  const currentAnswers = answers[current.id] || [];
  const hasAnswer = currentAnswers.length > 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F0EDE6",
        padding: "1.5rem 1rem",
      }}
    >
      <div style={{ maxWidth: "580px", margin: "0 auto" }}>
        {/* Header — question count + timer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "14px",
          }}
        >
          <p style={{ fontSize: "13px", color: "#5C5A54" }}>
            Question <strong>{index + 1}</strong> of{" "}
            <strong>{questions.length}</strong>
          </p>
          <Timer key={index} duration={108} onTimeUp={handleNext} />
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: "5px",
            background: "#ECEAE4",
            borderRadius: "999px",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              background: "#2A5EE8",
              height: "100%",
              borderRadius: "999px",
              transition: "width 0.3s",
            }}
          />
        </div>

        {/* Multi-select hint */}
        {isMultiSelect && (
          <p
            style={{
              fontSize: "12px",
              color: "#2A5EE8",
              marginBottom: "10px",
              fontWeight: 600,
            }}
          >
            ✓ Select all correct answers for this question
          </p>
        )}

        {/* Question card */}
        <QuestionCard
          question={mapped}
          questionNumber={index + 1}
          selected={isMultiSelect ? currentAnswers : currentAnswers[0] || null}
          onSelect={handleSelect}
          isMultiSelect={isMultiSelect}
        />

        {/* Navigation buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={handlePrev}
            variant="secondary"
            disabled={index === 0}
            fullWidth
          >
            ← Previous
          </Button>

          <Button
            onClick={handleNext}
            fullWidth
            disabled={!hasAnswer || submitting} // ← added !hasAnswer here
          >
            {submitting ? "Submitting..." : isLast ? "Submit" : "Next →"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
