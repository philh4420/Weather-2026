'use client';

interface PollenForecastProps {
  pollen: {
    tree: number;
    grass: number;
    weed: number;
    level: {
      overall: string;
    };
  } | null;
}

const PollenForecast: React.FC<PollenForecastProps> = ({ pollen }) => {
  const getIndexColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'text-green-500';
      case 'Moderate':
        return 'text-yellow-500';
      case 'High':
      case 'Very High':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="p-3 bg-background/50 dark:bg-dark-background/50 rounded-lg flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold mb-2">Pollen Forecast</h3>
      {pollen && pollen.level ? (
        <div className="text-center">
          <p className={`text-4xl font-bold ${getIndexColor(pollen.level.overall)}`}>
            {pollen.level.overall}
          </p>
          <div className="grid grid-cols-3 gap-4 mt-4 text-xs">
            <div>
              <p className="font-semibold">Tree</p>
              <p>{pollen.tree ?? 'N/A'}</p>
            </div>
            <div>
              <p className="font-semibold">Grass</p>
              <p>{pollen.grass ?? 'N/A'}</p>
            </div>
            <div>
              <p className="font-semibold">Weed</p>
              <p>{pollen.weed ?? 'N/A'}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-secondary-text dark:text-dark-secondary-text">No pollen data available.</p>
      )}
    </div>
  );
};

export default PollenForecast;
