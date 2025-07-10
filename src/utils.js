// eslint-disable-next-line no-use-before-define, no-var
var H5P = H5P || {};
H5P.Components = H5P.Components || {};
H5P.Components.utils = {};

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

/**
 * Strips HTML tags from a string while preserving the text content
 * @param {string} str String to strip
 * @returns {string} Text without HTML tags
 */
H5P.Components.utils.stripHtmlTags = (str) => {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.textContent || div.innerText || '';
};
