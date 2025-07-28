import fs from 'fs';
import path from 'path';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class PrismicServerCache {
  private cacheDir: string;
  private defaultTTL = 5 * 60 * 1000; // 5 phút

  constructor() {
    this.cacheDir = path.join(process.cwd(), '.cache', 'prismic');
    this.ensureCacheDir();
  }

  private ensureCacheDir(): void {
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  private getCacheFilePath(key: string): string {
    const safeKey = key.replace(/[^a-zA-Z0-9]/g, '_');
    return path.join(this.cacheDir, `${safeKey}.json`);
  }

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    try {
      const cacheItem: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        ttl,
      };

      const filePath = this.getCacheFilePath(key);
      fs.writeFileSync(filePath, JSON.stringify(cacheItem, null, 2));
    } catch (error) {
      console.warn('Failed to save cache to file:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const filePath = this.getCacheFilePath(key);
      
      if (!fs.existsSync(filePath)) {
        return null;
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      const item: CacheItem<T> = JSON.parse(content);

      const now = Date.now();
      const isExpired = now - item.timestamp > item.ttl;

      if (isExpired) {
        fs.unlinkSync(filePath);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn('Failed to load cache from file:', error);
      return null;
    }
  }

  clear(): void {
    try {
      if (fs.existsSync(this.cacheDir)) {
        const files = fs.readdirSync(this.cacheDir);
        for (const file of files) {
          fs.unlinkSync(path.join(this.cacheDir, file));
        }
      }
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }

  cleanup(): void {
    try {
      if (!fs.existsSync(this.cacheDir)) return;

      const files = fs.readdirSync(this.cacheDir);
      const now = Date.now();

      for (const file of files) {
        const filePath = path.join(this.cacheDir, file);
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const item: CacheItem<any> = JSON.parse(content);

          if (now - item.timestamp > item.ttl) {
            fs.unlinkSync(filePath);
          }
        } catch (error) {
          // Remove corrupted files
          fs.unlinkSync(filePath);
        }
      }
    } catch (error) {
      console.warn('Failed to cleanup cache:', error);
    }
  }

  getStats(): { size: number; files: string[] } {
    try {
      if (!fs.existsSync(this.cacheDir)) {
        return { size: 0, files: [] };
      }

      const files = fs.readdirSync(this.cacheDir);
      return {
        size: files.length,
        files,
      };
    } catch (error) {
      return { size: 0, files: [] };
    }
  }
}

export const prismicServerCache = new PrismicServerCache();

// Helper function để tạo cache key
export function createCacheKey(type: string, lang: string): string {
  return `${type}:${lang}`;
} 