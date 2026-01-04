'use client';

import PollenForecast from './PollenForecast';
import ActivityAdvisor from './ActivityAdvisor';
import SkinAdvisor from './SkinAdvisor';
import BreathingAdvisor from './BreathingAdvisor';

interface WellnessDashboardProps {
  wellnessData: any;
  pollenData: any;
}

const WellnessDashboard: React.FC<WellnessDashboardProps> = ({ wellnessData, pollenData }) => {
  const cardClasses = 'border border-border dark:border-dark-border bg-card dark:bg-dark-card shadow-glass-light dark:shadow-glass-dark backdrop-blur-sm rounded-lg p-4';
  const secondaryText = 'text-secondary-text dark:text-dark-secondary-text';

  return (
    <div className={`xl:col-span-4 md:col-span-2 ${cardClasses}`}>
       <h2 className={`text-sm font-semibold ${secondaryText} mb-4 text-center`}>Wellness Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActivityAdvisor advice={wellnessData.activity} />
        <SkinAdvisor advice={wellnessData.skin} />
        <PollenForecast pollen={pollenData} />
        <BreathingAdvisor advice={wellnessData.breathing} />
      </div>
    </div>
  );
};

export default WellnessDashboard;
