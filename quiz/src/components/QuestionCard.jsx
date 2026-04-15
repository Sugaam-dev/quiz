import OptionItem from "./OptionItem";

const QuestionCard = ({ question, selected, onSelect }) => {
  return (
    <div className="space-y-4">
      {question.image && (
        <img src={question.image} className="w-full rounded-xl" />
      )}

      <h2 className="text-lg md:text-xl font-semibold">
        {question.question}
      </h2>

      <div className="grid gap-3">
        {question.options.map((opt) => (
          <OptionItem
            key={opt.id}
            option={opt}
            selected={selected === opt.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;