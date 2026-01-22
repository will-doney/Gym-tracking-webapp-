import { useState, useEffect } from 'react';

function RestTimerPage() {
  const [inputTime, setInputTime] = useState(''); // User input in seconds
  const [remainingTime, setRemainingTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (isActive && remainingTime === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, remainingTime]);

  const startTimer = () => {
    const time = parseInt(inputTime);
    if (isNaN(time) || time <= 0) {
      alert("Please enter a valid number of seconds.");
      return;
    }
    setRemainingTime(time);
    setIsActive(true);
  };

  const resetTimer = () => {
    setRemainingTime(0);
    setIsActive(false);
    setInputTime('');
  };

  return (
    <div className="p-4 mt-16">
      <h1 className="text-2xl font-bold mb-4">Rest Timer</h1>

      <input
        type="number"
        placeholder="Enter seconds"
        value={inputTime}
        onChange={(e) => setInputTime(e.target.value)}
        className="border px-2 py-1 rounded mb-4 w-full max-w-xs bg-gray-100"
      />

      <div className="text-4xl mb-4">
        {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
      </div>

      <div className="flex gap-2">
        <button
          onClick={startTimer}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Start
        </button>
        <button
          onClick={resetTimer}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default RestTimerPage;
