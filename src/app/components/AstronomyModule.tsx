'use client';

import { format, fromUnixTime, addMinutes, subMinutes } from 'date-fns';
import { FiSunrise, FiSunset } from 'react-icons/fi';
import { WiMoonrise, WiMoonset } from 'react-icons/wi';

interface AstronomyModuleProps {
  sunrise: number;
  sunset: number;
  astro: {
    moonrise: string;
    moonset: string;
    moon_phase: string;
  };
}

const AstronomyModule: React.FC<AstronomyModuleProps> = ({ sunrise, sunset, astro }) => {
  const sunriseTime = fromUnixTime(sunrise);
  const sunsetTime = fromUnixTime(sunset);

  // Calculate Golden Hour (approx. 1 hour after sunrise and 1 hour before sunset)
  const goldenHourMorningStart = format(sunriseTime, 'HH:mm');
  const goldenHourMorningEnd = format(addMinutes(sunriseTime, 60), 'HH:mm');
  const goldenHourEveningStart = format(subMinutes(sunsetTime, 60), 'HH:mm');
  const goldenHourEveningEnd = format(sunsetTime, 'HH:mm');

  // Calculate Blue Hour (approx. 30 mins before sunrise and 30 mins after sunset)
  const blueHourMorningStart = format(subMinutes(sunriseTime, 30), 'HH:mm');
  const blueHourMorningEnd = format(sunriseTime, 'HH:mm');
  const blueHourEveningStart = format(sunsetTime, 'HH:mm');
  const blueHourEveningEnd = format(addMinutes(sunsetTime, 30), 'HH:mm');

  const secondaryText = 'text-secondary-text dark:text-dark-secondary-text';
  const iconStyle = { width: '24px', height: '24px' };

  return (
    <div className="h-full flex flex-col">
      <h2 className={`text-sm font-semibold ${secondaryText} mb-4 text-center`}>Astronomical & Photography Data</h2>
      
      <div className="flex-grow grid grid-cols-2 gap-4 text-sm">
        {/* -- Sunrise/Sunset -- */}
        <div className="flex items-center">
          <FiSunrise className="text-yellow-500 mr-2" style={iconStyle} />
          <div>
            <p className={secondaryText}>Sunrise</p>
            <p className="font-bold text-base">{format(sunriseTime, 'HH:mm')}</p>
          </div>
        </div>
        <div className="flex items-center">
          <FiSunset className="text-orange-500 mr-2" style={iconStyle} />
          <div>
            <p className={secondaryText}>Sunset</p>
            <p className="font-bold text-base">{format(sunsetTime, 'HH:mm')}</p>
          </div>
        </div>

        {/* -- Moonrise/Moonset -- */}
        <div className="flex items-center">
          <WiMoonrise className="text-blue-300 mr-2" style={iconStyle} />
          <div>
            <p className={secondaryText}>Moonrise</p>
            <p className="font-bold text-base">{astro.moonrise}</p>
          </div>
        </div>
        <div className="flex items-center">
          <WiMoonset className="text-blue-400 mr-2" style={iconStyle} />
          <div>
            <p className={secondaryText}>Moonset</p>
            <p className="font-bold text-base">{astro.moonset}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border dark:border-dark-border">
        <h3 className={`text-xs font-semibold ${secondaryText} mb-2 text-center`}>Photography Hours</h3>
        <div className="grid grid-cols-2 gap-x-4 text-xs">
          <div className="text-center">
            <p className="font-bold text-yellow-400">Golden Hour</p>
            <p>{`${goldenHourMorningStart} - ${goldenHourMorningEnd}`}</p>
            <p>{`${goldenHourEveningStart} - ${goldenHourEveningEnd}`}</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-blue-400">Blue Hour</p>
            <p>{`${blueHourMorningStart} - ${blueHourMorningEnd}`}</p>
            <p>{`${blueHourEveningStart} - ${blueHourEveningEnd}`}</p>
          </div>
        </div>
      </div>
       <div className="mt-4 pt-4 border-t border-border dark:border-dark-border text-center">
         <p className={`text-xs font-semibold ${secondaryText}`}>Moon Phase</p>
         <p className="font-bold text-sm">{astro.moon_phase}</p>
       </div>
    </div>
  );
};

export default AstronomyModule;
