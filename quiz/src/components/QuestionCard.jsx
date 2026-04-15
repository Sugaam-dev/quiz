import OptionItem from "./OptionItem";
import OptionImageCard from "./OptionImageCard";

/**
 * QuestionCard
 *
 * Handles three question layouts automatically:
 *   1. Text only question + text options
 *   2. Image question + text options
 *   3. Any question + image options (renders a 2-col image grid)
 *   4. Image question + image options (both)
 *
 * question shape:
 * {
 *   id: number,
 *   question: string,
 *   image?: string | null,      ← image URL for the question itself
 *   options: [
 *     { id: string, text: string, image?: string | null }
 *   ]
 * }
 */
const QuestionCard = ({ question, questionNumber, selected, onSelect }) => {
  const hasImageOptions = question.options.some((o) => o.image);

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
      {/* Question number label */}
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

      {/* Optional question image */}
      {question.image && (
        <img
          src={question.image}
          alt="Question visual"
          style={{
            width: "100%",
            borderRadius: "8px",
            marginBottom: "1.25rem",
            border: "1px solid #ECEAE4",
            objectFit: "cover",
            maxHeight: "220px",
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

      {/* Options — image grid or list */}
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
              selected={selected === opt.id}
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
              selected={selected === opt.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;