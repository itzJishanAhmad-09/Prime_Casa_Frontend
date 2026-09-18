// src/utils/helpers.js

/**
 * Checks if a string is a valid image path (URL or relative path).
 */
export const isImagePath = (str) =>
  Boolean(str) &&
  (str.startsWith('/') || str.startsWith('./') || str.startsWith('http'));

/**
 * Truncates text to a maximum number of words.
 */
export const getShortDesc = (text, maxWords = 20) => {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
};

/**
 * Normalizes accented characters for consistent text comparison.
 * e.g. "Café" => "cafe"
 */
export const normalizeText = (str) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

/**
 * Maps URL query param category values to project type filters.
 * Used by Hero.jsx (search) and PropertiesList.jsx (filter).
 */
export const CATEGORY_MAP = {
  apartments:     'residential',
  'luxury villas': 'luxury',
  penthouses:     'residential',
  'office suites': 'commercial',
  'retail space':  'commercial',
  workspaces:     'commercial',
  'residential plots': 'residential',
  'farm land':    'residential',
};
