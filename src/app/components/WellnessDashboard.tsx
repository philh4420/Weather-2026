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
  const secondaryText = 'text-secondary-text dark:text-dark-secondary-text';

  return (
    <div>
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
