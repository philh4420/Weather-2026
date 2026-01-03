import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Meteoro Weather App',
  description: 'A modern, Apple-inspired weather application built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-background text-primary-text dark:bg-[#121212] dark:text-white`}>
        <div className="absolute inset-0 bg-noise opacity-[0.15] z-0" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
