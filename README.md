**Prerequisites**

Before you begin, ensure you have the following installed:
Node.js (v18 or higher)
npm or yarn
NewsAPI Key - Get your free API key from NewsAPI.org

**Installation**

Clone the repository
bash
   git clone https://github.com/yourusername/sdc-news-report.git
   cd sdc-news-report
Install dependencies
bash
   npm install
   # or
   yarn install
Create environment file Create a .env file in the root directory:
env
   VITE_NEWS_API_KEY=your_api_key_here
Start development server
bash
   npm run dev
   # or
   yarn dev
Open your browser Navigate to http://localhost:5173

**Build for Production**
bash
npm run build
# or
yarn build
The production build will be generated in the dist/ folder.

**Deploy to Netlify**
Build the project:
bash
   npm run build
Drag and drop the dist folder to Netlify
Add environment variable in Netlify dashboard
Deploy to GitHub Pages
Install gh-pages:
bash
   npm install --save-dev gh-pages
Add to package.json:
json
   "homepage": "https://yourusername.github.io/sdc-news-report",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
Deploy:
bash
   npm run deploy
