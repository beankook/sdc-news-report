import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateFormatter';
import { generateArticleId, truncateText } from '../../utils/urlHelpers';
import { DEFAULT_IMAGE } from '../../utils/constants';
import BookmarkButton from '../bookmarks/BookmarkButton';

const NewsCard = ({ article }) => {
  if (!article) return null;

  const articleId = generateArticleId(article.url);

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {article.urlToImage && (
        <Link to={`/article/${articleId}`} className="block">
          <img
            src={article.urlToImage}
            alt={article.title || 'News article'}
            className="w-full h-48 object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE;
            }}
          />
        </Link>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link to={`/article/${articleId}`} className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              {article.title || 'Untitled'}
            </h3>
          </Link>
          <BookmarkButton article={article} />
        </div>
        
        {article.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
            {truncateText(article.description, 120)}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-3">
          <span className="font-medium">{article.source?.name || 'Unknown Source'}</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        
        <div className="flex gap-2">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          >
            Read Full Article
          </a>
          <Link
            to={`/article/${articleId}`}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          >
            Preview
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;

