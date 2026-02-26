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

export const addHostStyling = () => {
  console.log('add styling?');
  if (document !== undefined && !document.head.querySelector('#h5p-components-theme')) {
    console.log('will add styling');
    const style = document.createElement('style');
    style.id = 'h5p-components-theme';

    style.textContent = `
      :root {
        --h5p-theme-main-cta-base: #006FBF;
        --h5p-theme-secondary-cta-base: #E3E9F1;
        --h5p-theme-alternative-base: #F1F5FB;
        --h5p-theme-background: #F9FBFF;
        --h5p-theme-focus: #006FBF; /*TODO: not yet in use */ 

        --h5p-theme-main-cta-light: #007CD6;
        --h5p-theme-main-cta-dark: #005FA3;
        --h5p-theme-contrast-cta: #EBF7FF;
        --h5p-theme-contrast-cta-white: #006FBF;

        --h5p-theme-contrast-cta-light: color-mix(in srgb, var(--h5p-theme-main-cta-base), transparent 90%);

        --h5p-theme-secondary-cta-light: #F5F7FA;
        --h5p-theme-secondary-cta-dark: #D3DCE9;
        --h5p-theme-secondary-contrast-cta: #202122;
        --h5p-theme-secondary-contrast-cta-hover: #EBF7FF;

        --h5p-theme-alternative-light: #F7F9FD;
        --h5p-theme-alternative-dark: #DBE5F5;
        --h5p-theme-alternative-darker: #C7D7EF;

        --h5p-theme-text-primary: #101729;
        --h5p-theme-text-secondary: #354054;
        --h5p-theme-text-third: #737373;
        --h5p-theme-ui-base: #FFFFFF;
        --h5p-theme-stroke-1: #DCDFFA;
        --h5p-theme-stroke-2: #EDEEFB;
        --h5p-theme-stroke-3: #E5E5E5;
        --h5p-theme-border-radius-large: 0.5rem;
        --h5p-theme-border-radius-medium: 0.375rem;
        --h5p-theme-border-radius-small: 0.25rem;
        --h5p-theme-font-name: "Inter", sans-serif;

        --h5p-theme-feedback-correct-main: #256D1D;
        --h5p-theme-feedback-correct-secondary: #f3fcf0;
        --h5p-theme-feedback-correct-third: #cff1c2;
          
        --h5p-theme-feedback-incorrect-main: #a13236;
        --h5p-theme-feedback-incorrect-secondary: #faf0f4;
        --h5p-theme-feedback-incorrect-third: #f6dce7;

        --h5p-theme-feedback-neutral-main: #E6C81D;
        --h5p-theme-feedback-neutral-secondary: #5E4817;
        --h5p-theme-feedback-neutral-third: #F0EBCB;

        /* SPACING */

        /* Small (default) */
        --h5p-theme-spacing-xl-primary-small: calc(var(--h5p-theme-spacing-xl-primary-medium)*0.8);
        --h5p-theme-spacing-primary-small: calc(var(--h5p-theme-spacing-primary-medium)*0.8);
        --h5p-theme-spacing-secondary-small: calc(var(--h5p-theme-spacing-secondary-medium)*0.8);
        --h5p-theme-spacing-third-small: calc(var(--h5p-theme-spacing-third-medium)*0.8);
        --h5p-theme-spacing-fourth-small: calc(var(--h5p-theme-spacing-fourth-medium)*0.8);
        --h5p-theme-spacing-fifth-small: calc(var(--h5p-theme-spacing-fifth-medium)*0.8);
        
        --h5p-theme-font-size-xxl-small: calc(var(--h5p-theme-font-size-xxl-medium)*1);
        --h5p-theme-font-size-xl-small: calc(var(--h5p-theme-font-size-xl-medium)*1);
        --h5p-theme-font-size-l-small: calc(var(--h5p-theme-font-size-l-medium)*1);
        --h5p-theme-font-size-m-small: calc(var(--h5p-theme-font-size-m-medium)*1);
        --h5p-theme-font-size-s-small: calc(var(--h5p-theme-font-size-s-medium)*1);

        /* Medium */
        --h5p-theme-spacing-xl-primary-medium: calc(var(--h5p-theme-spacing-xl-primary-large)*0.8);
        --h5p-theme-spacing-primary-medium: calc(var(--h5p-theme-spacing-primary-large)*0.8);
        --h5p-theme-spacing-secondary-medium: calc(var(--h5p-theme-spacing-secondary-large)*0.8);
        --h5p-theme-spacing-third-medium: calc(var(--h5p-theme-spacing-third-large)*0.8);
        --h5p-theme-spacing-fourth-medium: calc(var(--h5p-theme-spacing-fourth-large)*0.8);
        --h5p-theme-spacing-fifth-medium: calc(var(--h5p-theme-spacing-fifth-large)*0.8);
        
        --h5p-theme-font-size-xxl-medium: calc(var(--h5p-theme-font-size-xxl-large)*0.9);
        --h5p-theme-font-size-xl-medium: calc(var(--h5p-theme-font-size-xl-large)*0.9);
        --h5p-theme-font-size-l-medium: calc(var(--h5p-theme-font-size-l-large)*0.9);
        --h5p-theme-font-size-m-medium: calc(var(--h5p-theme-font-size-m-large)*0.9);
        --h5p-theme-font-size-s-medium: calc(var(--h5p-theme-font-size-s-large)*0.9);

        /* Large */
        --h5p-theme-spacing-xl-primary-large: 3rem;
        --h5p-theme-spacing-primary-large: 2rem;
        --h5p-theme-spacing-secondary-large: 1.5rem;
        --h5p-theme-spacing-third-large: 1rem;
        --h5p-theme-spacing-fourth-large: 0.65rem;
        --h5p-theme-spacing-fifth-large: 0.5rem;
        
        --h5p-theme-font-size-xxl-large: 1.5rem;
        --h5p-theme-font-size-xl-large: 1.25rem;
        --h5p-theme-font-size-l-large: 1.125rem;	
        --h5p-theme-font-size-m-large: 1rem;
        --h5p-theme-font-size-s-large: 0.85rem;
      }

      .h5p-content,
      .h5peditor {
        --h5p-theme-spacing-xl: var(--h5p-theme-spacing-xl-primary-small);
        --h5p-theme-spacing-l: var(--h5p-theme-spacing-primary-small);
        --h5p-theme-spacing-m: var(--h5p-theme-spacing-secondary-small);
        --h5p-theme-spacing-s: var(--h5p-theme-spacing-third-small);
        --h5p-theme-spacing-xs: var(--h5p-theme-spacing-fourth-small);
        --h5p-theme-spacing-xxs: var(--h5p-theme-spacing-fifth-small);
        --h5p-theme-font-size-xxl: var(--h5p-theme-font-size-xxl-small);
        --h5p-theme-font-size-xl: var(--h5p-theme-font-size-xl-small);
        --h5p-theme-font-size-l: var(--h5p-theme-font-size-l-small);	
        --h5p-theme-font-size-m: var(--h5p-theme-font-size-m-small);	
        --h5p-theme-font-size-s: var(--h5p-theme-font-size-s-small);	
        --h5p-theme-scaling: 0.6;
      }

      .h5p-content.h5p-medium,
      .h5peditor.h5p-medium {
        --h5p-theme-spacing-xl: var(--h5p-theme-spacing-xl-primary-medium);
        --h5p-theme-spacing-l: var(--h5p-theme-spacing-primary-medium);
        --h5p-theme-spacing-m: var(--h5p-theme-spacing-secondary-medium);
        --h5p-theme-spacing-s: var(--h5p-theme-spacing-third-medium);
        --h5p-theme-spacing-xs: var(--h5p-theme-spacing-fourth-medium);
        --h5p-theme-spacing-xxs: var(--h5p-theme-spacing-fifth-medium);
        --h5p-theme-font-size-xxl: var(--h5p-theme-font-size-xxl-medium);
        --h5p-theme-font-size-xl: var(--h5p-theme-font-size-xl-medium);
        --h5p-theme-font-size-l: var(--h5p-theme-font-size-l-medium);	
        --h5p-theme-font-size-m: var(--h5p-theme-font-size-m-medium);	
        --h5p-theme-font-size-s: var(--h5p-theme-font-size-s-medium);
        --h5p-theme-scaling: 0.8;
      }

      :host {
        --h5p-theme-spacing-xl: var(--h5p-theme-spacing-xl-primary-large);
        --h5p-theme-spacing-l: var(--h5p-theme-spacing-primary-large);
        --h5p-theme-spacing-m: var(--h5p-theme-spacing-secondary-large);
        --h5p-theme-spacing-s: var(--h5p-theme-spacing-third-large);
        --h5p-theme-spacing-xs: var(--h5p-theme-spacing-fourth-large);
        --h5p-theme-spacing-xxs: var(--h5p-theme-spacing-fifth-large);
        --h5p-theme-font-size-xxl: var(--h5p-theme-font-size-xxl-large);
        --h5p-theme-font-size-xl: var(--h5p-theme-font-size-xl-large);
        --h5p-theme-font-size-l: var(--h5p-theme-font-size-l-large);
        --h5p-theme-font-size-m: var(--h5p-theme-font-size-m-large);
        --h5p-theme-font-size-s: var(--h5p-theme-font-size-s-large);
        --h5p-theme-scaling: 1;
      }
    `;

    document.head.appendChild(style);
  }
};
