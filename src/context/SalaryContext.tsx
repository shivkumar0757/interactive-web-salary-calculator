import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { SalaryDataMap, ProcessedData, FilterOptions } from '../types/data';
import { DataProcessor } from '../utils/dataProcessor';

interface SalaryState {
  data: SalaryDataMap | null;
  processor: DataProcessor | null;
  selectedCountry: string;
  selectedLanguage: string;
  processedData: ProcessedData[];
  filterOptions: FilterOptions | null;
  loading: boolean;
  error: string | null;
}

type SalaryAction = 
  | { type: 'SET_DATA'; payload: SalaryDataMap }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_COUNTRY'; payload: string }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'UPDATE_PROCESSED_DATA'; payload: ProcessedData[] };

const initialState: SalaryState = {
  data: null,
  processor: null,
  selectedCountry: '',
  selectedLanguage: '',
  processedData: [],
  filterOptions: null,
  loading: true,
  error: null,
};

function salaryReducer(state: SalaryState, action: SalaryAction): SalaryState {
  switch (action.type) {
    case 'SET_DATA':
      const processor = new DataProcessor(action.payload);
      const filterOptions = processor.getFilterOptions();
      const defaultCountry = filterOptions.countries[0] || '';
      const defaultLanguage = filterOptions.languages[0] || '';
      
      return {
        ...state,
        data: action.payload,
        processor,
        filterOptions,
        selectedCountry: defaultCountry,
        selectedLanguage: defaultLanguage,
        loading: false,
      };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_COUNTRY':
      return { ...state, selectedCountry: action.payload };
    
    case 'SET_LANGUAGE':
      return { ...state, selectedLanguage: action.payload };
    
    case 'UPDATE_PROCESSED_DATA':
      return { ...state, processedData: action.payload };
    
    default:
      return state;
  }
}

const SalaryContext = createContext<{
  state: SalaryState;
  dispatch: React.Dispatch<SalaryAction>;
} | null>(null);

export const SalaryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(salaryReducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/calculatorData.json');
        if (!response.ok) {
          throw new Error('Failed to load salary data');
        }
        const data = await response.json();
        dispatch({ type: 'SET_DATA', payload: data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (state.processor && state.selectedCountry && state.selectedLanguage) {
      const processedData = state.processor.processData(
        state.selectedCountry, 
        state.selectedLanguage
      );
      dispatch({ type: 'UPDATE_PROCESSED_DATA', payload: processedData });
    }
  }, [state.processor, state.selectedCountry, state.selectedLanguage]);

  return (
    <SalaryContext.Provider value={{ state, dispatch }}>
      {children}
    </SalaryContext.Provider>
  );
};

export const useSalary = () => {
  const context = useContext(SalaryContext);
  if (!context) {
    throw new Error('useSalary must be used within a SalaryProvider');
  }
  return context;
}; 