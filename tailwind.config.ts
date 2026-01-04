import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F0F2F5',
        card: 'rgba(255, 255, 255, 0.5)',
        'primary-text': '#111827',
        'secondary-text': '#6B7280',
        border: 'rgba(255, 255, 255, 0.3)',
        'link-blue': '#3B82F6',
        'accent-pink': '#EC4899',
        'accent-purple': '#8B5CF6',
        'accent-cyan': '#22D3EE',
        'accent-orange': '#F97316',
        'iridescent-deep-blue': '#0a192f',
        'iridescent-blue': '#3b82f6',
        'iridescent-purple': '#8b5cf6',
        'iridescent-pink': '#ec4899',
        'iridescent-cyan': '#22d3ee',
      },
      boxShadow: {
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'holographic': '0 0 15px 0px rgba(139, 92, 246, 0.5), 0 0 25px 0px rgba(34, 211, 238, 0.3)',
      },
      backdropBlur: {
        sm: '4px',
        xl: '24px',
      },
      backgroundImage: {
        'aurora': 'linear-gradient(125deg, #8B5CF6, #EC4899, #F97316, #22D3EE)',
        'noise': "url('data:image/svg+xml,<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\'><filter id=\"noise\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noise)\'/></svg>')",
        'text-shimmer-light': 'linear-gradient(90deg, #111827, #6B7280, #111827)',
        'text-shimmer-dark': 'linear-gradient(90deg, #4C1D95, #3730A3, #1E3A8A, #4C1D95)',
      },
      textShadow: {
        light: 'none',
        dark: '0 0 10px rgba(76, 29, 149, 0.5)',
      },
      animation: {
        'aurora': 'aurora 15s ease-in-out infinite',
        'text-shimmer': 'textShimmer 4s linear infinite',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        textShimmer: {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow-light': {
          textShadow: theme('textShadow.light'),
        },
        '.text-shadow-dark': {
          textShadow: theme('textShadow.dark'),
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};

export default config;
