
import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent">
      <div className="relative w-24 h-24">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-accent-pink/30 rounded-full animate-spin"></div>
        {/* Middle ring */}
        <div 
          className="absolute inset-2 border-4 border-link-blue/40 rounded-full"
          style={{ animation: 'spin 1.8s linear infinite reverse' }}
        ></div>
        {/* Inner dot */}
        <div className="absolute inset-5 bg-white/50 rounded-full animate-pulse"></div>
      </div>
      <p className="liquid-light text-2xl font-bold mt-8 tracking-wider">
        Fetching Weather...
      </p>
    </div>
  );
};

export default Loading;
