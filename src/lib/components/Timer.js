import React from "react";
import { useTimer } from "react-timer-hook";

function MyTimer({ expiryTimestamp }) {
  const { seconds, minutes, hours, isRunning, start, pause, resume, restart } = useTimer({ expiryTimestamp, onExpire: () => console.warn("onExpire called") });

  const formatTime = (time) => {
    return String(time).padStart(2, "0");
  };

  /* TODO: Convert hours into minutes */

  return (
    <div className="flow-info-container">
      <div className="flow-info">
        <div className="flow-info-indicator"></div>
        מצב זרימה {isRunning ? "פעיל" : "הסתיים"}
      </div>
      <div className="flow-info-timer">
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
      {isRunning ? (
        <button
          className="flow-info-button"
          onClick={() => {
            restart();
            pause();
          }}
        >
          סיום
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default function Timer() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 300); // 5 minutes timer
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}
