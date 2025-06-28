import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-purple-500 mx-auto mb-4"></div>
          <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-pink-500 animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <p className="text-gray-300 text-lg">Loading salary data...</p>
        <p className="text-gray-500 text-sm mt-2">Preparing insights from 50,000+ developers</p>
      </div>
    </div>
  );
};