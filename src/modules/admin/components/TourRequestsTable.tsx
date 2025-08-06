'use client';

import { TourSubmission } from '@/libs/firestore';
import { formatDate, formatTourDate } from '@/modules/admin/utils/dateUtils';

interface TourRequestsTableProps {
  submissions: TourSubmission[];
  allSubmissions: TourSubmission[] | null;
  onMarkAsRead: (submission: TourSubmission) => void;
  onDelete: (submissionId: string) => void;
  onAddNote: (submission: TourSubmission) => void;
}

export default function TourRequestsTable({ 
  submissions, 
  allSubmissions, 
  onMarkAsRead, 
  onDelete, 
  onAddNote 
}: TourRequestsTableProps) {
  if (!allSubmissions || allSubmissions.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tour requests yet</h3>
        <p>Tour requests will appear here once users start submitting forms.</p>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tour requests match your filters</h3>
        <p>Try adjusting your search terms or filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="table-container">
        <table className="submissions-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>PHONE</th>
              <th>EMAIL</th>
              <th>TOUR DATE</th>
              <th>SUBMITTED</th>
              <th>STATUS</th>
              <th>NOTE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
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
                    <span className="status-badge unread">NEW</span>
                  ) : (
                    <span className="status-badge read">READ</span>
                  )}
                </td>
                <td className="note-cell">
                  {submission.note ? (
                    <span className="note-text" title={submission.note}>
                      {submission.note} shdjhfhjdf sgdsjgshghds hdjfhdjfhjdhjdh sjusjsgds
                    </span>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="actions-cell">
                  <div className="action-buttons">
                    {!submission.read && (
                      <>
                        <button
                          onClick={() => onMarkAsRead(submission)}
                          className="action-button mark-read"
                          title="Mark as read"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => onAddNote(submission)}
                          className="action-button add-note"
                          title="Add note"
                        >
                          📝
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onDelete(submission.id)}
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
      
      <div className="results-info">
        Showing {submissions.length} of {allSubmissions.length} tour requests
      </div>
    </>
  );
} 