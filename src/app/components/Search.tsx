'use client';

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchProps {
  onSearch: (location: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Search for a location..."
        className="w-full pl-12 pr-4 py-4 text-lg bg-white/10 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all duration-300 shadow-lg backdrop-blur-md"
      />
      <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors">
        <FiSearch size={24} />
      </button>
    </form>
  );
}
