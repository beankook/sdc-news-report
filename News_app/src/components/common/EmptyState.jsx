const EmptyState = ({ 
  icon = '📰', 
  title = 'No content found', 
  message = 'There is nothing to display here.',
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md">
        {message}
      </p>
    </div>
  );
};

export default EmptyState;

