import React from 'react';
import { ChartDataPoint } from '../types/data';
import { DataProcessor } from '../utils/dataProcessor';

interface StatisticsPanelProps {
  data: ChartDataPoint[];
  country: string;
  language: string;
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ data, country, language }) => {
  if (data.length === 0) {
    return null;
  }

  const totalResponses = data.reduce((sum, item) => sum + item.count, 0);
  const overallMedian = data.length > 0 
    ? Math.round(data.reduce((sum, item) => sum + item.median, 0) / data.length)
    : 0;

  const highestPaying = data.reduce((max, item) => 
    item.median > max.median ? item : max, data[0]);

  return (
    <div className="card-dark p-8">
      <h3 className="text-xl font-bold text-white mb-6">
        Key Statistics
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30">
          <div className="text-3xl font-bold gradient-text mb-2">
            {DataProcessor.formatSalary(overallMedian)}
          </div>
          <div className="text-sm text-gray-400">Average Median Salary</div>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {totalResponses.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Total Responses</div>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-lg border border-orange-500/30">
          <div className="text-3xl font-bold text-orange-400 mb-2">
            {DataProcessor.formatSalary(highestPaying.median)}
          </div>
          <div className="text-sm text-gray-400">
            Highest ({highestPaying.experience.replace('More than ', '').replace(' years', 'y')})
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-900/20 rounded-lg border border-blue-500/30">
        <h4 className="font-semibold text-white mb-3">About this data</h4>
        <p className="text-sm text-gray-300">
          Salary data for <span className="text-purple-400 font-semibold">{language}</span> developers 
          in <span className="text-purple-400 font-semibold">{country}</span> based on the JetBrains 
          Developer Ecosystem Survey 2024. All figures represent annual gross salary in USD.
        </p>
      </div>
    </div>
  );
};