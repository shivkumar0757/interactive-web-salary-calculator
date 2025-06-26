import React from 'react';

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select...'
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-purple-200">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 backdrop-blur-sm"
      >
        <option value="" className="bg-gray-800 text-gray-300">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-gray-800 text-white">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}; 