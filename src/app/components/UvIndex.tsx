'use client';

import { FiSun } from 'react-icons/fi';

const getUvInfo = (uvIndex: number) => {
    if (uvIndex <= 2) return { color: '#34C759', label: 'Low', description: 'No protection needed. You can safely stay outside.' };
    if (uvIndex <= 5) return { color: '#FFC107', label: 'Moderate', description: 'Protection needed. Seek shade during midday hours.' };
    if (uvIndex <= 7) return { color: '#FF9500', label: 'High', description: 'Protection essential. Wear sunscreen, a hat, and sunglasses.' };
    if (uvIndex <= 10) return { color: '#FF2D55', label: 'Very High', description: 'Extra protection needed. Avoid being outside during midday.' };
    return { color: '#AF52DE', label: 'Extreme', description: 'Stay inside. Avoid sun exposure as much as possible.' };
};

const UvIndex = ({ uv }: { uv: number }) => {
    if (uv === undefined) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-secondary-text dark:text-dark-secondary-text">UV Index data not available.</p>
            </div>
        );
    }

    const { color, label, description } = getUvInfo(uv);
    const circumference = 2 * Math.PI * 45; // 2 * pi * r
    const progress = (uv / 11) * circumference;

    return (
        <div className="flex flex-col items-center justify-between h-full">
            <div className="flex items-center space-x-2">
                <FiSun className="w-6 h-6 text-secondary-text dark:text-dark-secondary-text" />
                <p className="text-lg font-medium">UV Index</p>
            </div>
            <div className="relative flex items-center justify-center w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        className="stroke-border dark:stroke-dark-border"
                        strokeWidth="10"
                        fill="none"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke={color}
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - progress}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <div className="absolute text-center">
                    <p className="text-5xl font-bold" style={{ color }}>{uv}</p>
                    <p className="text-lg font-medium" style={{ color }}>{label}</p>
                </div>
            </div>
            <p className="text-sm text-center mt-2 text-secondary-text dark:text-dark-secondary-text">{description}</p>
        </div>
    );
};

export default UvIndex;
