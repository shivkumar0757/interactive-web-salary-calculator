import React from 'react';
import { useSalary } from '../../context/SalaryContext';
import { FilterDropdown } from './FilterDropdown';

export const FilterPanel: React.FC = () => {
  const { state, dispatch } = useSalary();

  const handleCountryChange = (country: string) => {
    dispatch({ type: 'SET_COUNTRY', payload: country });
  };

  const handleLanguageChange = (language: string) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  if (!state.filterOptions) {
    return (
      <div className="text-purple-200">
        Loading filter options...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FilterDropdown
          label="Programming language"
          value={state.selectedLanguage}
          options={state.filterOptions.languages}
          onChange={handleLanguageChange}
          placeholder="C/C++"
        />

        <FilterDropdown
          label="Country"
          value={state.selectedCountry}
          options={state.filterOptions.countries}
          onChange={handleCountryChange}
          placeholder="Brazil"
        />
      </div>

      {/* Status indicator */}
      {state.selectedCountry && state.selectedLanguage && (
        <div className="pt-4 border-t border-gray-600/30">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-purple-200">
              Showing data for {state.selectedLanguage} developers in {state.selectedCountry}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};