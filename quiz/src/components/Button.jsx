const Button = ({ children, onClick, variant = "primary", disabled = false, fullWidth = false }) => {
  const base = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontWeight: 600,
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    transition: "background 0.15s, transform 0.1s",
    width: fullWidth ? "100%" : "auto",
    opacity: disabled ? 0.4 : 1,
    letterSpacing: "0.01em",
  };

  const styles = {
    primary: {
      ...base,
      background: "#2A5EE8",
      color: "#fff",
      boxShadow: "0 2px 8px rgba(42,94,232,0.25)",
    },
    secondary: {
      ...base,
      background: "#F4F3EF",
      color: "#1C1B18",
      border: "1.5px solid #ECEAE4",
      boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={styles[variant]}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.background = variant === "primary" ? "#1D4EC8" : "#ECEAE4";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = variant === "primary" ? "#2A5EE8" : "#F4F3EF";
      }}
    >
      {children}
    </button>
  );
};

export default Button;