'use client';

import { useState } from 'react';
import { FiAlertCircle, FiCopy, FiCheck } from 'react-icons/fi';

interface ErrorDisplayProps {
  messages: string[];
  onRetry: () => void;
}

export default function ErrorDisplay({ messages, onRetry }: ErrorDisplayProps) {
  const [copied, setCopied] = useState(false);

  const getErrorContext = (msgs: string[]) => {
    if (msgs.some(m => m.includes('location found'))) {
        return {
            title: 'Location Not Found',
            description: 'The requested location could not be found by one or more of our data providers. Please check the spelling or try a different place.'
        };
    }
    if (msgs.length > 0) {
        return {
            title: 'Data Provider Error',
            description: 'There was a problem retrieving data from one or more of our weather sources. This is usually temporary.'
        };
    }
    return {
        title: 'An Unexpected Error Occurred',
        description: 'Something went wrong on our end. Please try again in a few moments.'
    };
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(messages.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { title, description } = getErrorContext(messages);

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center text-primary-text dark:text-dark-primary-text">
      <div className="border border-border dark:border-dark-border bg-card dark:bg-dark-card shadow-glass-light dark:shadow-glass-dark backdrop-blur-sm max-w-lg mx-auto rounded-2xl p-8 text-center">
        <FiAlertCircle className="text-6xl text-accent-pink mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-secondary-text dark:text-dark-secondary-text mb-6">
          {description}
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-left text-xs text-secondary-text dark:text-dark-secondary-text font-mono mb-6 relative">
          <ul>
            {messages.map((msg, index) => (
                <li key={index} className="py-1 border-b border-gray-200 dark:border-gray-700 last:border-b-0">{msg}</li>
            ))}
          </ul>
          <button onClick={handleCopy} className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
            {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
          </button>
        </div>

        <button
          onClick={onRetry}
          className="bg-accent-pink text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-opacity-50"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
