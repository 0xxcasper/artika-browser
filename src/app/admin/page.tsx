'use client';

import { useState, useEffect } from 'react';
import { EmailSubmission } from '@/libs/firestore';
import { useEmailSubmissions, useUnreadCount } from '@/hooks/useFirestore';
import './styles.scss';

export default function AdminPage() {
  const [filteredSubmissions, setFilteredSubmissions] = useState<EmailSubmission[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Use the new hooks
  const { 
    data: submissions, 
    loading, 
    error, 
    refetch,
    updateDocument, 
    deleteDocument 
  } = useEmailSubmissions();

  const { count: unreadCount, refetch: refetchUnreadCount } = useUnreadCount();

  // Filter and search submissions
  useEffect(() => {
    if (!submissions) return;

    let filtered = submissions;

    // Apply read/unread filter
    if (filter === 'unread') {
      filtered = filtered.filter(sub => !sub.read);
    } else if (filter === 'read') {
      filtered = filtered.filter(sub => sub.read);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(sub => 
        sub.email.toLowerCase().includes(term) ||
        (sub.name && sub.name.toLowerCase().includes(term)) ||
        (sub.message && sub.message.toLowerCase().includes(term))
      );
    }

    setFilteredSubmissions(filtered);
  }, [submissions, filter, searchTerm]);

  const handleMarkAsRead = async (submissionId: string) => {
    try {
      await updateDocument(submissionId, { read: true });
      await refetchUnreadCount();
    } catch (err) {
      console.error('Error marking as read:', err);
      alert('Failed to mark as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadSubmissions = submissions?.filter(sub => !sub.read) || [];
      await Promise.all(
        unreadSubmissions.map(sub => updateDocument(sub.id, { read: true }))
      );
      await refetchUnreadCount();
    } catch (err) {
      console.error('Error marking all as read:', err);
      alert('Failed to mark all as read');
    }
  };

  const handleDelete = async (submissionId: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) {
      return;
    }

    try {
      await deleteDocument(submissionId);
      await refetchUnreadCount();
    } catch (err) {
      console.error('Error deleting submission:', err);
      alert('Failed to delete submission');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  const getReadCount = () => {
    return submissions?.filter(sub => sub.read).length || 0;
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading submissions...</p>
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

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="header-content">
          <h1>Email Submissions Admin</h1>
          <div className="admin-stats">
            <span className="stat-item">
              Total: {submissions?.length || 0}
            </span>
            <span className="stat-item unread">
              Unread: {unreadCount}
            </span>
            <span className="stat-item read">
              Read: {getReadCount()}
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
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'read')}
            className="filter-select"
          >
            <option value="all">All Submissions</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>
        </div>
        
        <div className="search-controls">
          <input
            type="text"
            placeholder="Search by email, name, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {!submissions || submissions.length === 0 ? (
        <div className="empty-state">
          <h3>No submissions yet</h3>
          <p>Email submissions will appear here once users start submitting forms.</p>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="empty-state">
          <h3>No results found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="submissions-list">
          {filteredSubmissions.map((submission) => (
            <div 
              key={submission.id} 
              className={`submission-card ${!submission.read ? 'unread' : ''}`}
            >
              <div className="submission-header">
                <div className="submission-info">
                  <h3 className="email">{submission.email}</h3>
                  {submission.name && (
                    <p className="name">Name: {submission.name}</p>
                  )}
                  <p className="date">
                    Submitted: {formatDate(submission.submittedAt)}
                  </p>
                </div>
                <div className="submission-status">
                  {!submission.read && (
                    <span className="unread-badge">New</span>
                  )}
                </div>
              </div>

              {submission.message && (
                <div className="submission-message">
                  <h4>Message:</h4>
                  <p>{submission.message}</p>
                </div>
              )}

              <div className="submission-actions">
                {!submission.read && (
                  <button
                    onClick={() => handleMarkAsRead(submission.id)}
                    className="action-button mark-read"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(submission.id)}
                  className="action-button delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredSubmissions.length > 0 && (
        <div className="results-info">
          Showing {filteredSubmissions.length} of {submissions?.length || 0} submissions
        </div>
      )}
    </div>
  );
} 