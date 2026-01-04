'use client';

interface ActivityAdvisorProps {
  advice: {
    index: string;
    message: string;
  };
}

const ActivityAdvisor: React.FC<ActivityAdvisorProps> = ({ advice }) => {
  const getIndexColor = (index: string) => {
    switch (index) {
      case 'Good':
        return 'text-green-500';
      case 'Moderate':
        return 'text-yellow-500';
      case 'Poor':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="p-3 bg-background/50 dark:bg-dark-background/50 rounded-lg flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold mb-2">Activity Advisor</h3>
      <p className={`text-4xl font-bold ${getIndexColor(advice.index)}`}>{advice.index}</p>
      <p className="text-xs text-center mt-2">{advice.message}</p>
    </div>
  );
};

export default ActivityAdvisor;
