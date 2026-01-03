'use client';

import { useState, useEffect } from 'react';
import { FiSunrise, FiSunset } from 'react-icons/fi';
import { format, differenceInMinutes, isPast, isFuture, formatDistanceToNow } from 'date-fns';

const SunriseSunset = ({ sunrise, sunset }: { sunrise: number, sunset: number }) => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    if (!sunrise || !sunset) {
        return <div className="flex items-center justify-center h-full"><p className="text-secondary-text dark:text-dark-secondary-text">Data not available.</p></div>;
    }

    const sunriseTime = new Date(sunrise * 1000);
    const sunsetTime = new Date(sunset * 1000);

    const totalDaylightMinutes = differenceInMinutes(sunsetTime, sunriseTime);
    const minutesSinceSunrise = differenceInMinutes(now, sunriseTime);
    
    let sunProgress = 0;
    if (minutesSinceSunrise > 0 && minutesSinceSunrise < totalDaylightMinutes) {
        sunProgress = minutesSinceSunrise / totalDaylightMinutes;
    } else if (isPast(sunsetTime)) {
        sunProgress = 1;
    }
    
    const angle = Math.PI - (sunProgress * Math.PI);
    const sunX = 50 + 45 * Math.cos(angle);
    const sunY = 50 - 45 * Math.sin(angle);

    let statusMessage = '';
    if (isFuture(sunriseTime)) {
        statusMessage = `Sunrise in ${formatDistanceToNow(sunriseTime)}`;
    } else if (isFuture(sunsetTime)) {
        statusMessage = `Sunset in ${formatDistanceToNow(sunsetTime)}`;
    } else {
        statusMessage = 'Enjoy the night';
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="relative w-full max-w-xs aspect-[2/1]">
                <svg viewBox="0 0 100 50" className="w-full h-auto overflow-visible">
                    <path
                        d="M 5,50 A 45,45 0 0,1 95,50"
                        className="stroke-border dark:stroke-dark-border"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="3 3"
                    />
                     <g transform={`translate(${sunX}, ${sunY})`} style={{ transition: 'transform 1s ease-in-out' }}>
                        <circle r="4" className="fill-accent-yellow" />
                        <circle r="8" className="fill-accent-yellow" fillOpacity="0.3" />
                    </g>
                </svg>

                <div className="absolute bottom-[-10px] left-0 flex flex-col items-center">
                     <FiSunrise className="w-6 h-6 text-accent-yellow mb-1" />
                     <span className="text-xs font-semibold">{format(sunriseTime, 'HH:mm')}</span>
                </div>
                 <div className="absolute bottom-[-10px] right-0 flex flex-col items-center">
                     <FiSunset className="w-6 h-6 text-accent-orange mb-1" />
                     <span className="text-xs font-semibold">{format(sunsetTime, 'HH:mm')}</span>
                </div>
            </div>

            <p className="mt-4 text-lg font-semibold">{statusMessage}</p>
        </div>
    );
};

export default SunriseSunset;
