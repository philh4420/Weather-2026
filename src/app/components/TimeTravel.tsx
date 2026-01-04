'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar, FiChevronDown, FiX } from 'react-icons/fi';

const TimeTravel = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      fetchHistoricalWeather(date);
    }
  };

  const fetchHistoricalWeather = async (date: Date) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    // Get location from browser geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const timestamp = Math.floor(date.getTime() / 1000);

        try {
          const res = await fetch(`/api/weather/timetravel?lat=${latitude}&lon=${longitude}&date=${timestamp}`);
          const data = await res.json();

          if (res.ok) {
            setWeatherData(data);
          } else {
            setError(data.errors?.[0] || 'Failed to fetch historical data');
          }
        } catch (err) {
          setError('An unexpected error occurred.');
        } finally {
          setLoading(false);
        }
      }, (error) => {
        setError('Could not access your location. Please enable location services.');
        setLoading(false);
      });
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  };

  const cardClasses = 'border border-border dark:border-dark-border bg-card dark:bg-dark-card shadow-glass-light dark:shadow-glass-dark backdrop-blur-sm rounded-lg p-4';
  const secondaryText = 'text-secondary-text dark:text-dark-secondary-text';

  return (
    <div className={`${cardClasses} flex flex-col items-center`}>
      <h2 className={`text-sm font-semibold ${secondaryText} mb-3 text-center`}>Time Travel</h2>

      <div className="relative w-full max-w-xs mb-4">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          maxDate={new Date()} // Can only select past or present
          className="w-full bg-transparent border-b-2 border-primary-text dark:border-dark-primary-text text-center text-lg font-semibold text-primary-text dark:text-dark-primary-text focus:outline-none focus:border-accent dark:focus:border-dark-accent transition-colors duration-300 py-2 cursor-pointer"
          popperClassName="z-30"
          showPopperArrow={false}
          customInput={
            <div className="relative flex items-center justify-center">
                <FiCalendar className={`absolute left-0 text-xl ${secondaryText}`} />
                <span className='liquid-light'>{selectedDate ? selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Select a Date'}</span>
                <FiChevronDown className={`absolute right-0 text-xl ${secondaryText}`} />
            </div>
          }
        />
      </div>

      {loading && <div className="animate-pulse text-lg text-secondary-text dark:text-dark-secondary-text">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {weatherData && (
        <div className="text-center mt-4 p-4 rounded-lg bg-background/50 dark:bg-dark-background/50 w-full">
            <h3 className="text-xl font-bold liquid-light">{weatherData.name}</h3>
            <p className={secondaryText}>{new Date(weatherData.dt * 1000).toLocaleDateString()}</p>
            <div className="flex items-center justify-center space-x-4 mt-2">
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
                <div className="text-5xl font-thin">
                    {Math.round(weatherData.main.temp - 273.15)}°C
                </div>
            </div>
            <p className="capitalize mt-2">{weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default TimeTravel;
