import { useState } from "react";
import { questions } from "../data/questions";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";

const Quiz = ({ onFinish }) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const current = questions[index];

  const handleNext = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      onFinish(answers);
    }
  };

  const handleSelect = (optionId) => {
    setAnswers({ ...answers, [current.id]: optionId });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <Timer key={index} onTimeUp={handleNext} />

      <QuestionCard
        question={current}
        selected={answers[current.id]}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default Quiz;