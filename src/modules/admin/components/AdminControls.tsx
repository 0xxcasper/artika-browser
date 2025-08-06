'use client';

interface AdminFilters {
  statusFilter: 'all' | 'unread' | 'read';
  timeFilter: 'all' | '24h' | 'week' | 'month' | '3months';
  searchTerm: string;
}

interface AdminControlsProps {
  filters: AdminFilters;
  onFiltersChange: (filters: AdminFilters) => void;
  activeTab: 'tours' | 'newsletter';
}

export default function AdminControls({ 
  filters, 
  onFiltersChange, 
  activeTab 
}: AdminControlsProps) {
  const handleStatusChange = (status: 'all' | 'unread' | 'read') => {
    onFiltersChange({ ...filters, statusFilter: status });
  };

  const handleTimeChange = (time: 'all' | '24h' | 'week' | 'month' | '3months') => {
    onFiltersChange({ ...filters, timeFilter: time });
  };

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, searchTerm: search });
  };

  return (
    <div className="admin-controls">
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="status-filter">Status:</label>
          <select 
            id="status-filter"
            value={filters.statusFilter} 
            onChange={(e) => handleStatusChange(e.target.value as 'all' | 'unread' | 'read')}
            className="filter-select"
          >
            <option value="all">All</option>
            {activeTab === 'tours' ? (
              <>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </>
            ) : (
              <>
                <option value="unread">Active</option>
                <option value="read">Unsubscribed</option>
              </>
            )}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="time-filter">Time:</label>
          <select 
            id="time-filter"
            value={filters.timeFilter} 
            onChange={(e) => handleTimeChange(e.target.value as 'all' | '24h' | 'week' | 'month' | '3months')}
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
          placeholder={activeTab === 'tours' 
            ? "Search by name, phone, or email..." 
            : "Search by email or language..."
          }
          value={filters.searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
} 