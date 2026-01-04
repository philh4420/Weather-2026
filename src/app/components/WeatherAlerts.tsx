'use client';

import { useState } from 'react';
import { IoWarningOutline, IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { FiCheckCircle } from 'react-icons/fi';

// Define the shape of an alert object
interface Alert {
    headline: string;
    event: string;
    severity: 'Minor' | 'Moderate' | 'Severe' | 'Extreme' | string;
    certainty: string;
    urgency: string;
    desc: string;
    instruction: string;
}

// Helper to map severity to styling
const getSeverityStyles = (severity: Alert['severity']) => {
    switch (severity) {
        case 'Severe':
        case 'Extreme':
            return {
                iconColor: 'text-red-400',
                bgColor: 'bg-red-500/20',
                borderColor: 'border-red-500/30',
            };
        case 'Moderate':
            return {
                iconColor: 'text-orange-400',
                bgColor: 'bg-orange-500/20',
                borderColor: 'border-orange-500/30',
            };
        case 'Minor':
            return {
                iconColor: 'text-yellow-400',
                bgColor: 'bg-yellow-500/20',
                borderColor: 'border-yellow-500/30',
            };
        default:
            return {
                iconColor: 'text-gray-400',
                bgColor: 'bg-gray-500/20',
                borderColor: 'border-gray-500/30',
            };
    }
};

const AlertItem = ({ alert }: { alert: Alert }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { iconColor, bgColor, borderColor } = getSeverityStyles(alert.severity);

    return (
        <div className={`border ${borderColor} ${bgColor} rounded-xl p-4 transition-all duration-300`}>
            <div className="flex items-start gap-4">
                <IoWarningOutline className={`text-3xl flex-shrink-0 mt-1 ${iconColor}`} />
                <div className="flex-grow">
                    <h3 className="font-bold text-lg text-white">{alert.headline || alert.event}</h3>
                    <p className="text-sm text-gray-300">
                        Severity: {alert.severity}・Certainty: {alert.certainty}
                    </p>
                    {isExpanded && (
                        <div className="mt-3 text-gray-300 space-y-2">
                            <p className="text-sm">{alert.desc}</p>
                            {alert.instruction && (
                                <div>
                                    <h4 className="font-semibold text-gray-200 mt-2">Recommended Action</h4>
                                    <p className="text-sm">{alert.instruction}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    aria-label={isExpanded ? 'Collapse alert' : 'Expand alert'}
                >
                    {isExpanded ? <IoChevronUp className="text-xl" /> : <IoChevronDown className="text-xl" />}
                </button>
            </div>
        </div>
    );
};

const WeatherAlerts = ({ alerts }: { alerts: Alert[] | null | undefined }) => {
    return (
        <div className="bg-black/25 backdrop-blur-md p-4 sm:p-6 rounded-2xl w-full">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Weather Alerts</h2>
            { !alerts || alerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-8 bg-black/20 rounded-xl">
                    <FiCheckCircle className="text-5xl text-green-400 mb-4" />
                    <h3 className="font-bold text-lg text-white">All Clear</h3>
                    <p className="text-gray-300">No active weather alerts for your area.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {alerts.map((alert, index) => (
                        <AlertItem key={index} alert={alert} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeatherAlerts;
