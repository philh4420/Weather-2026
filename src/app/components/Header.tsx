'use client';

import { FiSearch, FiMapPin } from 'react-icons/fi';
import DateTime from '@/app/components/DateTime';

interface HeaderProps {
  location: string;
  setLocation: (location: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  handleGeolocation: () => void;
}

const Header: React.FC<HeaderProps> = ({ location, setLocation, handleSearch, handleGeolocation }) => {

  return (
    <header 
      className="relative isolate overflow-hidden bg-card/80 dark:bg-dark-card/80 backdrop-blur-xl rounded-lg border border-border dark:border-dark-border shadow-glass-light dark:shadow-glass-dark mb-8"
    >
      {/* Living Aurora Background - Subtle & Theme-Aware */}
      <div className="absolute inset-0 bg-aurora bg-[size:400%_400%] animate-aurora opacity-10 dark:opacity-20"></div>
      {/* Frosted Glass Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-5"></div>
      
      <div className="relative z-10 flex justify-between items-center w-full px-5 py-3">
        
        {/* Left Side: Branding and Time */}
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold tracking-tight text-primary-text dark:text-dark-primary-text pl-2"
              style={{textShadow: '0 0 12px var(--tw-color-accent-purple-500-alpha-0.6), 0 0 20px var(--tw-color-accent-cyan-500-alpha-0.4)'}}>
            Meteoro
          </h1>
          <div className="hidden md:block">
            <DateTime />
          </div>
        </div>

        {/* Right Side: Search and Geolocation */}
        <div className="flex items-center space-x-2">
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-black/5 dark:bg-white/5 border-2 border-transparent rounded-full py-2 pl-10 pr-4 focus:outline-none text-primary-text dark:text-dark-primary-text placeholder:text-secondary-text dark:placeholder:text-dark-secondary-text
                         transition-all duration-300 w-40 md:w-56 focus:w-48 md:focus:w-64
                         focus:bg-black/10 dark:focus:bg-white/10 focus:ring-1 focus:ring-accent-purple/50 focus:border-accent-purple/80"
              placeholder="Search city..."
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text dark:text-dark-secondary-text group-focus-within:text-accent-purple transition-colors" style={{filter: 'drop-shadow(0 0 6px var(--tw-color-accent-purple-500-alpha-0.5))'}}/>
          </form>
          <button 
            onClick={handleGeolocation} 
            className="relative isolate bg-black/5 dark:bg-white/5 border-2 border-transparent hover:border-accent-cyan/50 p-2.5 rounded-full 
                       transition-all duration-300 group 
                       hover:bg-black/10 dark:hover:bg-white/10
                       focus:outline-none focus:ring-1 focus:ring-accent-cyan/50"
            aria-label="Use my current location"
          >
            <FiMapPin className="text-link-blue group-hover:text-accent-cyan transition-colors" style={{filter: 'drop-shadow(0 0 6px var(--tw-color-accent-cyan-500-alpha-0.7))'}}/>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
