'use client';

import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';

const CurrentWeather = ({ current, today, locationName }: { current: any, today: any, locationName: string }) => {
    if (!current || !today) {
        return null;
    }

    const weatherMain = current.weather && current.weather[0] ? current.weather[0].main : '';
    const iconUrl = current.weather && current.weather[0] && current.weather[0].icon ? current.weather[0].icon.replace('64x64', '128x128') : '';

    return (
        <div className="flex flex-col items-center text-center">
            
            <h2 className="text-2xl md:text-3xl font-bold">{locationName}</h2>

            <div className="flex items-center justify-center my-3 md:my-4">
                {iconUrl && <img src={iconUrl} alt={weatherMain} className="w-24 h-24 md:w-32 md:h-32 -ml-4" />}
                <p className="text-7xl md:text-8xl font-bold tracking-tighter">{Math.round(current.temp)}°</p>
            </div>

            <p className="capitalize text-xl md:text-2xl font-medium -mt-2">{weatherMain}</p>
            <p className="text-md mt-1 text-secondary-text dark:text-dark-secondary-text">Feels like {Math.round(current.feels_like)}°</p>

            <div className="w-full max-w-xs border-t my-4 border-border dark:border-dark-border"></div>

            <div className="flex justify-center items-center space-x-8">
                 <div className="flex items-center space-x-2">
                    <FaTemperatureHigh className="text-link-blue text-xl" />
                    <span className="text-lg">H: {Math.round(today.temp.max)}°</span>
                </div>
                 <div className="flex items-center space-x-2">
                    <FaTemperatureLow className="text-accent-pink text-xl" />
                    <span className="text-lg">L: {Math.round(today.temp.min)}°</span>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
