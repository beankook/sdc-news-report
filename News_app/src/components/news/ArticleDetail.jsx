import { formatDate } from '../../utils/dateFormatter';
import { DEFAULT_IMAGE } from '../../utils/constants';
import BookmarkButton from '../bookmarks/BookmarkButton';

const ArticleDetail = ({ article }) => {
  if (!article) {
    return null;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(article.url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title || 'News article'}
          className="w-full h-64 md:h-96 object-cover"
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE;
          }}
        />
      )}
      
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 flex-1">
            {article.title || 'Untitled'}
          </h1>
          <BookmarkButton article={article} />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          {article.source?.name && (
            <span className="font-semibold">{article.source.name}</span>
          )}
          {article.author && (
            <span>By {article.author}</span>
          )}
          {article.publishedAt && (
            <span>{formatDate(article.publishedAt)}</span>
          )}
        </div>

        {article.description && (
          <div className="mb-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {article.description}
            </p>
          </div>
        )}

        {article.content && (
          <div className="mb-6">
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              <p className="whitespace-pre-line">
                {article.content.replace(/\[\+[0-9]+ chars\]/g, '')}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-6 py-3 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
          >
            Read Full Article
          </a>
          <button
            onClick={handleShare}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
            aria-label="Share article"
          >
            Share
          </button>
        </div>
      </div>
    </article>
  );
};

export default ArticleDetail;

