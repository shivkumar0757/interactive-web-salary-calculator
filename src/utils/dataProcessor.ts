import { SalaryDataMap, ProcessedSalaryData, ChartDataPoint, EXPERIENCE_LEVELS } from '../types/data';

export class DataProcessor {
  static processData(
    rawData: SalaryDataMap,
    country: string,
    language: string
  ): ProcessedSalaryData[] {
    const countryData = rawData[country];
    if (!countryData || !countryData[language]) {
      return [];
    }

    const entries = countryData[language].entries;
    const groupedByExperience: { [key: string]: number[] } = {};

    // Group salaries by experience level
    entries.forEach(entry => {
      const experience = entry.metadata.Experience;
      if (!groupedByExperience[experience]) {
        groupedByExperience[experience] = [];
      }
      groupedByExperience[experience].push(entry.value);
    });

    // Process each experience level
    return EXPERIENCE_LEVELS.map(level => {
      const salaries = groupedByExperience[level] || [];
      const sortedSalaries = salaries.sort((a, b) => a - b);
      
      return {
        experienceLevel: level,
        salaries: sortedSalaries,
        stats: this.calculateStats(sortedSalaries)
      };
    }).filter(data => data.salaries.length > 0);
  }

  static calculateStats(salaries: number[]) {
    if (salaries.length === 0) {
      return { min: 0, max: 0, median: 0, count: 0 };
    }

    const sorted = [...salaries].sort((a, b) => a - b);
    const count = sorted.length;
    const min = sorted[0];
    const max = sorted[count - 1];
    
    const median = count % 2 === 0
      ? (sorted[Math.floor(count / 2) - 1] + sorted[Math.floor(count / 2)]) / 2
      : sorted[Math.floor(count / 2)];

    return { min, max, median, count };
  }

  static processForChart(processedData: ProcessedSalaryData[]): ChartDataPoint[] {
    return processedData.map(data => {
      const sorted = data.salaries;
      const count = sorted.length;
      
      if (count === 0) {
        return {
          experience: data.experienceLevel,
          min: 0,
          max: 0,
          median: 0,
          q1: 0,
          q3: 0,
          count: 0
        };
      }

      const q1Index = Math.floor(count * 0.25);
      const q3Index = Math.floor(count * 0.75);
      
      return {
        experience: data.experienceLevel,
        min: data.stats.min,
        max: data.stats.max,
        median: data.stats.median,
        q1: sorted[q1Index] || data.stats.min,
        q3: sorted[q3Index] || data.stats.max,
        count: data.stats.count
      };
    });
  }

  static getAvailableCountries(data: SalaryDataMap): string[] {
    return Object.keys(data).sort();
  }

  static getAvailableLanguages(data: SalaryDataMap, country: string): string[] {
    const countryData = data[country];
    if (!countryData) return [];
    return Object.keys(countryData).sort();
  }

  static formatSalary(value: number): string {
    if (value >= 1000) {
      return `$${Math.round(value / 1000)}K`;
    }
    return `$${Math.round(value)}`;
  }
}