import { useCallback } from 'react';
import { TourSubmission, NewsletterSubscription, TourSubmissionService, NewsletterSubscriptionService } from '@/libs/firestore';

interface UseAdminActionsProps {
  tourSubmissions: TourSubmission[] | null;
  updateTourDocument: (id: string, data: Partial<TourSubmission>) => Promise<void>;
  deleteTourDocument: (id: string) => Promise<void>;
  updateNewsletterDocument: (id: string, data: Partial<NewsletterSubscription>) => Promise<void>;
  deleteNewsletterDocument: (id: string) => Promise<void>;
  refetchUnreadCount: () => Promise<void>;
  refetchActiveNewsletterCount: () => Promise<void>;
  setSelectedSubmission: (submission: TourSubmission | null) => void;
  setShowNoteModal: (show: boolean) => void;
}

export function useAdminActions({
  tourSubmissions,
  updateTourDocument,
  deleteTourDocument,
  deleteNewsletterDocument,
  refetchUnreadCount,
  refetchActiveNewsletterCount,
  setSelectedSubmission,
  setShowNoteModal
}: UseAdminActionsProps) {
  const handleMarkAsRead = useCallback((submission: TourSubmission) => {
    setSelectedSubmission(submission);
    setShowNoteModal(true);
  }, [setSelectedSubmission, setShowNoteModal]);

  const handleMarkAsReadSimple = useCallback(async (submission: TourSubmission) => {
    try {
      await updateTourDocument(submission.id, { 
        read: true,
        readAt: new Date()
      });
      await refetchUnreadCount();
    } catch (error) {
      console.error('Error marking as read:', error);
      throw new Error('Failed to mark as read');
    }
  }, [updateTourDocument, refetchUnreadCount]);

  const handleSubmitNote = useCallback(async (note: string, submission: TourSubmission) => {
    if (!note.trim()) {
      throw new Error('Please enter a note message');
    }

    console.log('Submitting note:', { note, submissionId: submission.id });

    try {
      await TourSubmissionService.updateSubmissionWithNote(submission.id, note.trim());
      console.log('Note updated successfully');
      await refetchUnreadCount();
      setShowNoteModal(false);
      setSelectedSubmission(null);
    } catch (error) {
      console.error('Error updating note:', error);
      throw new Error('Failed to update note');
    }
  }, [refetchUnreadCount, setShowNoteModal, setSelectedSubmission]);

  const handleCancelNote = useCallback(() => {
    setShowNoteModal(false);
    setSelectedSubmission(null);
  }, [setShowNoteModal, setSelectedSubmission]);

  const handleMarkAllAsRead = useCallback(async () => {
    try {
      const unreadSubmissions = tourSubmissions?.filter(sub => !sub.read) || [];
      await Promise.all(
        unreadSubmissions.map(sub => updateTourDocument(sub.id, { 
          read: true,
          note: 'Bulk marked as read',
          readAt: new Date()
        }))
      );
      await refetchUnreadCount();
    } catch (err) {
      console.error('Error marking all as read:', err);
      throw new Error('Failed to mark all as read');
    }
  }, [tourSubmissions, updateTourDocument, refetchUnreadCount]);

  const handleDelete = useCallback(async (submissionId: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    
    try {
      await deleteTourDocument(submissionId);
      await refetchUnreadCount();
    } catch (err) {
      console.error('Error deleting submission:', err);
      throw new Error('Failed to delete submission');
    }
  }, [deleteTourDocument, refetchUnreadCount]);

  const handleNewsletterDelete = useCallback(async (subscriptionId: string) => {
    if (!confirm('Are you sure you want to delete this newsletter subscription?')) return;
    
    try {
      await deleteNewsletterDocument(subscriptionId);
      await refetchActiveNewsletterCount();
    } catch (err) {
      console.error('Error deleting newsletter subscription:', err);
      throw new Error('Failed to delete newsletter subscription');
    }
  }, [deleteNewsletterDocument, refetchActiveNewsletterCount]);

  const handleNewsletterAddNote = useCallback(async (note: string, subscription: NewsletterSubscription) => {
    if (!note.trim()) {
      throw new Error('Note cannot be empty');
    }
    
    try {
      await NewsletterSubscriptionService.updateSubscriptionWithNote(subscription.id, note.trim());
      await refetchActiveNewsletterCount();
    } catch (err) {
      console.error('Error adding note to newsletter subscription:', err);
      throw new Error('Failed to add note to newsletter subscription');
    }
  }, [refetchActiveNewsletterCount]);

  return {
    handleMarkAsRead,
    handleMarkAsReadSimple,
    handleSubmitNote,
    handleCancelNote,
    handleMarkAllAsRead,
    handleDelete,
    handleNewsletterDelete,
    handleNewsletterAddNote
  };
} 