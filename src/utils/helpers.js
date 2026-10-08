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
 */
export const normalizeText = (str) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

/**
 * Maps Hero search categories → internal project type filters.
 */
export const CATEGORY_MAP = {
  'apartments':        'residential',
  'luxury villas':     'luxury',
  'penthouses':        'residential',
  'office suites':     'commercial',
  'retail space':      'commercial',
  'workspaces':        'commercial',
  'residential plots': 'plots',
  'farm land':         'plots',
};

/**
 * Maps Hero budget labels → internal budget filter keys.
 */
export const BUDGET_MAP = {
  'Under ₹50L':  'u50',
  '₹50L – ₹1Cr': '50-100',
  '₹1Cr – ₹2Cr': '100-200',
  '₹2Cr – ₹5Cr': '200-500',
  'Above ₹5Cr':  '500',
};

/**
 * Rupee ranges (min inclusive, max exclusive) for each budget key.
 */
export const BUDGET_RANGES = {
  u50:       [0,     5e6],
  '50-100':  [5e6,   1e7],
  '100-200': [1e7,   2e7],
  '200-500': [2e7,   5e7],
  '500':     [5e7,   Infinity],
};

/**
 * Formats a price in rupees to a compact display string.
 *   18500000 → "₹1.85 Cr"
 *    4500000 → "₹45 L"
 *       null → "On Request"
 */
export const formatPrice = (price) => {
  if (price == null || Number.isNaN(Number(price))) return 'On Request';
  const n = Number(price);
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(0)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
};