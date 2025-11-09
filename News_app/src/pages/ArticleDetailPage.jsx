import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { newsAPI } from '../services/newsAPI';
import { generateArticleId } from '../utils/urlHelpers';
import ArticleDetail from '../components/news/ArticleDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const ArticleDetailPage = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try to find article in bookmarks first
        const bookmarks = JSON.parse(localStorage.getItem('news_bookmarks') || '[]');
        const bookmarkedArticle = bookmarks.find(
          (bookmark) => generateArticleId(bookmark.url) === articleId
        );

        if (bookmarkedArticle) {
          setArticle(bookmarkedArticle);
          setLoading(false);
          return;
        }

        // If not in bookmarks, fetch from API
        // Since we don't have a direct article endpoint, we'll fetch top headlines
        // and find the matching article
        let foundArticle = null;
        const data = await newsAPI.getTopHeadlines();
        foundArticle = data.articles.find(
          (art) => generateArticleId(art.url) === articleId
        );

        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          // Try searching in all categories
          const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
          for (const category of categories) {
            const categoryData = await newsAPI.getNewsByCategory(category);
            const found = categoryData.articles.find(
              (art) => generateArticleId(art.url) === articleId
            );
            if (found) {
              foundArticle = found;
              setArticle(found);
              break;
            }
          }
        }

        if (!foundArticle) {
          setError('Article not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <ErrorMessage
        message={error || 'Article not found'}
        onRetry={() => navigate(-1)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        ← Back
      </button>
      <ArticleDetail article={article} />
    </div>
  );
};

export default ArticleDetailPage;

