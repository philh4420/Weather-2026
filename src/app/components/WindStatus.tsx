'use client';

import { FiWind, FiNavigation } from 'react-icons/fi';

interface WindData {
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    gust_kph: number;
}

const WindStatus = ({ wind }: { wind: WindData }) => {
    if (!wind || wind.wind_speed === undefined || wind.wind_degree === undefined || wind.wind_dir === undefined || wind.gust_kph === undefined) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-secondary-text dark:text-dark-secondary-text">Wind data not available.</p>
            </div>
        );
    }

    const { wind_speed, wind_degree, wind_dir, gust_kph } = wind;

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="flex items-center space-x-2">
                 <FiWind className="w-6 h-6 text-secondary-text dark:text-dark-secondary-text" />
                 <p className="text-lg font-medium">Wind Status</p>
            </div>

            <div className="flex items-center justify-center space-x-8 mt-4">
                {/* Compass */}
                <div className="relative w-24 h-24">
                    <div className="w-full h-full border-2 rounded-full flex items-center justify-center border-border dark:border-dark-border">
                         <FiNavigation
                            className="text-link-blue text-4xl transition-transform duration-500 ease-in-out"
                            style={{ transform: `rotate(${wind_degree}deg)` }}
                        />
                    </div>
                </div>

                {/* Wind Details */}
                <div className="text-left">
                    <p className="text-4xl font-bold">{wind_speed.toFixed(1)}<span className="text-xl font-medium"> km/h</span></p>
                    <p className="text-md mt-1 text-secondary-text dark:text-dark-secondary-text">
                        Gusts up to <span className="font-semibold text-primary-text dark:text-dark-primary-text">{gust_kph.toFixed(1)} km/h</span>
                    </p>
                    <p className="text-md text-secondary-text dark:text-dark-secondary-text">
                        <span className="font-semibold text-primary-text dark:text-dark-primary-text">{wind_dir}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WindStatus;
