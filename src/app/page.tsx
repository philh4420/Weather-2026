'use client';

import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import DailyForecastCard from '@/app/components/DailyForecastCard';
import HourlyForecast from '@/app/components/HourlyForecast';
import AirQuality from '@/app/components/AirQuality';
import WeatherAlerts from '@/app/components/WeatherAlerts';
import CurrentWeather from '@/app/components/CurrentWeather';
import UvIndex from '@/app/components/UvIndex';
import WindStatus from '@/app/components/WindStatus';
import Atmosphere from '@/app/components/Atmosphere';
import AstronomyModule from '@/app/components/AstronomyModule';
import WeatherBackground from '@/app/components/WeatherBackground';
import ErrorDisplay from '@/app/components/ErrorDisplay';
import Header from '@/app/components/Header';
import Loading from '@/app/components/Loading';
import WellnessDashboard from '@/app/components/WellnessDashboard';

const WeatherMap = dynamic(() => import('@/app/components/WeatherMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-card dark:bg-dark-card rounded-lg flex items-center justify-center"><p>Loading Map...</p></div>
});

export default function Home() {
  const [location, setLocation] = useState('');
  const [lastSearchedLocation, setLastSearchedLocation] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  const handleThemeChange = useCallback((newTheme: 'light' | 'dark') => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const fetchWeatherData = useCallback(async (loc: string) => {
    setLoading(true);
    setErrors([]);
    try {
      const res = await fetch(`/api/weather?location=${loc}`);
      const data = await res.json();
      if (res.ok) {
        setWeatherData(data);
        setLastSearchedLocation(loc);
      } else {
        setErrors(data.errors || ['Failed to fetch weather data']);
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrors([err.message]);
      } else {
        setErrors(['An unexpected error occurred.']);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleMapClick = (lat: number, lon: number) => {
    const newLocation = `${lat},${lon}`;
    fetchWeatherData(newLocation);
  };

  useEffect(() => {
    const initialFetch = async () => {
        if (navigator.geolocation) {
            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                const { latitude, longitude } = position.coords;
                const initialLocation = `${latitude},${longitude}`;
                await fetchWeatherData(initialLocation);
            } catch (error) {
                await fetchWeatherData('London'); // Fallback location
            }
        } else {
            await fetchWeatherData('London'); // Fallback for browsers without geolocation
        }
    };
    initialFetch();
}, [fetchWeatherData]);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      fetchWeatherData(location);
    }
  };

  const handleRetry = () => {
    if (lastSearchedLocation) {
      fetchWeatherData(lastSearchedLocation);
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(`${latitude},${longitude}`);
        },
        () => {
          setErrors(['Could not access your location. Try searching manually.']);
        }
      );
    } else {
      setErrors(['Geolocation is not supported by your browser.']);
    }
  };

  const cardClasses = 'border border-border dark:border-dark-border bg-card dark:bg-dark-card shadow-glass-light dark:shadow-glass-dark backdrop-blur-sm rounded-lg p-4 flex flex-col';
  const secondaryText = 'text-secondary-text dark:text-dark-secondary-text';

  return (
    <div className="min-h-screen relative text-primary-text dark:text-dark-primary-text">
      {weatherData && weatherData.current && weatherData.current.weather && weatherData.current.weather[0] && errors.length === 0 && (
        <WeatherBackground weatherCondition={weatherData.current.weather[0].main} onThemeChange={handleThemeChange} />
      )}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header
          location={location}
          setLocation={setLocation}
          handleSearch={handleSearch}
          handleGeolocation={handleGeolocation}
        />

        <main className="pb-10 pt-4">
          {loading && <Loading />}

          {errors.length > 0 && !loading && (
            <ErrorDisplay messages={errors} onRetry={handleRetry} />
          )}

          {weatherData && errors.length === 0 && !loading && (
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                <div className={`${cardClasses} lg:col-span-2 lg:row-span-2`}>
                    <CurrentWeather current={weatherData.current} today={weatherData.daily[0]} locationName={weatherData.locationName} />
                </div>

                <div className={`${cardClasses} lg:col-span-2`}>
                    <h2 className={`text-sm font-semibold ${secondaryText} mb-3 text-center`}>Hourly Forecast</h2>
                    <HourlyForecast hourly={weatherData.hourly} />
                </div>

                {weatherData.alerts && weatherData.alerts.length > 0 && (
                    <div className={`${cardClasses} lg:col-span-2`}>
                        <h2 className={`text-sm font-semibold ${secondaryText} mb-2 text-center`}>Alerts</h2>
                        <WeatherAlerts alerts={weatherData.alerts} />
                    </div>
                )}
                
                <div className={`${cardClasses} lg:col-span-4`}>
                    <h2 className={`text-sm font-semibold ${secondaryText} mb-3 text-center`}>5-Day Forecast</h2>
                    <div className="grid grid-cols-5 gap-2">
                    {weatherData.daily.slice(0, 5).map((day: any) => (
                        <DailyForecastCard
                        key={day.dt}
                        day={format(new Date(day.dt * 1000), 'EEE')}
                        pop={day.pop}
                        temp={day.temp}
                        weather={day.weather}
                        />
                    ))}
                    </div>
                </div>
                
                <div className={`${cardClasses} lg:col-span-2`}>
                    <h2 className={`text-sm font-semibold ${secondaryText} mb-2 text-center`}>Air Quality</h2>
                    <AirQuality airQuality={weatherData.airPollution} />
                </div>

                {weatherData.wellness && weatherData.pollen && (
                    <div className={`${cardClasses} lg:col-span-2`}>
                      <WellnessDashboard wellnessData={weatherData.wellness} pollenData={weatherData.pollen} />
                    </div>
                )}

                <div className={cardClasses}>
                    <UvIndex uv={weatherData.current.uv} />
                </div>

                <div className={cardClasses}>
                    <WindStatus wind={weatherData.current} />
                </div>

                <div className={cardClasses}>
                    <AstronomyModule sunrise={weatherData.current.sunrise} sunset={weatherData.current.sunset} astro={weatherData.daily[0].astro} />
                </div>

                <div className={cardClasses}>
                    <Atmosphere data={weatherData.current} />
                </div>

                {weatherData.lat && weatherData.lon && weatherData.openWeatherMapApiKey && (
                  <div className={`${cardClasses} lg:col-span-4 flex flex-col h-[400px]`}>
                    <h2 className={`text-sm font-semibold ${secondaryText} mb-4 text-center`}>Interactive Weather Map</h2>
                    <div className="flex-grow rounded-lg overflow-hidden">
                      <WeatherMap 
                        lat={weatherData.lat}
                        lon={weatherData.lon}
                        openWeatherMapApiKey={weatherData.openWeatherMapApiKey}
                        onMapClick={handleMapClick}
                      />
                    </div>
                  </div>
                )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
