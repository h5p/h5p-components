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
}