'use client';

import { FiUmbrella } from 'react-icons/fi';

const DailyForecastCard = ({ day, pop, temp, weather }: { day: string, pop: number, temp: any, weather: any }) => {
    const iconCode = weather && weather[0] ? weather[0].icon : null;
    const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : '';
    const weatherMain = weather && weather[0] ? weather[0].main : '';

    return (
        <div className="flex flex-col items-center space-y-2 p-3">
            <p className="font-bold text-lg">{day}</p>
            {iconUrl && <img src={iconUrl} alt={weatherMain} className="w-12 h-12" />}
            <div className="flex items-center space-x-1 text-xs text-link-blue">
                <FiUmbrella className="w-3 h-3" />
                <span>{pop.toFixed(0)}%</span>
            </div>
            <div className="flex items-center space-x-2">
                <span className="font-medium text-sm">{Math.round(temp.min)}°</span>
                <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-orange-400 rounded-full"></div>
                <span className="font-bold text-sm">{Math.round(temp.max)}°</span>
            </div>
        </div>
    );
};

export default DailyForecastCard;
