import { useState } from "react";

const InputField = ({ value, onChange, placeholder = "Enter your full name", error = false }) => {
  const [focused, setFocused] = useState(false);

  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%",
        padding: "11px 14px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "15px",
        color: "#1C1B18",
        background: focused ? "#FAFAF8" : "#F4F3EF",
        border: `1.5px solid ${error ? "#C84B4E" : focused ? "#2A5EE8" : "#ECEAE4"}`,
        borderRadius: "8px",
        outline: "none",
        transition: "border-color 0.15s, background 0.15s, box-shadow 0.15s",
        boxShadow: focused ? "0 0 0 3px rgba(42,94,232,0.10)" : "none",
      }}
    />
  );
};

export default InputField;