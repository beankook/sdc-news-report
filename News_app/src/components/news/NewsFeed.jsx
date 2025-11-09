import NewsCard from './NewsCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import EmptyState from '../common/EmptyState';

const NewsFeed = ({ articles, loading, error, onRetry }) => {
  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (!articles || articles.length === 0) {
    return (
      <EmptyState
        icon="📰"
        title="No news found"
        message="We couldn't find any news articles. Try adjusting your filters or check back later."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <NewsCard key={article.url || index} article={article} />
      ))}
    </div>
  );
};

export default NewsFeed;

