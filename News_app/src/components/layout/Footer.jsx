const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} News Feeding App. All rights reserved.</p>
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            <p>
              Powered by{' '}
              <a
                href="https://newsapi.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                NewsAPI.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

