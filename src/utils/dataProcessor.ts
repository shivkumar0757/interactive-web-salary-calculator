import { 
  SalaryDataMap, 
  ProcessedData, 
  FilterOptions, 
  EXPERIENCE_LEVELS,
  SalaryEntry 
} from '../types/data';

export class DataProcessor {
  private data: SalaryDataMap;

  constructor(data: SalaryDataMap) {
    this.data = data;
  }

  getFilterOptions(): FilterOptions {
    const countries = Object.keys(this.data);
    const languagesSet = new Set<string>();
    
    countries.forEach(country => {
      Object.keys(this.data[country]).forEach(language => {
        languagesSet.add(language);
      });
    });

    return {
      countries: countries.sort(),
      languages: Array.from(languagesSet).sort(),
      experienceLevels: [...EXPERIENCE_LEVELS]
    };
  }

  processData(country: string, language: string): ProcessedData[] {
    if (!this.data[country] || !this.data[country][language]) {
      return [];
    }

    const entries = this.data[country][language].entries;
    const groupedByExperience = this.groupByExperience(entries);
    
    return EXPERIENCE_LEVELS.map(level => {
      const salaries = groupedByExperience[level] || [];
      return {
        experienceLevel: level,
        salaries,
        stats: this.calculateStats(salaries)
      };
    });
  }

  private groupByExperience(entries: SalaryEntry[]): Record<string, number[]> {
    const grouped: Record<string, number[]> = {};
    
    entries.forEach(entry => {
      const experience = entry.category;
      if (!grouped[experience]) {
        grouped[experience] = [];
      }
      grouped[experience].push(entry.value);
    });

    return grouped;
  }

  private calculateStats(salaries: number[]) {
    if (salaries.length === 0) {
      return {
        min: 0,
        max: 0,
        median: 0,
        percentile25: 0,
        percentile75: 0,
        count: 0
      };
    }

    const sorted = [...salaries].sort((a, b) => a - b);
    const count = sorted.length;
    
    return {
      min: sorted[0],
      max: sorted[count - 1],
      median: this.getPercentile(sorted, 50),
      percentile25: this.getPercentile(sorted, 25),
      percentile75: this.getPercentile(sorted, 75),
      count
    };
  }

  private getPercentile(sortedArray: number[], percentile: number): number {
    if (sortedArray.length === 0) return 0;
    
    const index = (percentile / 100) * (sortedArray.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    
    if (lower === upper) {
      return sortedArray[lower];
    }
    
    const weight = index - lower;
    return sortedArray[lower] * (1 - weight) + sortedArray[upper] * weight;
  }

  hasData(country: string, language: string): boolean {
    return !!(this.data[country] && this.data[country][language] && 
             this.data[country][language].entries.length > 0);
  }
} 