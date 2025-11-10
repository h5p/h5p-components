/** @constant {number} DEBOUNCE_DELAY_MS Debounce delay to use */
const DEBOUNCE_DELAY_MS = 40;

/** @constant {number} DEFAULT_LINE_HEIGHT Default line height when it is "normal" */
const DEFAULT_LINE_HEIGHT = 1.2;

/** @constant {number} CLOSE_TO_INTEGER_EPSILON Epsilon for closeness to integer */
const CLOSE_TO_INTEGER_EPSILON = 0.01;

/**
 * Strips html tags and converts special characters.
 * Example: "<div>Me &amp; you</div>" is converted to "Me & you".
 *
 * @param {String} text The text to be parsed
 * @returns {String} The parsed text
 */
export const parseString = (text) => {
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
export const createElement = (tag, options, style = {}) => {
  const element = Object.assign(document.createElement(tag), options);
  Object.assign(element.style, style);

  return element;
};
/**
 * Compute the number of lines in an element.
 * @param {HTMLElement} element The element to compute lines for.
 * @returns {number} The number of lines in the element.
 */
export const computeLineCount = (element) => {
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
  const numberOfLinesExact = elementHeight / lineHeight;

  // Element height might be slightly larger only, then assuming one more line is not correct.
  const floatingValue = Math.abs(Math.round(numberOfLinesExact) - numberOfLinesExact);
  const isCloseToInteger = floatingValue < CLOSE_TO_INTEGER_EPSILON;

  return (isCloseToInteger) ? Math.round(numberOfLinesExact) : Math.ceil(numberOfLinesExact);
};

/**
 * Compute the width ratio between two elements.
 * @param {HTMLElement} elementA The first element.
 * @param {HTMLElement} elementB The second element.
 * @returns {number} The width ratio (elementA / elementB).
 */
export const computeWidthRatio = (elementA, elementB) => {
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

/**
 * Debounce a function call.
 * @param {function} callback Function to debounce.
 * @param {number} delayMs Debouncing delay.
 * @returns {function} Debounced function.
 */
export const debounce = (callback, delayMs = DEBOUNCE_DELAY_MS) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delayMs);
  };
};
