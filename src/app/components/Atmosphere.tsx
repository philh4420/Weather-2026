'use client';

import { FiDroplet, FiTrendingUp, FiEye } from 'react-icons/fi';

interface AtmosphereData {
    humidity: number;
    pressure_mb: number;
    vis_km: number;
}

const Atmosphere = ({ data }: { data: AtmosphereData }) => {
    if (!data || data.humidity === undefined || data.pressure_mb === undefined || data.vis_km === undefined) {
        return (
            <div className="p-4 rounded-lg h-full flex items-center justify-center">
                <p className="text-secondary-text dark:text-dark-secondary-text">Atmosphere data not available.</p>
            </div>
        );
    }

    const { humidity, pressure_mb, vis_km } = data;

    return (
        <div className="flex flex-col items-center h-full">
            <h2 className="text-lg font-medium mb-4">Atmosphere</h2>
            <div className="flex justify-around items-start text-center w-full">
                <div className="flex flex-col items-center">
                    <FiDroplet className="w-7 h-7 text-link-blue" />
                    <p className="text-xl font-bold mt-2">{humidity}<span className="text-sm font-medium">%</span></p>
                    <p className="text-xs text-secondary-text dark:text-dark-secondary-text">Humidity</p>
                </div>

                <div className="flex flex-col items-center">
                    <FiTrendingUp className="w-7 h-7 text-accent-orange" />
                    <p className="text-xl font-bold mt-2">{pressure_mb.toFixed(0)}<span className="text-sm font-medium"> mb</span></p>
                    <p className="text-xs text-secondary-text dark:text-dark-secondary-text">Pressure</p>
                </div>

                <div className="flex flex-col items-center">
                    <FiEye className="w-7 h-7 text-accent-pink" />
                    <p className="text-xl font-bold mt-2">{vis_km.toFixed(0)}<span className="text-sm font-medium"> km</span></p>
                    <p className="text-xs text-secondary-text dark:text-dark-secondary-text">Visibility</p>
                </div>
            </div>
        </div>
    );
};

export default Atmosphere;
