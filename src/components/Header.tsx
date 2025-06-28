import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="text-2xl font-bold gradient-text">
                JetBrains
              </div>
            </div>
            <div className="ml-6">
              <h1 className="text-lg font-medium text-white">
                IT Salary Calculator
              </h1>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Developer Ecosystem Survey 2024
          </div>
        </div>
      </div>
    </header>
  );
};