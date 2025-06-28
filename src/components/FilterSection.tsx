import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterSectionProps {
  countries: string[];
  languages: string[];
  selectedCountry: string;
  selectedLanguage: string;
  onCountryChange: (country: string) => void;
  onLanguageChange: (language: string) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  countries,
  languages,
  selectedCountry,
  selectedLanguage,
  onCountryChange,
  onLanguageChange,
}) => {
  return (
    <div className="card-dark p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          1. Enter your programming language and country
        </h2>
        <p className="text-gray-400">
          Select your programming language and location to see salary insights
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Programming Language Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Programming language
          </label>
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="w-full px-4 py-4 pr-12 input-dark rounded-lg appearance-none text-lg font-medium"
            >
              {languages.map((language) => (
                <option key={language} value={language} className="bg-gray-700">
                  {language}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Country Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Country
          </label>
          <div className="relative">
            <select
              value={selectedCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              className="w-full px-4 py-4 pr-12 input-dark rounded-lg appearance-none text-lg font-medium"
            >
              {countries.map((country) => (
                <option key={country} value={country} className="bg-gray-700">
                  {country}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};