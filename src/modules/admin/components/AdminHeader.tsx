'use client';

interface AdminHeaderProps {
  activeTab: 'tours' | 'newsletter';
  stats: {
    tours: { total: number; unread: number; read: number };
    newsletter: { total: number; active: number; unsubscribed: number };
  };
  unreadCount: number;
  onMarkAllAsRead: () => void;
  onRefresh: () => void;
}

export default function AdminHeader({
  activeTab,
  stats,
  unreadCount,
  onMarkAllAsRead,
  onRefresh,
}: AdminHeaderProps) {
  return (
    <div className="admin-header">
      <div className="header-content">
        <h1>Admin Dashboard</h1>
        <div className="admin-stats">
          {activeTab === 'tours' ? (
            <>
              <span className="stat-item">
                <span className="stat-label">Total Tours:</span>
                <span className="stat-value">{stats.tours.total}</span>
              </span>
              <span className="stat-item unread">
                <span className="stat-label">Unread:</span>
                <span className="stat-value">{stats.tours.unread}</span>
              </span>
              <span className="stat-item read">
                <span className="stat-label">Read:</span>
                <span className="stat-value">{stats.tours.read}</span>
              </span>
            </>
          ) : (
            <>
              <span className="stat-item">
                <span className="stat-label">Total Subscriptions:</span>
                <span className="stat-value">{stats.newsletter.total}</span>
              </span>
              <span className="stat-item active">
                <span className="stat-label">Active:</span>
                <span className="stat-value">{stats.newsletter.active}</span>
              </span>
              <span className="stat-item unsubscribed">
                <span className="stat-label">Unsubscribed:</span>
                <span className="stat-value">
                  {stats.newsletter.unsubscribed}
                </span>
              </span>
            </>
          )}
        </div>
      </div>
      <div className="header-actions">
        {activeTab === 'tours' && unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="action-button mark-all-read"
          >
            Mark All as Read
          </button>
        )}
        <button onClick={onRefresh} className="refresh-button">
          Refresh
        </button>
      </div>
    </div>
  );
}
