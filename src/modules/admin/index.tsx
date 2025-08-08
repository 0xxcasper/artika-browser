'use client';

import { useState } from 'react';
import { TourSubmission, NewsletterSubscription } from '@/libs/firestore';
import {
  useTourSubmissions,
  useTourUnreadCount,
  useNewsletterSubscriptions,
  useNewsletterActiveCount,
} from '@/hooks/useFirestore';
import {
  AdminHeader,
  AdminTabs,
  AdminControls,
  TourRequestsTable,
  NewsletterTable,
  NoteModal,
} from './components';
import { useAdminFilters, useAdminActions } from './hooks';
import './styles.scss';

type TabType = 'tours' | 'newsletter';

export default function AdminModule() {
  const [activeTab, setActiveTab] = useState<TabType>('tours');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<
    TourSubmission | NewsletterSubscription | null
  >(null);

  // Use the tour submission hooks
  const {
    data: tourSubmissions,
    loading: tourLoading,
    error: tourError,
    refetch: refetchTours,
    updateDocument: updateTourDocument,
    deleteDocument: deleteTourDocument,
  } = useTourSubmissions();

  const { count: unreadCount, refetch: refetchUnreadCount } =
    useTourUnreadCount();

  // Use the newsletter subscription hooks
  const {
    data: newsletterSubscriptions,
    loading: newsletterLoading,
    error: newsletterError,
    refetch: refetchNewsletters,
    updateDocument: updateNewsletterDocument,
    deleteDocument: deleteNewsletterDocument,
  } = useNewsletterSubscriptions();

  const {
    count: activeNewsletterCount,
    refetch: refetchActiveNewsletterCount,
  } = useNewsletterActiveCount();

  // Use custom hooks for filters and actions
  const { filteredSubmissions, filteredNewsletters, filters, setFilters } =
    useAdminFilters(tourSubmissions, newsletterSubscriptions);

  const {
    handleMarkAsReadSimple,
    handleSubmitNote,
    handleCancelNote,
    handleMarkAllAsRead,
    handleDelete,
    handleNewsletterDelete,
    handleNewsletterAddNote,
  } = useAdminActions({
    tourSubmissions,
    updateTourDocument,
    deleteTourDocument,
    updateNewsletterDocument,
    deleteNewsletterDocument,
    refetchUnreadCount,
    refetchActiveNewsletterCount,
    setSelectedSubmission,
    setShowNoteModal,
  });

  // Custom note submit handler that also refetches tour data
  const handleNoteSubmit = async (
    note: string,
    submission: TourSubmission | NewsletterSubscription,
  ) => {
    try {
      if ('name' in submission) {
        // Tour submission
        await handleSubmitNote(note, submission);
        await refetchTours();
      } else {
        // Newsletter subscription
        await handleNewsletterAddNote(note, submission);
        await refetchNewsletters();
      }
    } catch (error) {
      console.error('Error submitting note:', error);
    }
  };

  if (tourLoading || newsletterLoading) {
    return (
      <div className="admin-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (tourError || newsletterError) {
    return (
      <div className="admin-page">
        <div className="error-container">
          <h2>Error</h2>
          <p>{tourError || newsletterError}</p>
          <button
            onClick={activeTab === 'tours' ? refetchTours : refetchNewsletters}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stats = {
    tours: {
      total: filteredSubmissions.length,
      unread: filteredSubmissions.filter((sub) => !sub.read).length,
      read: filteredSubmissions.filter((sub) => sub.read).length,
    },
    newsletter: {
      total: newsletterSubscriptions?.length || 0,
      active: activeNewsletterCount,
      unsubscribed:
        (newsletterSubscriptions?.length || 0) - activeNewsletterCount,
    },
  };

  return (
    <div className="admin-page">
      <AdminHeader
        activeTab={activeTab}
        stats={stats}
        unreadCount={unreadCount}
        onMarkAllAsRead={handleMarkAllAsRead}
        onRefresh={activeTab === 'tours' ? refetchTours : refetchNewsletters}
      />

      <AdminTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tourCount={tourSubmissions?.length || 0}
        newsletterCount={newsletterSubscriptions?.length || 0}
      />

      <AdminControls
        filters={filters}
        onFiltersChange={setFilters}
        activeTab={activeTab}
      />

      {activeTab === 'tours' ? (
        <TourRequestsTable
          submissions={filteredSubmissions}
          allSubmissions={tourSubmissions}
          onMarkAsRead={handleMarkAsReadSimple}
          onDelete={handleDelete}
          onAddNote={(submission: TourSubmission) => {
            setSelectedSubmission(submission);
            setShowNoteModal(true);
          }}
        />
      ) : (
        <NewsletterTable
          subscriptions={filteredNewsletters}
          allSubscriptions={newsletterSubscriptions}
          onAddNote={(subscription) => {
            setSelectedSubmission(
              subscription as TourSubmission | NewsletterSubscription,
            );
            setShowNoteModal(true);
          }}
          onDelete={handleNewsletterDelete}
        />
      )}

      {showNoteModal && selectedSubmission && (
        <NoteModal
          submission={selectedSubmission}
          onSubmit={handleNoteSubmit}
          onCancel={handleCancelNote}
        />
      )}
    </div>
  );
}
