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
     {/* Question number + marks row */}
<div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
}}>
  <p style={{
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#2A5EE8",
    margin: 0,
  }}>
    Question {questionNumber}
  </p>

  <div style={{
    display: "flex",
    alignItems: "center",
    gap: "5px",
    background: "#F4F3EF",
    border: "1px solid #ECEAE4",
    borderRadius: "999px",
    padding: "3px 10px",
  }}>
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2A5EE8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3 6.27L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1L12 2z" />
    </svg>
    <span style={{
      fontSize: "12px",
      fontWeight: 600,
      color: "#1C1B18",
    }}>
      {question.marks} {question.marks === 1 ? "mark" : "marks"}
    </span>
  </div>
</div>

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
