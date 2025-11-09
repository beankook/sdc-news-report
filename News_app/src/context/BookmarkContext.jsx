import { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { generateArticleId } from '../utils/urlHelpers';

const BookmarkContext = createContext(null);

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmark must be used within BookmarkProvider');
  }
  return context;
};

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  }, [bookmarks]);

  const addBookmark = (article) => {
    if (!article) return;

    const articleId = generateArticleId(article.url);
    
    // Check if already bookmarked
    if (isBookmarked(articleId)) {
      return;
    }

    const bookmark = {
      id: articleId,
      title: article.title || 'Untitled',
      description: article.description || '',
      url: article.url || '',
      urlToImage: article.urlToImage || '',
      source: article.source?.name || 'Unknown Source',
      author: article.author || '',
      publishedAt: article.publishedAt || new Date().toISOString(),
      savedAt: new Date().toISOString(),
    };

    setBookmarks((prev) => [bookmark, ...prev]);
  };

  const removeBookmark = (articleId) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== articleId));
  };

  const isBookmarked = (articleId) => {
    return bookmarks.some((bookmark) => bookmark.id === articleId);
  };

  const toggleBookmark = (article) => {
    const articleId = generateArticleId(article.url);
    if (isBookmarked(articleId)) {
      removeBookmark(articleId);
    } else {
      addBookmark(article);
    }
  };

  const value = {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

