const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]; // ← was only 5

const OptionImageCard = ({ option, index = 0, selected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(option.id)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        padding: "10px",
        border: `1.5px solid ${selected ? "#2A5EE8" : "#ECEAE4"}`,
        borderRadius: "8px",
        cursor: "pointer",
        background: selected ? "#EEF2FD" : "#F4F3EF",
        transition: "all 0.15s",
      }}
    >
      {option.image && (
        <img
          src={option.image}
          alt={option.text}
          style={{
            width: "100%",
            borderRadius: "6px",
            border: "1px solid #ECEAE4",
            objectFit: "contain",         // ← was "cover", now "contain"
            maxHeight: "140px",
          }}
        />
      )}
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
          color: selected ? "#fff" : "#5C5A54",
          flexShrink: 0,
          transition: "all 0.15s",
        }}
      >
        {LETTERS[index]}
      </div>
      <p style={{ fontSize: "13px", color: "#1C1B18", textAlign: "center", margin: 0, lineHeight: 1.4 }}>
        {option.text}
      </p>
    </div>
  );
};

export default OptionImageCard;