import { useEffect, useState } from "react";

/**
 * Timer
 * Props:
 *   duration  — seconds (default 108)
 *   onTimeUp  — callback when it reaches 0
 *
 * Turns red below 20 seconds.
 */
const Timer = ({ duration = 108, onTimeUp }) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    setTime(duration);
  }, [duration]);

  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }
    const interval = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [time]);

  const isUrgent = time <= 30;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 12px",
        borderRadius: "999px",
        background: isUrgent ? "#FDF0EF" : "#EFF6ED",
        transition: "all 0.3s",
      }}
    >
      <span
        style={{
          fontSize: "15px",
          color: isUrgent ? "#B5373A" : "#2D6A2A",
          fontWeight: 400,
        }}
      >
        Time left
      </span>
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke={isUrgent ? "#B5373A" : "#2D6A2A"}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: isUrgent ? "#B5373A" : "#2D6A2A",
          transition: "color 0.3s",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {time}s
      </span>
    </div>
  );
};

export default Timer;
