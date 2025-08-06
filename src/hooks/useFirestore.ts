import { useState, useEffect, useCallback } from 'react';
import { TourSubmissionService, TourSubmission } from '@/libs/firestore';

interface UseFirestoreState<T> {
  data: T[] | null;
  loading: boolean;
  error: string | null;
}

interface UseFirestoreReturn<T> extends UseFirestoreState<T> {
  refetch: () => Promise<void>;
  addDocument: (data: T) => Promise<string>;
  updateDocument: (id: string, data: Partial<T>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
}

// Hook for fetching tour submissions
export function useTourSubmissions(): UseFirestoreReturn<TourSubmission> {
  const [state, setState] = useState<UseFirestoreState<TourSubmission>>({
    data: null,
    loading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await TourSubmissionService.getAllSubmissions();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  }, []);

  const addDocument = useCallback(async (data: TourSubmission): Promise<string> => {
    try {
      const id = await TourSubmissionService.submitTourRequest({
        name: data.name,
        phone: data.phone,
        email: data.email,
        tourDate: data.tourDate
      });
      await fetchData(); // Refetch to update the list
      return id;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to add tour submission');
    }
  }, [fetchData]);

  const updateDocument = useCallback(async (id: string, data: Partial<TourSubmission>): Promise<void> => {
    try {
      if (data.read !== undefined) {
        await TourSubmissionService.markAsRead(id);
      }
      await fetchData(); // Refetch to update the list
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to update tour submission');
    }
  }, [fetchData]);

  const deleteDocument = useCallback(async (id: string): Promise<void> => {
    try {
      await TourSubmissionService.deleteSubmission(id);
      await fetchData(); // Refetch to update the list
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to delete tour submission');
    }
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
    addDocument,
    updateDocument,
    deleteDocument
  };
}

// Hook for getting tour unread count
export function useTourUnreadCount() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCount = useCallback(async () => {
    try {
      setLoading(true);
      const unreadCount = await TourSubmissionService.getUnreadCount();
      setCount(unreadCount);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch tour unread count');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  return {
    count,
    loading,
    error,
    refetch: fetchCount
  };
}

// Hook for tour submission
export function useScheduleTourSubmission() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitScheduleTour = useCallback(async (data: {
    name: string;
    phone: string;
    email: string;
    tourDate: Date;
  }) => {
    try {
      setLoading(true);
      setError(null);
      await TourSubmissionService.submitTourRequest(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to submit tour request');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    submitScheduleTour,
    loading,
    error
  };
} 