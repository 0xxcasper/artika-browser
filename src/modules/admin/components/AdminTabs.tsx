'use client';

interface AdminTabsProps {
  activeTab: 'tours' | 'newsletter';
  onTabChange: (tab: 'tours' | 'newsletter') => void;
  tourCount: number;
  newsletterCount: number;
}

export default function AdminTabs({
  activeTab,
  onTabChange,
  tourCount,
  newsletterCount,
}: AdminTabsProps) {
  return (
    <div className="admin-tabs">
      <button
        className={`tab-button ${activeTab === 'tours' ? 'active' : ''}`}
        onClick={() => onTabChange('tours')}
      >
        Tour Requests ({tourCount})
      </button>
      <button
        className={`tab-button ${activeTab === 'newsletter' ? 'active' : ''}`}
        onClick={() => onTabChange('newsletter')}
      >
        Newsletter Subscriptions ({newsletterCount})
      </button>
    </div>
  );
}
