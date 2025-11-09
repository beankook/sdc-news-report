const SearchFilters = ({ sortBy, onSortChange, className = '' }) => {
  const sortOptions = [
    { value: 'publishedAt', label: 'Latest' },
    { value: 'relevancy', label: 'Relevance' },
    { value: 'popularity', label: 'Popularity' },
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <label htmlFor="sort-by" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Sort by:
      </label>
      <select
        id="sort-by"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-gray-100"
        aria-label="Sort search results"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilters;

