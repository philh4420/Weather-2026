'use client';

import { TbMoon, TbSunrise, TbSunset } from 'react-icons/tb';

const MoonPhase = ({ astro }: { astro: any }) => {
    if (!astro) {
        return null;
    }

    return (
        <div className="rounded-lg p-4 h-full">
            <h2 className="text-sm font-semibold text-secondary-text dark:text-dark-secondary-text mb-2">Moon Phase</h2>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <TbMoon className="text-4xl" />
                    <div>
                        <p className="font-bold text-lg">{astro.moon_phase}</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-center space-x-2">
                        <TbSunrise className="text-lg text-secondary-text dark:text-dark-secondary-text" />
                        <p className="text-sm text-secondary-text dark:text-dark-secondary-text">{astro.moonrise}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <TbSunset className="text-lg text-secondary-text dark:text-dark-secondary-text" />
                        <p className="text-sm text-secondary-text dark:text-dark-secondary-text">{astro.moonset}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoonPhase;
