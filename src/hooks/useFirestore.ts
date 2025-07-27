import { useState, useEffect, useCallback } from 'react';
import { EmailSubmissionService, EmailSubmission } from '@/libs/firestore';

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

// Hook for fetching email submissions
export function useEmailSubmissions(): UseFirestoreReturn<EmailSubmission> {
  const [state, setState] = useState<UseFirestoreState<EmailSubmission>>({
    data: null,
    loading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await EmailSubmissionService.getAllSubmissions();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  }, []);

  const addDocument = useCallback(async (data: EmailSubmission): Promise<string> => {
    try {
      const id = await EmailSubmissionService.submitEmail({
        email: data.email,
        name: data.name,
        message: data.message
      });
      await fetchData(); // Refetch to update the list
      return id;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to add email submission');
    }
  }, [fetchData]);

  const updateDocument = useCallback(async (id: string, data: Partial<EmailSubmission>): Promise<void> => {
    try {
      if (data.read !== undefined) {
        await EmailSubmissionService.markAsRead(id);
      }
      await fetchData(); // Refetch to update the list
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to update email submission');
    }
  }, [fetchData]);

  const deleteDocument = useCallback(async (id: string): Promise<void> => {
    try {
      await EmailSubmissionService.deleteSubmission(id);
      await fetchData(); // Refetch to update the list
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to delete email submission');
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

// Hook for getting unread count
export function useUnreadCount() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCount = useCallback(async () => {
    try {
      setLoading(true);
      const unreadCount = await EmailSubmissionService.getUnreadCount();
      setCount(unreadCount);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch unread count');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  return { count, loading, error, refetch: fetchCount };
}

// Hook for submitting a single email
export function useEmailSubmission() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitEmail = useCallback(async (data: {
    email: string;
    name?: string;
    message?: string;
  }): Promise<string> => {
    try {
      setLoading(true);
      setError(null);
      const id = await EmailSubmissionService.submitEmail(data);
      return id;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit email';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { submitEmail, loading, error };
} 