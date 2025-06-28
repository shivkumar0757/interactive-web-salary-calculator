import { useState, useEffect } from 'react';
import { SalaryDataMap } from '../types/data';

export const useData = () => {
  const [data, setData] = useState<SalaryDataMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/calculatorData.json');
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};