import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ProcessedData } from '../../types/data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalaryChartProps {
  data: ProcessedData[];
  country: string;
  language: string;
}

export const SalaryChart: React.FC<SalaryChartProps> = ({ data, country, language }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-purple-300 text-lg mb-2">📊</div>
        <p className="text-purple-200">
          {!country || !language 
            ? 'Select a country and programming language to view salary data'
            : 'No data available for the selected filters'
          }
        </p>
      </div>
    );
  }

  // Filter out entries with no data
  const validData = data.filter(d => d.stats.count > 0);

  if (validData.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-purple-300 text-lg mb-2">📊</div>
        <p className="text-purple-200">
          No salary data available for {language} developers in {country}
        </p>
      </div>
    );
  }

  const chartData = {
    labels: validData.map(d => d.experienceLevel),
    datasets: [
      {
        label: '25th Percentile',
        data: validData.map(d => d.stats.percentile25),
        backgroundColor: 'rgba(147, 51, 234, 0.6)', // Purple-600 with opacity
        borderColor: 'rgba(147, 51, 234, 1)',
        borderWidth: 1,
      },
      {
        label: 'Median',
        data: validData.map(d => d.stats.median),
        backgroundColor: 'rgba(168, 85, 247, 0.8)', // Purple-500 with opacity
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 1,
      },
      {
        label: '75th Percentile',
        data: validData.map(d => d.stats.percentile75),
        backgroundColor: 'rgba(196, 122, 252, 0.6)', // Purple-400 with opacity
        borderColor: 'rgba(196, 122, 252, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#d8b4fe', // Purple-200
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.95)', // Gray-800 with opacity
        titleColor: '#ffffff',
        bodyColor: '#d8b4fe', // Purple-200
        borderColor: 'rgba(147, 51, 234, 0.5)',
        borderWidth: 1,
        callbacks: {
          title: (context: any) => {
            const experienceLevel = context[0].label;
            const dataPoint = validData.find(d => d.experienceLevel === experienceLevel);
            return `${experienceLevel} (${dataPoint?.stats.count} responses)`;
          },
          label: (context: any) => {
            return `${context.dataset.label}: $${context.parsed.y}k`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(107, 114, 128, 0.3)', // Gray-500 with opacity
        },
        ticks: {
          color: '#d8b4fe', // Purple-200
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.3)', // Gray-500 with opacity
        },
        ticks: {
          color: '#d8b4fe', // Purple-200
          font: {
            size: 11,
          },
          callback: function(value: any) {
            return '$' + value + 'k';
          },
        },
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="h-80 w-full">
        <Bar data={chartData} options={options} />
      </div>
      
      {/* Statistics Summary */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-gray-700/50 rounded-lg border border-purple-500/20">
          <div className="text-lg font-bold text-white">
            {validData.reduce((sum, d) => sum + d.stats.count, 0)}
          </div>
          <div className="text-xs text-purple-300">Total Responses</div>
        </div>
        <div className="p-3 bg-gray-700/50 rounded-lg border border-purple-500/20">
          <div className="text-lg font-bold text-white">
            ${Math.round(
              validData.reduce((sum, d) => sum + d.stats.median, 0) / validData.length
            )}k
          </div>
          <div className="text-xs text-purple-300">Avg Median</div>
        </div>
        <div className="p-3 bg-gray-700/50 rounded-lg border border-purple-500/20">
          <div className="text-lg font-bold text-white">
            ${Math.round(Math.max(...validData.map(d => d.stats.percentile75)))}k
          </div>
          <div className="text-xs text-purple-300">Max 75th %ile</div>
        </div>
      </div>
    </div>
  );
}; 