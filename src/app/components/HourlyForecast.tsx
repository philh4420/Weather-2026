'use client';

import { format } from 'date-fns';
import { FiUmbrella } from 'react-icons/fi';

const HourlyForecast = ({ hourly }: { hourly: any[] }) => {
    if (!hourly) {
        return null;
    }

    const getRainColor = (chance: number) => {
        if (chance > 60) return 'text-blue-500 dark:text-blue-400';
        if (chance > 30) return 'text-sky-500 dark:text-sky-400';
        return 'text-secondary-text dark:text-dark-secondary-text';
    };

    return (
        <div className="overflow-x-auto pb-4 -mx-4 px-4 modern-scrollbar">
            <div className="flex space-x-4">
                {hourly.slice(0, 24).map((hour, index) => {
                    const iconUrl = hour.weather && hour.weather[0] ? hour.weather[0].icon : null;
                    const weatherDescription = hour.weather && hour.weather[0] ? hour.weather[0].main : 'N/A';
                    const rainChance = hour.chance_of_rain ? Math.round(hour.chance_of_rain) : 0;
                    const rainColor = getRainColor(rainChance);

                    return (
                        <div key={index} className="flex flex-col items-center justify-between space-y-1 p-3 rounded-lg flex-shrink-0 w-28 text-center bg-card dark:bg-dark-card h-44">
                            <p className="text-sm font-medium text-secondary-text dark:text-dark-secondary-text">{format(new Date(hour.dt * 1000), 'HH:mm')}</p>
                            <div className="w-12 h-12 flex items-center justify-center">
                                {iconUrl ? (
                                    <img src={iconUrl} alt={weatherDescription} className="w-full h-full" />
                                ) : (
                                    <div className="w-12 h-12"></div> // Placeholder
                                )}
                            </div>
                            <p className="text-sm font-medium whitespace-normal flex-grow flex items-center">{weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}</p>
                            <p className="text-2xl font-bold">{Math.round(hour.temp)}°</p>
                            <div className={`flex items-center space-x-1.5 text-sm font-semibold ${rainColor}`}>
                                <FiUmbrella className="w-5 h-5" />
                                <span>{rainChance}%</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HourlyForecast;
