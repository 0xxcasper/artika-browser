import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  fetchAllArtwalkCategories,
  fetchArtwalkCategory,
  fetchArtwalkContent,
  fetchAllArtwalkItems,
  fetchArtwalkItem,
} from '@/libs/prismic-artwalk';
import type {
  ArtwalkCategory,
  ArtwalkContent,
  ArtwalkCategoryList,
} from '@/types/artwalk';

// Hook to fetch all artwalk categories
export function useAllArtwalkCategories() {
  const { language } = useLanguage();
  const [categories, setCategories] = useState<ArtwalkCategoryList>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllArtwalkCategories(language);
        setCategories(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch categories',
        );
        console.error('Error in useAllArtwalkCategories:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [language]);

  return { categories, loading, error };
}

// Hook to fetch a specific artwalk category
export function useArtwalkCategory(slugId: string) {
  const { language } = useLanguage();
  const [category, setCategory] = useState<ArtwalkCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategory() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchArtwalkCategory(slugId, language);
        setCategory(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch category',
        );
        console.error('Error in useArtwalkCategory:', err);
      } finally {
        setLoading(false);
      }
    }

    if (slugId) {
      fetchCategory();
    }
  }, [slugId, language]);

  return { category, loading, error };
}

// Hook to fetch a specific artwalk content item
export function useArtwalkContent(contentId: string) {
  const { language } = useLanguage();
  const [content, setContent] = useState<ArtwalkContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchArtwalkContent(contentId, language);
        setContent(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch content',
        );
        console.error('Error in useArtwalkContent:', err);
      } finally {
        setLoading(false);
      }
    }

    if (contentId) {
      fetchContent();
    }
  }, [contentId, language]);

  return { content, loading, error };
}

// Hook to fetch all artwalk items (legacy compatibility)
export function useAllArtwalkItems() {
  const { language } = useLanguage();
  const [items, setItems] = useState<ArtwalkContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllArtwalkItems(language);
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch items');
        console.error('Error in useAllArtwalkItems:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [language]);

  return { items, loading, error };
}

// Hook to fetch a specific artwalk item (legacy compatibility)
export function useArtwalkItem(itemId: string) {
  const { language } = useLanguage();
  const [item, setItem] = useState<ArtwalkContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItem() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchArtwalkItem(itemId, language);
        setItem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch item');
        console.error('Error in useArtwalkItem:', err);
      } finally {
        setLoading(false);
      }
    }

    if (itemId) {
      fetchItem();
    }
  }, [itemId, language]);

  return { item, loading, error };
}
