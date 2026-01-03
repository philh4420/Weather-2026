'use client';

import { format, differenceInMinutes, isBefore, isAfter } from 'date-fns';

interface SunriseSunsetProps {
  sunrise: number;
  sunset: number;
}

const SunriseSunset = ({ sunrise, sunset }: SunriseSunsetProps) => {
  const now = new Date();
  const sunriseTime = new Date(sunrise * 1000);
  const sunsetTime = new Date(sunset * 1000);

  const totalDaylightMinutes = differenceInMinutes(sunsetTime, sunriseTime);
  const minutesSinceSunrise = differenceInMinutes(now, sunriseTime);

  let progress = -1;
  if (isAfter(now, sunriseTime) && isBefore(now, sunsetTime)) {
    progress = Math.max(0, Math.min(1, minutesSinceSunrise / totalDaylightMinutes));
  }

  const angle = 180 - progress * 180;
  const radians = angle * (Math.PI / 180);
  const sunX = 50 + 45 * Math.cos(radians);
  const sunY = 50 - 45 * Math.sin(radians);

  const getStatusMessage = () => {
    if (isBefore(now, sunriseTime)) {
      const diffMins = differenceInMinutes(sunriseTime, now);
      if (diffMins > 60) {
        const diffHours = Math.floor(diffMins / 60);
        return `Sunrise in about ${diffHours}h`;
      }
      if (diffMins > 0) return `Sunrise in ${diffMins}m`;
      return "Sunrise is imminent";
    } else if (isAfter(now, sunsetTime)) {
      return "The sun has set";
    } else {
      const diffMins = differenceInMinutes(sunsetTime, now);
      if (diffMins > 60) {
        const diffHours = Math.floor(diffMins / 60);
        return `Sunset in about ${diffHours}h`;
      }
      if (diffMins > 0) return `Sunset in ${diffMins}m`;
      return "Sunset is imminent";
    }
  };

  const statusMessage = getStatusMessage();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-2">
        {/* Title is provided by parent component */}
      <div className="relative w-full max-w-[240px]">
        <svg viewBox="0 0 100 85" className="w-full h-auto overflow-visible">
          <defs>
            <filter id="finalSunGlow" x="-70%" y="-70%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 5,50 A 45,45 0 0,1 95,50"
            className="stroke-gray-500 dark:stroke-gray-600"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="3, 4"
            strokeLinecap="round"
          />
          {progress >= 0 && (
            <circle
              cx={sunX}
              cy={sunY}
              r="7"
              className="fill-yellow-400 dark:fill-yellow-300"
              style={{
                transition: 'cx 1.5s ease-out, cy 1.5s ease-out',
                filter: 'url(#finalSunGlow)',
              }}
            />
          )}

          {/* Correct Sunrise Icon & Time */}
            <g transform="translate(5, 52)">
                <path stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none" d="M -8 10 H 8 M -6 10 A 6 6 0 0 1 6 10 M 0 10 V 4 M 0 2 L -2 4 M 0 2 L 2 4" />
                <text x="0" y="28" textAnchor="middle" className="text-[10px] font-semibold fill-yellow-500">{format(sunriseTime, 'HH:mm')}</text>
            </g>

          {/* Correct Sunset Icon & Time */}
          <g transform="translate(95, 52)">
            <path stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none" d="M -8 10 H 8 M -6 10 A 6 6 0 0 1 6 10 M 0 10 V 4 M 0 4 L -2 6 M 0 4 L 2 6" />
            <text x="0" y="28" textAnchor="middle" className="text-[10px] font-semibold fill-orange-500">{format(sunsetTime, 'HH:mm')}</text>
          </g>
        </svg>
      </div>
      <p className="font-semibold text-center text-base mt-4">{statusMessage}</p>
    </div>
  );
};

export default SunriseSunset;
