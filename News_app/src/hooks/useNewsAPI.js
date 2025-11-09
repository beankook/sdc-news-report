import { useState, useEffect } from 'react';
import { newsAPI } from '../services/newsAPI';

/**
 * Custom hook for fetching news with caching
 * @param {Function} fetchFunction - Function to fetch news
 * @param {Array} dependencies - Dependencies array for useEffect
 * @returns {{ articles: Array, loading: boolean, error: string | null }}
 */
export const useNewsAPI = (fetchFunction, dependencies = []) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchFunction();
        if (isMounted) {
          setArticles(data.articles || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch news');
          setArticles([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { articles, loading, error };
};

