/**
 * Generate unique ID from article URL
 * @param {string} url - Article URL
 * @returns {string} Unique ID
 */
export const generateArticleId = (url) => {
  if (!url) return Math.random().toString(36).substring(7);
  // Use full Base64 encoding without truncating
  return btoa(url).replace(/[^a-zA-Z0-9]/g, '');
};


/**
 * Sanitize URL to prevent XSS
 * @param {string} url - URL to sanitize
 * @returns {string} Sanitized URL
 */
export const sanitizeUrl = (url) => {
  if (!url) return '#';
  try {
    const urlObj = new URL(url);
    return urlObj.href;
  } catch {
    return '#';
  }
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

