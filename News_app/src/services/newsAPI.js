import { COUNTRY, API_CACHE_DURATION } from '../utils/constants';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

// Simple in-memory cache
const cache = new Map();

/**
 * Get cached data or fetch new data
 * @param {string} cacheKey - Cache key
 * @param {Function} fetchFn - Function to fetch data
 * @returns {Promise} Cached or fresh data
 */
const getCachedOrFetch = async (cacheKey, fetchFn) => {
  const cached = cache.get(cacheKey);
  const now = Date.now();

  if (cached && (now - cached.timestamp < API_CACHE_DURATION)) {
    return cached.data;
  }

  const data = await fetchFn();
  cache.set(cacheKey, { data, timestamp: now });
  return data;
};

/**
 * Make API request
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @returns {Promise} API response
 */
const makeRequest = async (endpoint, params = {}) => {
  if (!API_KEY) {
    throw new Error('API key is missing. Please set VITE_NEWS_API_KEY in your .env file');
  }

  const queryParams = new URLSearchParams({
    ...params,
    apiKey: API_KEY,
  });

  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your API key.');
      }
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message || 'API returned an error');
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
};

export const newsAPI = {
  /**
   * Get top headlines
   * @param {string|null} category - Category filter (optional)
   * @returns {Promise} News articles
   */
  getTopHeadlines: async (category = null) => {
    const cacheKey = `top-headlines-${category || 'all'}`;
    
    return getCachedOrFetch(cacheKey, async () => {
      const params = { country: COUNTRY };
      if (category) {
        params.category = category;
      }
      return makeRequest('/top-headlines', params);
    });
  },

  /**
   * Get news by category
   * @param {string} category - Category name
   * @returns {Promise} News articles
   */
  getNewsByCategory: async (category) => {
    return newsAPI.getTopHeadlines(category);
  },

  /**
   * Search news
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @param {string} options.sortBy - Sort by (relevancy, popularity, publishedAt)
   * @param {string} options.from - From date (YYYY-MM-DD)
   * @returns {Promise} Search results
   */
  searchNews: async (query, options = {}) => {
    if (!query || query.trim() === '') {
      return { articles: [], totalResults: 0 };
    }

    const cacheKey = `search-${query}-${JSON.stringify(options)}`;
    
    return getCachedOrFetch(cacheKey, async () => {
      const params = {
        q: query.trim(),
        sortBy: options.sortBy || 'publishedAt',
        language: 'en',
      };

      if (options.from) {
        params.from = options.from;
      }

      return makeRequest('/everything', params);
    });
  },
};

