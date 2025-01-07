var H5P = H5P || {};
H5P.Components = H5P.Components || {};
H5P.Components.utils = {};

/**
 * Create an HTML element
 * 
 * @param {string} tag The HTML tag to create
 * @param {object} options Options like classList, text etc.
 * @returns 
 */
H5P.Components.utils.createElement = (tag, options) => {
  return Object.assign(document.createElement(tag), options);
}