export interface SalaryEntry {
  value: number;
  category: string;
  metadata: {
    Country: string;
    Language: string;
    Experience: string;
    Salary: string;
  };
}

export interface CountryData {
  [language: string]: {
    entries: SalaryEntry[];
  };
}

export interface SalaryDataMap {
  [country: string]: CountryData;
}

export interface ProcessedSalaryData {
  experienceLevel: string;
  salaries: number[];
  stats: {
    min: number;
    max: number;
    median: number;
    count: number;
  };
}

export interface ChartDataPoint {
  experience: string;
  min: number;
  max: number;
  median: number;
  q1: number;
  q3: number;
  count: number;
}

export const EXPERIENCE_LEVELS = [
  'Less than 1 year',
  '1–2 years',
  '3–5 years',
  '6–10 years',
  '11–15 years',
  'More than 16 years'
] as const;

export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number];