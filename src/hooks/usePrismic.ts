import { useState, useEffect } from 'react';
import { HomepageDocument } from '@/libs/prismic';

export function useHomepageData() {
  const [data, setData] = useState<HomepageDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/homepage');
        
        if (!response.ok) {
          throw new Error('Failed to fetch homepage data');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
} 