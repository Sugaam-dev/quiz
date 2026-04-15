import { useState } from "react";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Success from "./pages/Success";

/**
 * App — top-level state machine
 * Screens: "home" → "quiz" → "success"
 * 
 * userName  — entered on Home page, passed to Quiz to start attempt
 * result    — returned from backend after finishing test
 */
const App = () => {
  const [screen, setScreen]   = useState("home");
  const [userName, setUserName] = useState("");
  const [result, setResult]   = useState(null);

  const handleStart = (name) => {
    setUserName(name);
    setScreen("quiz");
  };

  const handleFinish = (resultData) => {
    setResult(resultData);
    setScreen("success");
  };

  const handleRetry = () => {
    setResult(null);
    setUserName("");
    setScreen("home");
  };

  return (
    <>
      {screen === "home" && (
        <Home onStart={handleStart} />
      )}

      {screen === "quiz" && (
        <Quiz
          userName={userName}
          onFinish={handleFinish}
        />
      )}

      {screen === "success" && (
        <Success
          result={result}
          onRetry={handleRetry}
        />
      )}
    </>
  );
};

export default App;