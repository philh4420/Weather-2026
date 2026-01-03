'use client';

import React, { useEffect } from 'react';

const WeatherBackground = ({ weatherCondition, onThemeChange }: { weatherCondition: string, onThemeChange: (theme: 'light' | 'dark') => void }) => {

  useEffect(() => {
    const getThemeAndBackground = () => {
      if (!weatherCondition) return { theme: 'dark' as const, video: '/videos/cloudy.mp4' };
      const condition = weatherCondition.toLowerCase();

      if (condition.includes('sun') || condition.includes('clear')) {
        return { theme: 'light' as const, video: '/videos/sunny.mp4' };
      }
      if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower') || condition.includes('thunder')) {
        return { theme: 'dark' as const, video: '/videos/rainy.mp4' };
      }
      if (condition.includes('mist') || condition.includes('fog')) {
        return { theme: 'dark' as const, video: '/videos/misty.mp4' };
      }
      return { theme: 'dark' as const, video: '/videos/cloudy.mp4' };
    };

    const { theme: newTheme, video } = getThemeAndBackground();
    onThemeChange(newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const videoElement = document.getElementById('background-video') as HTMLVideoElement;
    if (videoElement) {
        const sourceElement = videoElement.getElementsByTagName('source')[0];
        if (sourceElement && sourceElement.getAttribute('src') !== video) {
            sourceElement.setAttribute('src', video);
            videoElement.load();
        }
    }

  }, [weatherCondition, onThemeChange]);

  return (
    <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-20 dark:opacity-50 transition-opacity duration-1000"></div>
        <video id="background-video" autoPlay loop muted className="w-full h-full object-cover">
            <source src="/videos/cloudy.mp4" type="video/mp4" />
        </video>
    </div>
  );
};

export default WeatherBackground;
