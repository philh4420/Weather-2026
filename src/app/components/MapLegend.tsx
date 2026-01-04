'use client';

interface MapLegendProps {
  activeLayer: string;
  isPrecipitationVisible: boolean;
}

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center">
    <div className="w-4 h-4 mr-2 border border-white/20" style={{ background: color }}></div>
    <span className="text-xs text-primary-text dark:text-dark-primary-text">{label}</span>
  </div>
);

const getLegendData = (layer: string) => {
  switch (layer) {
    case 'Temperature':
      return {
        title: 'Temperature (°C)',
        items: [
          { color: '#ff0000', label: '> 30' },
          { color: '#ff7800', label: '25' },
          { color: '#ffff00', label: '20' },
          { color: '#00ff00', label: '10' },
          { color: '#00ffff', label: '0' },
          { color: '#0000ff', label: '-10' },
          { color: '#7800ff', label: '< -20' },
        ]
      };
    case 'Wind Speed':
      return {
        title: 'Wind (km/h)',
        items: [
            { color: '#ffffff', label: '> 100' },
            { color: '#ff00ff', label: '80' },
            { color: '#9900cc', label: '60' },
            { color: '#0000ff', label: '40' },
            { color: '#00ffff', label: '20' },
            { color: '#00ff00', label: '10' },
            { color: '#ffff00', label: '< 10' },
        ]
      };
    case 'Clouds':
       return {
        title: 'Cloud Cover (%)',
        items: [
            { color: '#c0c0c0', label: '100' },
            { color: '#a9a9a9', label: '80' },
            { color: '#989898', label: '60' },
            { color: '#808080', label: '40' },
            { color: '#696969', label: '20' },
            { color: '#505050', label: '0' },
        ]
      };
    case 'Precipitation':
       return {
        title: 'Precipitation (mm/h)',
        items: [
            { color: '#f0f8ff', label: '0.1' },
            { color: '#add8e6', label: '0.5' },
            { color: '#87ceeb', label: '1' },
            { color: '#1e90ff', label: '5' },
            { color: '#0000cd', label: '10' },
            { color: '#00008b', label: '> 20' },
        ]
      };
    default:
      return null;
  }
};

const MapLegend: React.FC<MapLegendProps> = ({ activeLayer, isPrecipitationVisible }) => {
  const baseLegend = getLegendData(activeLayer);
  const precipLegend = isPrecipitationVisible ? getLegendData('Precipitation') : null;

  if (!baseLegend && !precipLegend) {
    return null;
  }

  return (
    <div className="leaflet-bottom leaflet-right">
        <div className="leaflet-control leaflet-bar p-2 bg-card/80 dark:bg-dark-card/80 rounded-md shadow-lg backdrop-blur-sm">
            {baseLegend && (
                <div>
                    <h4 className="font-bold text-sm mb-1 text-primary-text dark:text-dark-primary-text">{baseLegend.title}</h4>
                    <div className="space-y-1">
                        {baseLegend.items.map((item) => (
                        <LegendItem key={item.label} color={item.color} label={item.label} />
                        ))}
                    </div>
                </div>
            )}
            {precipLegend && (
                 <div className={`${baseLegend ? 'mt-2' : ''}`}>
                    <h4 className="font-bold text-sm mb-1 text-primary-text dark:text-dark-primary-text">{precipLegend.title}</h4>
                    <div className="space-y-1">
                        {precipLegend.items.map((item) => (
                        <LegendItem key={item.label} color={item.color} label={item.label} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default MapLegend;
