import type { Config } from 'tailwindcss';

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
      },
      boxShadow: {
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        sm: '4px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
