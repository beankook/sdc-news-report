# News Feeding App

A modern news aggregation app built with React and Vite that provides top headlines, category-based browsing, search functionality, and bookmarking features.

## Features

- 📰 Top headlines from various sources
- 🗂️ Category-based news browsing (business, entertainment, general, health, science, sports, technology)
- 🔍 Search functionality with debouncing
- 🔖 Bookmark articles for later reading
- 📱 Fully responsive design
- 🌓 Dark/Light theme support
- ⚡ Fast and optimized with Vite

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_NEWS_API_KEY=your_api_key_here
   ```
   Get your API key from [NewsAPI.org](https://newsapi.org/)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── context/       # Context providers
├── services/      # API services
├── hooks/         # Custom hooks
├── utils/         # Utility functions
└── styles/        # Global styles
```

## Technologies Used

- React 18
- Vite
- React Router DOM
- Tailwind CSS
- NewsAPI.org

