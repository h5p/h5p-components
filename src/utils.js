// eslint-disable-next-line no-use-before-define, no-var
var H5P = H5P || {};
H5P.Components = H5P.Components || {};
H5P.Components.utils = {};

/**
 * Strips html tags and converts special characters.
 * Example: "<div>Me &amp; you</div>" is converted to "Me & you".
 *
 * @param {String} text The text to be parsed
 * @returns {String} The parsed text
 */
H5P.Components.utils.parseString = (text) => {
  if (text === null || text === undefined) {
    return '';
  }
  const div = document.createElement('div');
  div.innerHTML = text;
  return div.textContent;
};

/**
 * Create an HTML element, and apply potential options/css
 * 
 * @param {string} tag The HTML tag to create
 * @param {object} options Options like classList, textContent etc.
 * @param {object} style Styles/css to apply to the element
 * @returns 
 */
H5P.Components.utils.createElement = (tag, options, style = {}) => {
  const element = Object.assign(document.createElement(tag), options);
  Object.assign(element.style, style);

  return element;
};

/** @constant {number} DEFAULT_LINE_HEIGHT Default line height when it is "normal" */ 
const DEFAULT_LINE_HEIGHT = 1.2;
/**
 * Compute the number of lines in an element.
 * @param {HTMLElement} element The element to compute lines for.
 * @returns {number} The number of lines in the element.
 */
H5P.Components.utils.computeLineCount = (element) => {
  if (!element) {
    return 0; 
  }
  const style = getComputedStyle(element);
  let lineHeight = parseFloat(style.lineHeight);
  
  if (isNaN(lineHeight)) {
    const fontSize = parseFloat(style.fontSize);
    lineHeight = fontSize * DEFAULT_LINE_HEIGHT;
  }
  const elementHeight = element.getBoundingClientRect().height;
  return Math.ceil(elementHeight / lineHeight);
};

/**
 * Compute the width ratio between two elements.
 * @param {HTMLElement} elementA The first element.
 * @param {HTMLElement} elementB The second element.
 * @returns {number} The width ratio (elementA / elementB).
 */
H5P.Components.utils.computeWidthRatio = (elementA, elementB) => {
  if (!elementA || !elementB) {
    return 0;
  }

  const widthA = elementA.offsetWidth;
  const widthB = elementB.clientWidth;

  if (!widthA || !widthB) {
    return 0;
  }

  return widthA / widthB;
};

/** @constant {number} DEBOUNCE_DELAY_MS Debounce delay to use */ 
const DEBOUNCE_DELAY_MS = 40;
/**
 * Debounce a function call.
 * @param {function} callback Function to debounce.
 * @param {number} delayMs Debouncing delay.
 * @returns {function} Debounced function.
 */
H5P.Components.utils.debounce = (callback, delayMs = DEBOUNCE_DELAY_MS) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), delayMs);
  };
};
