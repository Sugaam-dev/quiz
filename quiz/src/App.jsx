import { useState } from "react";
import { questions } from "./data/questions";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Success from "./pages/Success";

/**
 * App — top-level state machine
 * Screens: "home" → "quiz" → "success"
 */
const App = () => {
  const [screen, setScreen] = useState("home");
  const [answers, setAnswers] = useState({});

  const correctCount = questions.filter(
    (q) => answers[q.id] === q.correct
  ).length;

  const handleStart = () => setScreen("quiz");

  const handleFinish = (finalAnswers) => {
    setAnswers(finalAnswers);
    setScreen("success");
  };

  const handleRetry = () => {
    setAnswers({});
    setScreen("home");
  };

  return (
    <>
      {screen === "home" && <Home onStart={handleStart} />}
      {screen === "quiz" && <Quiz onFinish={handleFinish} />}
      {screen === "success" && (
        <Success
          correctCount={correctCount}
          totalCount={questions.length}
          onRetry={handleRetry}
        />
      )}
    </>
  );
};

export default App;