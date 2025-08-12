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