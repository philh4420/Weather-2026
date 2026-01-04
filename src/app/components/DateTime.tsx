'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const DateTime = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(format(now, 'HH:mm:ss'));
      setDate(format(now, 'EEEE, d MMMM yyyy'));
    };
    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black/25 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-between gap-4 w-full">
      <div className="text-2xl font-bold">{time}</div>
      <div className="text-1xl text-right">{date}</div>
    </div>
  );
};

export default DateTime;
