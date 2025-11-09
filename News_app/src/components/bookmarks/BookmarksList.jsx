import { useBookmark } from '../../context/BookmarkContext';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateFormatter';
import { generateArticleId } from '../../utils/urlHelpers';
import { DEFAULT_IMAGE } from '../../utils/constants';
import EmptyState from '../common/EmptyState';
import BookmarkButton from './BookmarkButton';

const BookmarksList = () => {
  const { bookmarks } = useBookmark();

  if (bookmarks.length === 0) {
    return (
      <EmptyState
        icon="🔖"
        title="No bookmarks yet"
        message="Start bookmarking articles to read them later!"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookmarks.map((bookmark) => {
        const articleId = generateArticleId(bookmark.url);
        return (
          <article
            key={bookmark.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {bookmark.urlToImage && (
              <img
                src={bookmark.urlToImage}
                alt={bookmark.title}
                className="w-full h-48 object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = DEFAULT_IMAGE;
                }}
              />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 flex-1">
                  {bookmark.title}
                </h3>
                <BookmarkButton article={bookmark} />
              </div>
              {bookmark.description && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
                  {bookmark.description}
                </p>
              )}
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                <span>{bookmark.source}</span>
                <span>{formatDate(bookmark.publishedAt)}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  Read Article
                </a>
                <Link
                  to={`/article/${articleId}`}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  Preview
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default BookmarksList;

