'use client';

import { MapContainer, TileLayer, LayerGroup, LayersControl, useMap, useMapEvents, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { divIcon } from 'leaflet';
import MapLegend from './MapLegend';

interface WeatherMapProps {
  lat: number;
  lon: number;
  openWeatherMapApiKey: string;
  onMapClick: (lat: number, lon: number) => void;
}

const customMarkerIcon = divIcon({
  html: `<svg viewBox="0 0 24 24" width="32" height="32" fill="#f43f5e"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>`,
  className: 'bg-transparent border-none',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const ChangeView = ({ lat, lon }: { lat: number; lon: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon]);
  }, [lat, lon, map]);
  return null;
};

const MapEvents = ({ onBaseLayerChange, onOverlayChange, onMapClick }: { onBaseLayerChange: (name: string) => void; onOverlayChange: (name: string, added: boolean) => void; onMapClick: (lat: number, lon: number) => void; }) => {
    useMapEvents({
        baselayerchange: (e) => {
            onBaseLayerChange(e.name);
        },
        overlayadd: (e) => {
            onOverlayChange(e.name, true);
        },
        overlayremove: (e) => {
            onOverlayChange(e.name, false);
        },
        click: (e) => {
            onMapClick(e.latlng.lat, e.latlng.lng);
        }
    });
    return null;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ lat, lon, openWeatherMapApiKey, onMapClick }) => {
  const [activeLayer, setActiveLayer] = useState('Standard');
  const [isPrecipitationVisible, setIsPrecipitationVisible] = useState(false);

  const darkMapUrl = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
  const mapAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
  const weatherAttribution = 'Weather data &copy; OpenWeatherMap';

  return (
    <MapContainer center={[lat, lon]} zoom={7} style={{ height: '100%', width: '100%' }} className="rounded-lg">
      <ChangeView lat={lat} lon={lon} />
      <MapEvents 
          onBaseLayerChange={(name) => setActiveLayer(name)} 
          onOverlayChange={(name, added) => {
              if (name === 'Precipitation') {
                  setIsPrecipitationVisible(added);
              }
          }}
          onMapClick={onMapClick}
      />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Standard">
          <TileLayer
            url={darkMapUrl}
            attribution={mapAttribution}
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Temperature">
          <LayerGroup>
            <TileLayer url={darkMapUrl} attribution={mapAttribution} />
            <TileLayer
              url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${openWeatherMapApiKey}`}
              attribution={weatherAttribution}
            />
          </LayerGroup>
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Wind Speed">
          <LayerGroup>
            <TileLayer url={darkMapUrl} attribution={mapAttribution} />
            <TileLayer
              url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${openWeatherMapApiKey}`}
              attribution={weatherAttribution}
            />
          </LayerGroup>
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Clouds">
          <LayerGroup>
            <TileLayer url={darkMapUrl} attribution={mapAttribution} />
            <TileLayer
              url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${openWeatherMapApiKey}`}
              attribution={weatherAttribution}
            />
          </LayerGroup>
        </LayersControl.BaseLayer>
        
        <LayersControl.Overlay name="Precipitation">
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${openWeatherMapApiKey}`}
            attribution={weatherAttribution}
          />
        </LayersControl.Overlay>
      </LayersControl>
      <Marker position={[lat, lon]} icon={customMarkerIcon}></Marker>
      <MapLegend activeLayer={activeLayer} isPrecipitationVisible={isPrecipitationVisible} />
    </MapContainer>
  );
};

export default WeatherMap;
