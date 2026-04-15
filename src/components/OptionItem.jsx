const LETTERS = ["A", "B", "C", "D", "E"];

/**
 * OptionItem — used inside QuestionCard for text-based options.
 * For image-grid options, QuestionCard renders OptionImageCard instead.
 *
 * Props:
 *   option  — { id, text, image? }
 *   index   — 0-based index for the letter badge
 *   selected — boolean
 *   onSelect — fn(optionId)
 */
const OptionItem = ({ option, index = 0, selected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(option.id)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 14px",
        border: `1.5px solid ${selected ? "#2A5EE8" : "#ECEAE4"}`,
        borderRadius: "8px",
        cursor: "pointer",
        background: selected ? "#EEF2FD" : "#F4F3EF",
        transition: "all 0.15s",
      }}
    >
      {/* Letter badge */}
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          border: `1.5px solid ${selected ? "#2A5EE8" : "#ECEAE4"}`,
          background: selected ? "#2A5EE8" : "#FAFAF8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: 600,
          flexShrink: 0,
          color: selected ? "#fff" : "#5C5A54",
          transition: "all 0.15s",
        }}
      >
        {LETTERS[index]}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "14px", color: "#1C1B18", lineHeight: 1.45, margin: 0 }}>
          {option.text}
        </p>
        {option.image && (
          <img
            src={option.image}
            alt={option.text}
            style={{
              width: "100%",
              borderRadius: "6px",
              marginTop: "8px",
              border: "1px solid #ECEAE4",
              objectFit: "cover",
              maxHeight: "100px",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default OptionItem;