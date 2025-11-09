/*import { useState } from 'react';
import { useNewsAPI } from '../hooks/useNewsAPI';
import { newsAPI } from '../services/newsAPI';
import CategoryTabs from '../components/news/CategoryTabs';
import NewsFeed from '../components/news/NewsFeed';

const HomePage = () => {
  const [retryKey, setRetryKey] = useState(0);

const { articles, loading, error } = useNewsAPI(
  () => newsAPI.getEverything(), // general news
  [retryKey]
);

  const handleRetry = () => {
    setRetryKey((prev) => prev + 1);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Top Headlines
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay updated with the latest news from India
        </p>
      </div>

      <CategoryTabs />

      <NewsFeed
        articles={articles}
        loading={loading}
        error={error}
        onRetry={handleRetry}
      />
    </div>
  );
};

export default HomePage;



import { useState } from 'react';
import { useNewsAPI } from '../hooks/useNewsAPI';
import { newsAPI } from '../services/newsAPI';
import NewsFeed from '../components/news/NewsFeed';

const HomePage = () => {
  const [retryKey, setRetryKey] = useState(0);

  // Fetch general news for home page
  const { articles, loading, error } = useNewsAPI(
    () =>
      newsAPI.getEverything({ q: 'latest', sortBy: 'publishedAt' }), // general news
    [retryKey]
  );

  const handleRetry = () => {
    setRetryKey((prev) => prev + 1);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Latest News
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay updated with the latest news from around the world
        </p>
      </div>

      <NewsFeed
        articles={articles}
        loading={loading}
        error={error}
        onRetry={handleRetry}
      />
    </div>
  );
};

export default HomePage;*/

import { useState } from 'react';
import { useNewsAPI } from '../hooks/useNewsAPI';
import { newsAPI } from '../services/newsAPI';
import NewsFeed from '../components/news/NewsFeed';

const HomePage = () => {
  const [retryKey, setRetryKey] = useState(0);

  // Fetch general news using searchNews
  const { articles, loading, error } = useNewsAPI(
    () => newsAPI.searchNews('latest'), // general news
    [retryKey]
  );

  const handleRetry = () => {
    setRetryKey((prev) => prev + 1);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Latest News
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay updated with the latest news from around the world
        </p>
      </div>

      <NewsFeed
        articles={articles}
        loading={loading}
        error={error}
        onRetry={handleRetry}
      />
    </div>
  );
};

export default HomePage;




