import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  const clockContainer = 'flex items-center justify-center ';
  const digitStyle = 'text-4xl font-bold transform transition duration-500';

  return (
    <div className={clockContainer}>
      <div className="flex items-center">
        <div className={`${digitStyle} rotate-${hours[0] * 30}`}>{hours[0]}</div>
        <div className={`${digitStyle} rotate-${hours[1] * 30}`}>{hours[1]}</div>
        <div className={`${digitStyle} mx-2`}>:</div>
        <div className={`${digitStyle} rotate-${minutes[0] * 6}`}>{minutes[0]}</div>
        <div className={`${digitStyle} rotate-${minutes[1] * 6}`}>{minutes[1]}</div>
        <div className={`${digitStyle} mx-2`}>:</div>
        <div className={`${digitStyle} rotate-${seconds[0] * 6}`}>{seconds[0]}</div>
        <div className={`${digitStyle} rotate-${seconds[1] * 6}`}>{seconds[1]}</div>
      </div>
    </div>
  );
};

export default Clock;
