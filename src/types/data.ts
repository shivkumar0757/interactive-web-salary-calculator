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

export interface LanguageData {
  entries: SalaryEntry[];
}

export interface CountryData {
  [language: string]: LanguageData;
}

export interface SalaryDataMap {
  [country: string]: CountryData;
}

export interface ProcessedData {
  experienceLevel: string;
  salaries: number[];
  stats: {
    min: number;
    max: number;
    median: number;
    percentile25: number;
    percentile75: number;
    count: number;
  };
}

export interface FilterOptions {
  countries: string[];
  languages: string[];
  experienceLevels: string[];
}

export const EXPERIENCE_LEVELS = [
  '<1 year',
  '1–2 years', 
  '3–5 years',
  '6–10 years',
  '11–16 years',
  '16+ years'
] as const;

export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number]; 