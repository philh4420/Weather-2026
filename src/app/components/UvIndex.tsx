'use client';

import { FiSun } from 'react-icons/fi';

interface UvIndexProps {
  uv: number | null;
}

// Returns theme-based class names for color-coding the UV index
const getUvData = (uvValue: number) => {
  const roundedUv = Math.round(uvValue);
  if (roundedUv <= 2) {
    return {
      label: 'Low',
      colorClassName: 'text-green-500',
      description: 'No protection needed. You can safely stay outside.',
    };
  } else if (roundedUv <= 5) {
    return {
      label: 'Moderate',
      colorClassName: 'text-yellow-500',
      description: 'Protection needed. Seek shade during midday hours.',
    };
  } else if (roundedUv <= 7) {
    return {
      label: 'High',
      colorClassName: 'text-orange-500',
      description: 'Extra protection needed. Avoid being outside during midday.',
    };
  } else if (roundedUv <= 10) {
    return {
      label: 'Very High',
      colorClassName: 'text-red-500',
      description: 'Alert: Unprotected skin will be damaged quickly.',
    };
  } else {
    return {
      label: 'Extreme',
      colorClassName: 'text-purple-500',
      description: 'Extreme risk. Avoid being outside during midday.',
    };
  }
};

// Updated loading skeleton to match the new circular layout
const UvIndexLoading = () => (
  <div className="flex flex-col items-center justify-between h-full text-center p-4">
    <h2 className="text-sm font-semibold text-secondary-text dark:text-dark-secondary-text flex items-center self-start">
      <FiSun className="mr-2" />
      UV Index
    </h2>
    <div className="relative flex items-center justify-center w-40 h-40 flex-grow animate-pulse my-2">
      <div className="absolute inset-0 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="flex flex-col items-center">
          <div className="w-20 h-14 bg-gray-400 dark:bg-gray-600 rounded-md"></div>
          <div className="w-14 h-6 mt-2 bg-gray-400 dark:bg-gray-600 rounded-md"></div>
      </div>
    </div>
    <div className="w-full h-4 mt-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
  </div>
);

const UvIndex = ({ uv }: UvIndexProps) => {
  if (uv === null || uv === undefined || !isFinite(uv)) {
    return <UvIndexLoading />;
  }

  const { label, colorClassName, description } = getUvData(uv);
  
  const MAX_UV_FOR_PROGRESS = 12;
  const progress = Math.min(uv / MAX_UV_FOR_PROGRESS, 1);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center justify-between h-full text-center p-4">
      <h2 className="text-sm font-semibold text-secondary-text dark:text-dark-secondary-text flex items-center self-start">
        <FiSun className="mr-2" />
        UV Index
      </h2>
      <div className="relative flex items-center justify-center w-40 h-40 flex-grow my-2">
        <svg width="160" height="160" viewBox="0 0 160 160" className="absolute transform -rotate-90">
          {/* Background Circle */}
          <circle
            className="text-border dark:text-dark-border"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="80"
            cy="80"
          />
          {/* Progress Circle with Tailwind CSS transitions */}
          <circle
            className={`${colorClassName} transition-[stroke-dashoffset] duration-[1500ms] ease-out`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="80"
            cy="80"
          />
        </svg>
        {/* Centered Text */}
        <div className={`flex flex-col items-center justify-center ${colorClassName}`}>
          <p className="text-6xl font-bold">{Math.round(uv)}</p>
          <p className="text-xl font-medium">{label}</p>
        </div>
      </div>
      <p className="text-sm text-center text-secondary-text dark:text-dark-secondary-text">
        {description}
      </p>
    </div>
  );
};

export default UvIndex;
