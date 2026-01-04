import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Meteoro - Live & Accurate Weather Forecasts',
  description: 'Get live, accurate weather forecasts with Meteoro. A modern, beautifully designed weather application providing real-time data on temperature, wind, humidity, and more. Your go-to weather companion.',
  keywords: ['weather', 'forecast', 'live weather', 'weather app', 'Next.js', 'React', 'weather forecast', 'temperature', 'humidity', 'wind speed', 'meteorology'],
  authors: [{ name: 'Phil Higdon', url: 'https://weather-2026.vercel.app/' }],
  creator: 'Phil Higdon',
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: 'Meteoro - Live Weather Forecast',
    description: 'Live, accurate weather forecasts in a beautifully designed application.',
    url: 'https://weather-2026.vercel.app/',
    siteName: 'Meteoro',
    images: ['/metero.jpg'],
    locale: 'en_GB',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Meteoro - Live Weather Forecast',
    description: 'Live, accurate weather forecasts in a beautifully designed application.',
    images: ['/metero.jpg'],
  },

  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
  
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },

  icons: {
    icon: '/meteoro.webp',
    apple: '/apple-touch-icon.svg',
  },

  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Meteoro',
    'url': 'https://weather-2026.vercel.app/',
    'applicationCategory': 'WeatherApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
    },
    'description': 'A modern, Apple-inspired weather application built with Next.js, providing real-time weather forecasts.',
  };

  return (
    <html lang="en">
      <body className={`${poppins.className} bg-background text-primary-text dark:bg-[#121212] dark:text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="absolute inset-0 bg-noise opacity-[0.15] z-0" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
