import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../../utils/constants';

const CategoryTabs = () => {
  const location = useLocation();
  const currentCategory = location.pathname.split('/category/')[1] || 'all';

  return (
    <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
      <Link
        to="/"
        className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
          currentCategory === 'all'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        All News
      </Link>
      {CATEGORIES.map((category) => (
        <Link
          key={category.id}
          to={`/category/${category.id}`}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            currentCategory === category.id
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <span className="mr-2">{category.icon}</span>
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryTabs;

