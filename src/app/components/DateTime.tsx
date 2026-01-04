'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    setCurrentDateTime(new Date());
    return () => clearInterval(timer);
  }, []);

  if (!isClient || !currentDateTime) {
    return null; 
  }

  return (
    <div 
      className="relative flex items-center justify-center space-x-4 bg-black/5 dark:bg-white/10 rounded-full px-4 py-2 border border-transparent
                 before:absolute before:inset-0 before:rounded-full before:border before:border-gray-500/20 
                 dark:before:border-accent-purple/30 before:animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"
    >
      {/* Theme-Aware Liquid Light Time Display */}
      <div className="text-xl font-bold liquid-light">
        <span>{format(currentDateTime, 'HH:mm')}</span>
        <span className="font-mono text-lg">{format(currentDateTime, ':ss')}</span>
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-400/50 dark:bg-gray-500/50"></div>

      {/* UK Date Display */}
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {format(currentDateTime, 'dd MMMM yyyy', { locale: enGB })}
      </div>
    </div>
  );
};

export default DateTime;
