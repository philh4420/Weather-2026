'use client';

import { TbWind, TbSun, TbBiohazard } from 'react-icons/tb';

const getAqiInfo = (aqi: number) => {
    if (aqi <= 1) return { color: '#34C759', label: 'Good' };
    if (aqi <= 2) return { color: '#FFC107', label: 'Moderate' };
    if (aqi <= 3) return { color: '#FF9500', label: 'Unhealthy for Sensitive' };
    if (aqi <= 4) return { color: '#FF2D55', label: 'Unhealthy' };
    if (aqi <= 5) return { color: '#AF52DE', label: 'Very Unhealthy' };
    return { color: '#A06A42', label: 'Hazardous' };
};

const PollutantDetail = ({ name, value, unit, description, icon: Icon }: { name: string, value: number, unit: string, description: string, icon: React.ElementType }) => {
    return (
        <div className="p-3 rounded-lg border flex items-center space-x-3 border-border dark:border-dark-border">
            <Icon className="w-6 h-6 text-secondary-text dark:text-dark-secondary-text" />
            <div>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{name}</span>
                    <span className="text-sm font-bold">{value.toFixed(1)} {unit}</span>
                </div>
                <p className="text-xs text-secondary-text dark:text-dark-secondary-text">{description}</p>
            </div>
        </div>
    );
};

const AirQuality = ({ airQuality }: { airQuality: any }) => {
    if (!airQuality || airQuality.us_epa_index === undefined) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-secondary-text dark:text-dark-secondary-text">Air quality data not available.</p>
            </div>
        );
    }

    const usEpaIndex = airQuality.us_epa_index;
    const { color, label } = getAqiInfo(usEpaIndex);
    const components = airQuality.components;

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <div className="text-center">
                    <p className="text-5xl font-bold" style={{ color }}>{usEpaIndex}</p>
                    <p className="text-lg font-medium" style={{ color }}>{label}</p>
                </div>
                <p className="text-sm flex-1 text-secondary-text dark:text-dark-secondary-text">
                    Air quality is considered satisfactory, and air pollution poses little or no risk.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <PollutantDetail name="PM2.5" value={components.pm2_5} unit="μg/m³" description="Fine particulate matter" icon={TbWind} />
                <PollutantDetail name="PM10" value={components.pm10} unit="μg/m³" description="Coarse particulate matter" icon={TbWind} />
                <PollutantDetail name="O₃" value={components.o3} unit="μg/m³" description="Ozone" icon={TbSun} />
                <PollutantDetail name="NO₂" value={components.no2} unit="μg/m³" description="Nitrogen dioxide" icon={TbBiohazard} />
                <PollutantDetail name="SO₂" value={components.so2} unit="μg/m³" description="Sulphur dioxide" icon={TbBiohazard} />
                <PollutantDetail name="CO" value={components.co} unit="μg/m³" description="Carbon monoxide" icon={TbBiohazard} />
            </div>
        </div>
    );
};

export default AirQuality;
