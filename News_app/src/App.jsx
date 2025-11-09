import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookmarkProvider } from './context/BookmarkContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import BookmarksPage from './pages/BookmarksPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <ThemeProvider>
      <BookmarkProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/article/:articleId" element={<ArticleDetailPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </Layout>
        </Router>
      </BookmarkProvider>
    </ThemeProvider>
  );
}

export default App;

