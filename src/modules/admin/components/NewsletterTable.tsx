'use client';

import { NewsletterSubscription } from '@/libs/firestore';
import { formatDate } from '@/modules/admin/utils/dateUtils';

interface NewsletterTableProps {
  subscriptions: NewsletterSubscription[];
  allSubscriptions: NewsletterSubscription[] | null;
  onAddNote: (subscription: NewsletterSubscription) => void;
  onDelete: (subscriptionId: string) => void;
}

export default function NewsletterTable({ 
  subscriptions, 
  allSubscriptions, 
  onAddNote, 
  onDelete
}: NewsletterTableProps) {
  if (!allSubscriptions || allSubscriptions.length === 0) {
    return (
      <div className="empty-state">
        <h3>No newsletter subscriptions yet</h3>
        <p>Newsletter subscriptions will appear here once users start signing up.</p>
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <div className="empty-state">
        <h3>No newsletter subscriptions match your filters</h3>
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
              <th>DATE</th>
              <th>EMAIL</th>
              <th>STATUS</th>
              <th>NOTE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription) => (
              <tr key={subscription.id} className={subscription.status === 'active' ? 'new-row' : 'done-row'}>
                <td className="date-cell">{formatDate(subscription.subscribedAt)}</td>
                <td className="email-cell">
                  <span className="email-text">{subscription.email}</span>
                </td>
                <td className="status-cell">
                  {subscription.status === 'active' ? (
                    <span className="status-badge new">NEW</span>
                  ) : (
                    <span className="status-badge done">DONE</span>
                  )}
                </td>
                <td className="note-cell">
                  {subscription.note ? (
                    <div className="note-text">
                      {subscription.note.length > 50 
                        ? `${subscription.note.substring(0, 50)}...` 
                        : subscription.note}
                    </div>
                  ) : (
                    <span className="no-note">-</span>
                  )}
                </td>
                <td className="actions-cell">
                  <div className="action-buttons">
                    <button
                      onClick={() => onAddNote(subscription)}
                      className="action-button add-note"
                      title="Add note"
                    >
                      📝
                    </button>
                    <button
                      onClick={() => onDelete(subscription.id)}
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
        Showing {subscriptions.length} of {allSubscriptions.length} newsletter subscriptions
      </div>
    </>
  );
} 