'use client';

import { useState, useEffect, useCallback } from 'react';
import { FiSearch, FiLoader, FiMapPin } from 'react-icons/fi';
import { format } from 'date-fns';
import DailyForecastCard from '@/app/components/DailyForecastCard';
import HourlyForecast from '@/app/components/HourlyForecast';
import AirQuality from '@/app/components/AirQuality';
import WeatherAlerts from '@/app/components/WeatherAlerts';
import CurrentWeather from '@/app/components/CurrentWeather';
import UvIndex from '@/app/components/UvIndex';
import SunriseSunset from '@/app/components/SunriseSunset';
import WindStatus from '@/app/components/WindStatus';
import Atmosphere from '@/app/components/Atmosphere';
import MoonPhase from '@/app/components/MoonPhase';
import WeatherBackground from '@/app/components/WeatherBackground';
import ErrorDisplay from '@/app/components/ErrorDisplay';

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const initialLocation = `${latitude},${longitude}`;
          fetchWeatherData(initialLocation);
        },
        () => {
          fetchWeatherData('New York');
        }
      );
    } else {
      fetchWeatherData('New York');
    }
  }, [fetchWeatherData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      fetchWeatherData(location);
    }
  };

  const handleRetry = () => {
      if(lastSearchedLocation) {
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

  const cardClasses = 'border border-border dark:border-dark-border bg-card dark:bg-dark-card shadow-glass-light dark:shadow-glass-dark backdrop-blur-sm';
  const secondaryText = 'text-secondary-text dark:text-dark-secondary-text';

  return (
    <div className="min-h-screen relative text-primary-text dark:text-dark-primary-text">
      {weatherData && weatherData.current && weatherData.current.weather && weatherData.current.weather[0] && errors.length === 0 && (
        <WeatherBackground weatherCondition={weatherData.current.weather[0].main} onThemeChange={handleThemeChange} />
      )}
      <div className="relative z-10">
        <header className="py-4 px-6 md:px-10 flex justify-between items-center">
          <h1 className="text-xl font-bold">Meteoro</h1>
          <div className="flex items-center space-x-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`${cardClasses} rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-link-blue`}
                placeholder="Search city..."
              />
              <FiSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${secondaryText}`} />
            </form>
            <button onClick={handleGeolocation} className={`${cardClasses} p-2 rounded-full hover:bg-opacity-80 transition-colors`}>
              <FiMapPin className="text-link-blue" />
            </button>
          </div>
        </header>

        <main className="px-6 md:px-10 pb-10">
          {loading && (
            <div className="flex justify-center items-center h-96">
              <FiLoader className={`animate-spin text-4xl ${secondaryText}`} />
            </div>
          )}

          {errors.length > 0 && !loading && (
              <ErrorDisplay messages={errors} onRetry={handleRetry} />
          )}

          {weatherData && errors.length === 0 && !loading && (
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`md:col-span-2 ${cardClasses} rounded-lg p-4`}>
                      <CurrentWeather current={weatherData.current} today={weatherData.daily[0]} locationName={weatherData.locationName} />
                  </div>

                  {weatherData.alerts && weatherData.alerts.length > 0 && (
                      <div className={`md:col-span-2 ${cardClasses} rounded-lg p-4`}>
                          <h2 className={`text-sm font-semibold ${secondaryText} mb-2`}>Alerts</h2>
                          <WeatherAlerts alerts={weatherData.alerts} />
                      </div>
                  )}

                  <div className={`md:col-span-2 ${cardClasses} rounded-lg p-4`}>
                    <h2 className={`text-sm font-semibold ${secondaryText} mb-3`}>Hourly Forecast</h2>
                    <HourlyForecast hourly={weatherData.hourly} />
                  </div>

                  <div className={`md:col-span-2 ${cardClasses} rounded-lg p-4`}>
                    <h2 className={`text-sm font-semibold ${secondaryText} mb-3`}>5-Day Forecast</h2>
                    <div className="grid grid-cols-5 gap-2">
                        {weatherData.daily.slice(1, 6).map((day: any) => (
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

                  <div className={`md:col-span-2 ${cardClasses} rounded-lg p-4`}>
                      <h2 className={`text-sm font-semibold ${secondaryText} mb-2`}>Air Quality</h2>
                      <AirQuality airQuality={weatherData.airPollution} />
                  </div>

                  <div className={`${cardClasses} rounded-lg p-4`}>
                       <UvIndex uv={weatherData.current.uv} />
                  </div>
                  <div className={`${cardClasses} rounded-lg p-4`}>
                       <h2 className={`text-sm font-semibold ${secondaryText} mb-2`}>Sunrise & Sunset</h2>
                       <SunriseSunset sunrise={weatherData.current.sunrise} sunset={weatherData.current.sunset} />
                  </div>
                  <div className={`${cardClasses} rounded-lg p-4`}>
                      <MoonPhase astro={weatherData.daily[0].astro} />
                  </div>
                  <div className={`${cardClasses} rounded-lg p-4`}>
                       <WindStatus wind={weatherData.current} />
                  </div>
                  <div className={`${cardClasses} rounded-lg p-4`}>
                       <Atmosphere data={weatherData.current} />
                  </div>
              </div>
          )}
        </main>
      </div>
    </div>
  );
}
