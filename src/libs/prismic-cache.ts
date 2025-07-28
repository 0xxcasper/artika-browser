interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class PrismicCache {
  private cache = new Map<string, CacheItem<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 phút
  private storageKey = 'prismic_cache';

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return; // Server-side

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, CacheItem<any>>;
        const now = Date.now();
        
        // Filter out expired items
        for (const [key, item] of Object.entries(parsed)) {
          if (now - item.timestamp < item.ttl) {
            this.cache.set(key, item);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to load cache from storage:', error);
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return; // Server-side

    try {
      const data = Object.fromEntries(this.cache);
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save cache to storage:', error);
    }
  }

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
    this.saveToStorage();
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    const now = Date.now();
    const isExpired = now - item.timestamp > item.ttl;

    if (isExpired) {
      this.cache.delete(key);
      this.saveToStorage();
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
  }

  // Clear expired items
  cleanup(): void {
    const now = Date.now();
    let hasChanges = false;
    
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
        hasChanges = true;
      }
    }

    if (hasChanges) {
      this.saveToStorage();
    }
  }

  // Get cache stats
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

export const prismicCache = new PrismicCache();

// Helper function để tạo cache key
export function createCacheKey(type: string, lang: string): string {
  return `${type}:${lang}`;
} 