import BookmarksList from '../components/bookmarks/BookmarksList';

const BookmarksPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          My Bookmarks
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your saved articles for later reading
        </p>
      </div>

      <BookmarksList />
    </div>
  );
};

export default BookmarksPage;

