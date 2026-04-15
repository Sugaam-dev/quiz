import OptionItem from "./OptionItem";
import OptionImageCard from "./OptionImageCard";

/**
 * QuestionCard
 *
 * Props:
 *   question      — { id, question, image, options: [{ id, text, image }] }
 *   questionNumber — display number
 *   selected      — string (single) OR string[] (multi-select)
 *   onSelect      — fn(optionId)
 *   isMultiSelect — boolean
 */
const QuestionCard = ({
  question,
  questionNumber,
  selected,
  onSelect,
  isMultiSelect = false,
}) => {
  const hasImageOptions = question.options.some((o) => o.image);

  // Normalize selected to always work as array for checking
  const isSelected = (optId) => {
    if (isMultiSelect) {
      return Array.isArray(selected) && selected.includes(optId);
    }
    return selected === optId;
  };

  return (
    <div
      style={{
        background: "#FAFAF8",
        borderRadius: "16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05)",
        border: "1px solid #ECEAE4",
        padding: "1.75rem",
        marginBottom: "1.25rem",
      }}
    >
      {/* Question number */}
      <p
        style={{
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#2A5EE8",
          marginBottom: "10px",
        }}
      >
        Question {questionNumber}
      </p>

      {/* Question image */}
      {question.image && (
        <img
          src={question.image}
          alt="Question visual"
          style={{
            width: "100%",
            borderRadius: "8px",
            marginBottom: "1.25rem",
            border: "1px solid #ECEAE4",
            objectFit: "contain", // ← was "cover", now "contain"
            maxHeight: "300px", // ← was 220px, now 300px
            background: "#F4F3EF", // ← light bg so transparent images look clean
          }}
        />
      )}

      {/* Question text */}
      <p
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "19px",
          color: "#1C1B18",
          lineHeight: 1.5,
          marginBottom: "1.25rem",
        }}
      >
        {question.question}
      </p>

      {/* Options */}
      {hasImageOptions ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          {question.options.map((opt, i) => (
            <OptionImageCard
              key={opt.id}
              option={opt}
              index={i}
              selected={isSelected(opt.id)}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {question.options.map((opt, i) => (
            <OptionItem
              key={opt.id}
              option={opt}
              index={i}
              selected={isSelected(opt.id)}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
