import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { newsAPI } from '../services/newsAPI';
import NewsFeed from '../components/news/NewsFeed';
import SearchFilters from '../components/search/SearchFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('publishedAt');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setArticles([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await newsAPI.searchNews(query, { sortBy });
        setArticles(data.articles || []);
      } catch (err) {
        setError(err.message || 'Failed to search news');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, sortBy]);

  const handleRetry = () => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await newsAPI.searchNews(query, { sortBy });
        setArticles(data.articles || []);
      } catch (err) {
        setError(err.message || 'Failed to search news');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  };

  if (!query.trim()) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Search News
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter a search query to find news articles
          </p>
        </div>
        <EmptyState
          icon="🔍"
          title="Start searching"
          message="Type a keyword in the search bar to find news articles"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Search Results
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Found results for: <span className="font-semibold">"{query}"</span>
        </p>
        <SearchFilters sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {loading ? (
        <div className="py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={handleRetry} />
      ) : articles.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No results found"
          message={`We couldn't find any articles matching "${query}". Try a different search term.`}
        />
      ) : (
        <NewsFeed articles={articles} loading={false} error={null} />
      )}
    </div>
  );
};

export default SearchPage;

