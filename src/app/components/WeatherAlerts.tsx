'use client';

import { FiAlertTriangle } from 'react-icons/fi';

const WeatherAlerts = ({ alerts }: { alerts: any[] }) => {
    if (!alerts || alerts.length === 0) {
        return null;
    }

    const getAlertColor = (event: string) => {
        const lowerEvent = event.toLowerCase();
        if (lowerEvent.includes('watch')) return 'border-accent-yellow';
        if (lowerEvent.includes('warning')) return 'border-accent-pink';
        if (lowerEvent.includes('advisory')) return 'border-link-blue';
        return 'border-secondary-text dark:border-dark-secondary-text';
    };


    return (
        <div className="space-y-3">
            {alerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${getAlertColor(alert.event)} bg-card dark:bg-dark-card`}>
                    <h3 className="font-semibold flex items-center">
                        <FiAlertTriangle className="mr-2" /> 
                        {alert.event}
                    </h3>
                    <p className="text-sm mt-1 ml-6 text-secondary-text dark:text-dark-secondary-text">{alert.description}</p>
                </div>
            ))}
        </div>
    );
};

export default WeatherAlerts;
