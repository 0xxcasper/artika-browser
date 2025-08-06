import { useState, useEffect } from 'react';
import { TourSubmission, NewsletterSubscription } from '@/libs/firestore';
import { parseDate } from '@/modules/admin/utils/dateUtils';

type TimeFilter = 'all' | '24h' | 'week' | 'month' | '3months';
type StatusFilter = 'all' | 'unread' | 'read';

interface AdminFilters {
  statusFilter: StatusFilter;
  timeFilter: TimeFilter;
  searchTerm: string;
}

export function useAdminFilters(
  tourSubmissions: TourSubmission[] | null,
  newsletterSubscriptions: NewsletterSubscription[] | null,
) {
  const [filters, setFilters] = useState<AdminFilters>({
    statusFilter: 'all',
    timeFilter: 'all',
    searchTerm: ''
  });

  const [filteredSubmissions, setFilteredSubmissions] = useState<TourSubmission[]>([]);
  const [filteredNewsletters, setFilteredNewsletters] = useState<NewsletterSubscription[]>([]);

  // Filter and search tour submissions
  useEffect(() => {
    if (!tourSubmissions) return;

    let filtered = tourSubmissions;

    // Apply status filter (read/unread)
    if (filters.statusFilter === 'unread') {
      filtered = filtered.filter(sub => !sub.read);
    } else if (filters.statusFilter === 'read') {
      filtered = filtered.filter(sub => sub.read);
    }

    // Apply time filter
    if (filters.timeFilter !== 'all') {
      const now = new Date();
      let cutoffDate: Date;

      switch (filters.timeFilter) {
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
    if (filters.searchTerm.trim()) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(sub => 
        sub.email.toLowerCase().includes(term) ||
        sub.name.toLowerCase().includes(term) ||
        sub.phone.toLowerCase().includes(term)
      );
    }

    setFilteredSubmissions(filtered);
  }, [tourSubmissions, filters]);

  // Filter and search newsletter subscriptions
  useEffect(() => {
    if (!newsletterSubscriptions) return;

    let filtered = newsletterSubscriptions;

    // Apply status filter (active/unsubscribed)
    if (filters.statusFilter === 'unread') {
      filtered = filtered.filter(sub => sub.status === 'active');
    } else if (filters.statusFilter === 'read') {
      filtered = filtered.filter(sub => sub.status === 'unsubscribed');
    }

    // Apply time filter
    if (filters.timeFilter !== 'all') {
      const now = new Date();
      let cutoffDate: Date;

      switch (filters.timeFilter) {
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
        const subscriptionDate = sub.subscribedAt instanceof Date ? sub.subscribedAt : parseDate(sub.subscribedAt);
        return subscriptionDate >= cutoffDate;
      });
    }

    // Apply search filter
    if (filters.searchTerm.trim()) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(sub => 
        sub.email.toLowerCase().includes(term) ||
        sub.language.toLowerCase().includes(term)
      );
    }

    setFilteredNewsletters(filtered);
  }, [newsletterSubscriptions, filters]);

  return {
    filteredSubmissions,
    filteredNewsletters,
    filters,
    setFilters
  };
} 