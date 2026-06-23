import React, { useState, useEffect, useRef } from 'react';
import './TimerCard.css';

const TimerCard = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputHours, setInputHours] = useState('05');
  const [inputMinutes, setInputMinutes] = useState('09');
  const [inputSeconds, setInputSeconds] = useState('00');
  const intervalRef = useRef(null);

  // Initialize timer from inputs
  useEffect(() => {
    if (!isRunning) {
      const h = parseInt(inputHours) || 0;
      const m = parseInt(inputMinutes) || 0;
      const s = parseInt(inputSeconds) || 0;
      setTotalSeconds(h * 3600 + m * 60 + s);
    }
  }, [inputHours, inputMinutes, inputSeconds, isRunning]);

  useEffect(() => {
    if (isRunning && totalSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formatNum = (n) => n.toString().padStart(2, '0');

  // Calculate progress for the circular ring
  const initialTotal =
    (parseInt(inputHours) || 0) * 3600 +
    (parseInt(inputMinutes) || 0) * 60 +
    (parseInt(inputSeconds) || 0);
  const progress = initialTotal > 0 ? totalSeconds / initialTotal : 0;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference * (1 - progress);

  const handleStart = () => {
    if (totalSeconds > 0) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    const h = parseInt(inputHours) || 0;
    const m = parseInt(inputMinutes) || 0;
    const s = parseInt(inputSeconds) || 0;
    setTotalSeconds(h * 3600 + m * 60 + s);
  };

  return (
    <div className="timer-card" id="timer-card">
      <div className="timer-circle-wrapper">
        <svg className="timer-svg" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#2a2a4a"
            strokeWidth="6"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#E74C3C"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 100 100)"
            className="timer-progress"
          />
        </svg>
        <div className="timer-display">
          <span className="timer-value">
            {formatNum(hours)}:{formatNum(minutes)}:{formatNum(seconds)}
          </span>
        </div>
      </div>

      <div className="timer-inputs">
        <div className="timer-input-group">
          <label className="timer-input-label">Hours</label>
          <input
            type="number"
            min="0"
            max="99"
            value={inputHours}
            onChange={(e) => setInputHours(e.target.value)}
            disabled={isRunning}
            className="timer-input"
            id="timer-hours"
          />
        </div>
        <span className="timer-separator">:</span>
        <div className="timer-input-group">
          <label className="timer-input-label">Minutes</label>
          <input
            type="number"
            min="0"
            max="59"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(e.target.value)}
            disabled={isRunning}
            className="timer-input"
            id="timer-minutes"
          />
        </div>
        <span className="timer-separator">:</span>
        <div className="timer-input-group">
          <label className="timer-input-label">Seconds</label>
          <input
            type="number"
            min="0"
            max="59"
            value={inputSeconds}
            onChange={(e) => setInputSeconds(e.target.value)}
            disabled={isRunning}
            className="timer-input"
            id="timer-seconds"
          />
        </div>
      </div>

      <div className="timer-actions">
        {!isRunning ? (
          <button className="btn-timer-start" onClick={handleStart} id="btn-start">
            Start
          </button>
        ) : (
          <button className="btn-timer-pause" onClick={handlePause} id="btn-pause">
            Pause
          </button>
        )}
        <button className="btn-timer-reset" onClick={handleReset} id="btn-reset">
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerCard;
