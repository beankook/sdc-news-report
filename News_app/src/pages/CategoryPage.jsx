import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNewsAPI } from '../hooks/useNewsAPI';
import { newsAPI } from '../services/newsAPI';
import { CATEGORIES } from '../utils/constants';
import CategoryTabs from '../components/news/CategoryTabs';
import NewsFeed from '../components/news/NewsFeed';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [retryKey, setRetryKey] = useState(0);

  const category = CATEGORIES.find((cat) => cat.id === categoryName);

  const { articles, loading, error } = useNewsAPI(
    () => newsAPI.getNewsByCategory(categoryName),
    [categoryName, retryKey]
  );

  const handleRetry = () => {
    setRetryKey((prev) => prev + 1);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {category ? `${category.icon} ${category.name} News` : 'Category News'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Latest {category?.name.toLowerCase() || 'category'} news from India
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

export default CategoryPage;

