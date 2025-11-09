/*import { useBookmark } from '../../context/BookmarkContext';
import { generateArticleId } from '../../utils/urlHelpers';

const BookmarkButton = ({ article, className = '' }) => {
  const { isBookmarked, toggleBookmark } = useBookmark();
  const articleId = generateArticleId(article?.url);

  if (!article) return null;

  const bookmarked = isBookmarked(articleId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(article);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
        bookmarked
          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
      } ${className}`}
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      aria-pressed={bookmarked}
    >
      {bookmarked ? '⭐' : '☆'}
    </button>
  );
};

export default BookmarkButton;*/

import { useBookmark } from '../../context/BookmarkContext';
import { generateArticleId } from '../../utils/urlHelpers';

const BookmarkButton = ({ article, className = '' }) => {
  const { isBookmarked, toggleBookmark } = useBookmark();

  if (!article) return null;

  const articleId = generateArticleId(article.url);
  const bookmarked = isBookmarked(articleId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(article); // pass the full article
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
        bookmarked
          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
      } ${className}`}
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      aria-pressed={bookmarked}
    >
      {bookmarked ? '⭐' : '☆'}
    </button>
  );
};

export default BookmarkButton;


