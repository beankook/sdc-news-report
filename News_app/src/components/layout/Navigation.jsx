import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="flex items-center space-x-4" aria-label="Main navigation">
      <Link
        to="/"
        className={`px-4 py-2 rounded-lg transition-colors ${
          isActive('/')
            ? 'bg-primary-600 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        aria-current={isActive('/') ? 'page' : undefined}
      >
        Home
      </Link>
      <Link
        to="/bookmarks"
        className={`px-4 py-2 rounded-lg transition-colors ${
          isActive('/bookmarks')
            ? 'bg-primary-600 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        aria-current={isActive('/bookmarks') ? 'page' : undefined}
      >
        Bookmarks
      </Link>
    </nav>
  );
};

export default Navigation;

