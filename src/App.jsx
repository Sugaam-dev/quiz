import { useState } from "react";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Success from "./pages/Success";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [screen, setScreen]     = useState("home");
  const [userName, setUserName] = useState("");
  const [testId, setTestId]     = useState("");
  const [result, setResult]     = useState(null);

  // ← now receives both name AND testId from Home
  const handleStart = (name, selectedTestId) => {
    setUserName(name);
    setTestId(selectedTestId);
    setScreen("quiz");
  };

  const handleFinish = (resultData) => {
    setResult(resultData);
    setScreen("success");
  };

  const handleRetry = () => {
    setResult(null);
    setUserName("");
    setTestId("");
    setScreen("home");
  };

  return (
    <>
     <Header />
      {screen === "home" && (
        <Home onStart={handleStart} />
      )}
      {screen === "quiz" && (
        <Quiz
          userName={userName}
           
          testId={testId}         
          onFinish={handleFinish}
        />
      )}
      {screen === "success" && (
        <Success
          result={result}
          onRetry={handleRetry}
        />
      )}
       <Footer />
    </>
  );
};

export default App;