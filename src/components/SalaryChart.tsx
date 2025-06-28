import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ChartDataPoint } from '../types/data';
import { DataProcessor } from '../utils/dataProcessor';

interface SalaryChartProps {
  data: ChartDataPoint[];
  country: string;
  language: string;
}

const COLORS = ['#883AE1', '#DA00FF', '#FF6B35', '#0066CC', '#00C851', '#FF8800'];

export const SalaryChart: React.FC<SalaryChartProps> = ({ data, country, language }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-gray-600 p-4 rounded-lg shadow-xl">
          <p className="font-semibold text-white mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <p className="text-gray-300">
              Median: <span className="font-medium text-purple-400">{DataProcessor.formatSalary(data.median)}</span>
            </p>
            <p className="text-gray-300">
              Range: <span className="font-medium text-purple-400">
                {DataProcessor.formatSalary(data.min)} - {DataProcessor.formatSalary(data.max)}
              </span>
            </p>
            <p className="text-gray-300">
              Responses: <span className="font-medium text-purple-400">{data.count}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value: number) => {
    return DataProcessor.formatSalary(value);
  };

  const formatXAxis = (value: string) => {
    return value.replace('–', '-').replace('More than ', '16+');
  };

  if (data.length === 0) {
    return (
      <div className="card-dark p-8">
        <div className="text-center">
          <div className="text-gray-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No Data Available</h3>
          <p className="text-gray-400">
            No salary data found for {language} developers in {country}.
            <br />
            Try selecting a different combination.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-dark p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          2. Calculate the salary range for your experience level
        </h3>
        <p className="text-gray-400 mb-4">
          {language} developers in {country} • Median salaries by experience
        </p>
        <div className="text-lg text-gray-300">
          Coding specialists from <span className="text-purple-400 font-semibold">{country}</span> who 
          use <span className="text-purple-400 font-semibold">{language}</span> as their primary 
          programming language earn the following salaries:
        </div>
      </div>

      <div className="h-96 bg-white rounded-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="experience"
              tickFormatter={formatXAxis}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="median" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-400 italic">
        Note: Experience levels are based on years of professional programming experience. 
        Salaries are shown in USD and represent gross annual compensation.
      </div>
    </div>
  );
};