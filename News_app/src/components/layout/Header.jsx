import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Navigation from './Navigation';
import SearchBar from '../search/SearchBar';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-6 w-full md:w-auto">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              aria-label="Home"
            >
              <span className="text-3xl">📰</span>
              <span>News App</span>
            </Link>
            <Navigation />
          </div>

          {/* Search and Theme Toggle */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-initial md:w-80">
              <SearchBar />
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

