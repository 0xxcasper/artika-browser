'use client';

import { useState, useEffect } from 'react';
import { TourSubmission } from '@/libs/firestore';
import { useTourSubmissions, useTourUnreadCount } from '@/hooks/useFirestore';
import './styles.scss';

type TimeFilter = 'all' | '24h' | 'week' | 'month' | '3months';
type StatusFilter = 'all' | 'unread' | 'read';

// Helper function to convert any date format to Date object
const parseDate = (date: Date | any): Date => {
  if (date instanceof Date) {
    return date;
  } else if (date && typeof date === 'object' && date.toDate) {
    // Firestore Timestamp object (fallback)
    return date.toDate();
  } else if (date && typeof date === 'string') {
    // String date
    return new Date(date);
  } else if (date && typeof date === 'number') {
    // Timestamp number
    return new Date(date);
  } else {
    // Fallback
    return new Date();
  }
};

export default function AdminPage() {
  const [filteredSubmissions, setFilteredSubmissions] = useState<TourSubmission[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<TourSubmission | null>(null);
  const [noteMessage, setNoteMessage] = useState('');
  const [noteLoading, setNoteLoading] = useState(false);

  // Use the tour submission hooks
  const { 
    data: tourSubmissions, 
    loading, 
    error, 
    refetch,
    updateDocument, 
    deleteDocument 
  } = useTourSubmissions();

  const { count: unreadCount, refetch: refetchUnreadCount } = useTourUnreadCount();

  // Filter and search submissions
  useEffect(() => {
    if (!tourSubmissions) return;

    let filtered = tourSubmissions;

    // Apply status filter (read/unread)
    if (statusFilter === 'unread') {
      filtered = filtered.filter(sub => !sub.read);
    } else if (statusFilter === 'read') {
      filtered = filtered.filter(sub => sub.read);
    }

    // Apply time filter
    if (timeFilter !== 'all') {
      const now = new Date();
      let cutoffDate: Date;

      switch (timeFilter) {
        case '24h':
          cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case 'week':
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case '3months':
          cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        default:
          cutoffDate = new Date(0); // Beginning of time
      }

      filtered = filtered.filter(sub => {
        const submissionDate = sub.submittedAt instanceof Date ? sub.submittedAt : parseDate(sub.submittedAt);
        return submissionDate >= cutoffDate;
      });
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(sub => 
        sub.email.toLowerCase().includes(term) ||
        sub.name.toLowerCase().includes(term) ||
        sub.phone.toLowerCase().includes(term)
      );
    }

    setFilteredSubmissions(filtered);
  }, [tourSubmissions, statusFilter, timeFilter, searchTerm]);

  const handleMarkAsRead = (submission: TourSubmission) => {
    setSelectedSubmission(submission);
    setNoteMessage('');
    setShowNoteModal(true);
  };

  const handleSubmitNote = async () => {
    if (!selectedSubmission || !noteMessage.trim()) {
      alert('Please enter a note message');
      return;
    }

    setNoteLoading(true);
    try {
      await updateDocument(selectedSubmission.id, { 
        read: true,
        note: noteMessage.trim(),
        readAt: new Date()
      });
      await refetchUnreadCount();
      setShowNoteModal(false);
      setSelectedSubmission(null);
      setNoteMessage('');
    } catch (err) {
      console.error('Error marking as read with note:', err);
      alert('Failed to save note');
    } finally {
      setNoteLoading(false);
    }
  };

  const handleCancelNote = () => {
    setShowNoteModal(false);
    setSelectedSubmission(null);
    setNoteMessage('');
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadSubmissions = tourSubmissions?.filter(sub => !sub.read) || [];
      await Promise.all(
        unreadSubmissions.map(sub => updateDocument(sub.id, { 
          read: true,
          note: 'Bulk marked as read',
          readAt: new Date()
        }))
      );
      await refetchUnreadCount();
    } catch (err) {
      console.error('Error marking all as read:', err);
      alert('Failed to mark all as read');
    }
  };

  const handleDelete = async (submissionId: string) => {
    if (!confirm('Are you sure you want to delete this tour request?')) {
      return;
    }

    try {
      await deleteDocument(submissionId);
      await refetchUnreadCount();
    } catch (err) {
      console.error('Error deleting tour request:', err);
      alert('Failed to delete tour request');
    }
  };

  const formatDate = (date: Date | any) => {
    // Handle Firestore timestamp conversion
    let dateObj: Date;
    
    if (date instanceof Date) {
      dateObj = date;
    } else if (date && typeof date === 'object' && date.toDate) {
      // Firestore Timestamp object
      dateObj = date.toDate();
    } else if (date && typeof date === 'string') {
      // String date
      dateObj = new Date(date);
    } else if (date && typeof date === 'number') {
      // Timestamp number
      dateObj = new Date(date);
    } else {
      // Fallback for invalid dates
      return 'Invalid Date';
    }

    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }

    return dateObj.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTourDate = (date: Date | any) => {
    let dateObj: Date;
    
    if (date instanceof Date) {
      dateObj = date;
    } else if (date && typeof date === 'object' && date.toDate) {
      dateObj = date.toDate();
    } else if (date && typeof date === 'string') {
      dateObj = new Date(date);
    } else if (date && typeof date === 'number') {
      dateObj = new Date(date);
    } else {
      return 'Invalid Date';
    }

    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }

    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getFilteredStats = () => {
    const total = filteredSubmissions.length;
    const unread = filteredSubmissions.filter(sub => !sub.read).length;
    const read = filteredSubmissions.filter(sub => sub.read).length;
    return { total, unread, read };
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading tour requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={refetch} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stats = getFilteredStats();

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="header-content">
          <h1>Tour Requests Management</h1>
          <div className="admin-stats">
            <span className="stat-item">
              <span className="stat-label">Total:</span>
              <span className="stat-value">{stats.total}</span>
            </span>
            <span className="stat-item unread">
              <span className="stat-label">Unread:</span>
              <span className="stat-value">{stats.unread}</span>
            </span>
            <span className="stat-item read">
              <span className="stat-label">Read:</span>
              <span className="stat-value">{stats.read}</span>
            </span>
          </div>
        </div>
        <div className="header-actions">
          {unreadCount > 0 && (
            <button onClick={handleMarkAllAsRead} className="action-button mark-all-read">
              Mark All as Read
            </button>
          )}
          <button onClick={refetch} className="refresh-button">
            Refresh
          </button>
        </div>
      </div>

      <div className="admin-controls">
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="status-filter">Status:</label>
            <select 
              id="status-filter"
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="time-filter">Time:</label>
            <select 
              id="time-filter"
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
              className="filter-select"
            >
              <option value="all">All Time</option>
              <option value="24h">Last 24 Hours</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="3months">Last 3 Months</option>
            </select>
          </div>
        </div>
        
        <div className="search-controls">
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {!tourSubmissions || tourSubmissions.length === 0 ? (
        <div className="empty-state">
          <h3>No tour requests yet</h3>
          <p>Tour requests will appear here once users start submitting forms.</p>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="empty-state">
          <h3>No results found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="submissions-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Tour Date</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id} className={!submission.read ? 'unread-row' : ''}>
                  <td className="name-cell">
                    <span className="name-text">{submission.name || 'Tour Request'}</span>
                  </td>
                  <td className="phone-cell">
                    <span className="phone-text">{submission.phone}</span>
                  </td>
                  <td className="email-cell">
                    <span className="email-text">{submission.email}</span>
                  </td>
                  <td className="tour-date-cell">
                    {formatTourDate(submission.tourDate)}
                  </td>
                  <td className="date-cell">
                    {formatDate(submission.submittedAt)}
                  </td>
                  <td className="status-cell">
                    {!submission.read ? (
                      <span className="status-badge unread">New</span>
                    ) : (
                      <span className="status-badge read">Read</span>
                    )}
                  </td>
                  <td className="note-cell">
                    {submission.note ? (
                      <span className="note-text" title={submission.note}>
                        {submission.note.length > 30 ? `${submission.note.substring(0, 30)}...` : submission.note}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      {!submission.read && (
                        <button
                          onClick={() => handleMarkAsRead(submission)}
                          className="action-button mark-read"
                          title="Mark as read"
                        >
                          ✓
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(submission.id)}
                        className="action-button delete"
                        title="Delete"
                      >
                        ×
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredSubmissions.length > 0 && (
        <div className="results-info">
          Showing {filteredSubmissions.length} of {tourSubmissions?.length || 0} tour requests
        </div>
      )}

      {/* Note Modal */}
      {showNoteModal && (
        <div className="modal-overlay">
          <div className="note-modal">
            <div className="modal-header">
              <h3>Add Note</h3>
              <button onClick={handleCancelNote} className="close-button">×</button>
            </div>
            <div className="modal-content">
              <p className="modal-subtitle">
                Marking as read: <strong>
                  {selectedSubmission?.name === 'Tour Request' ? 'Tour Request' : selectedSubmission?.name} - {selectedSubmission?.phone}
                </strong>
              </p>
              <div className="note-input-group">
                <label htmlFor="note-input">Note Message (Required):</label>
                <textarea
                  id="note-input"
                  value={noteMessage}
                  onChange={(e) => setNoteMessage(e.target.value)}
                  placeholder="Enter your note about this tour request..."
                  rows={4}
                  className="note-textarea"
                  disabled={noteLoading}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button 
                onClick={handleCancelNote} 
                className="cancel-button"
                disabled={noteLoading}
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitNote} 
                className="submit-button"
                disabled={noteLoading || !noteMessage.trim()}
              >
                {noteLoading ? 'Saving...' : 'Save Note'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 