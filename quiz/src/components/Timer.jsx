import { useEffect, useState } from "react";

const Timer = ({ duration = 108, onTimeUp }) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="text-red-500 font-semibold text-lg">
      ⏳ {time}s
    </div>
  );
};

export default Timer;