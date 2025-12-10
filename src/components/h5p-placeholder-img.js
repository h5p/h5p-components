import '../styles/h5p-placeholder-img.css';
import { createElement } from '../utils.js';

/**
 * Returns true if the string parses and contains at least one valid <svg> element
 * @param {string} value
 */
function containsSvgElement(value) {
  if (typeof value !== 'string') {
    return false;
  }

  const input = value.trim();

  if (!input.includes('<svg')) {
    return false;
  }

  const xmlDoc = new DOMParser().parseFromString(input, 'image/svg+xml');
  const hasParserError = xmlDoc.getElementsByTagName('parsererror').length > 0;

  if (hasParserError) {
    return false;
  }

  return xmlDoc.getElementsByTagName('svg').length > 0;
}

/**
 *  Create a themed placeholder svg
 *
 *  The function accepts either:
 *  - A string containing an <svg> element (raw SVG or XML that includes SVG)
 *  - A key that matches one of the predefined placeholder SVGs in 'placeholderSVGs'
 *  - If no valid SVG or key is provided, the 'default' placeholder is used.
 *
 * @param {string} [arg]
 * A string containing an <svg> element or a key referring to an entry in 'placeholderSVGs'
 * @returns {HTMLElement} The placeholder image element
 */
function PlaceholderImg(arg) {
  const svg = containsSvgElement(arg)
    ? arg
    : placeholderSVGs[arg] ?? placeholderSVGs.default;

  return createElement('div', {
    classList: 'h5p-theme-placeholder-img',
    innerHTML: svg,
  });
}

// Can't use img, or object with a path since we need to access variables outside the svg
const placeholderSVGs = {
  default: `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
        viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve">
      <style type="text/css">
        .st0{fill:var(--h5p-theme-alternative-darker);}
        .st1{fill:var(--h5p-theme-alternative-base);}
        .st2{fill:var(--h5p-theme-alternative-dark);}
        .st3{fill:var(--h5p-theme-ui-base);}
      </style>
      <g>
        <path class="st0" d="M369.3,388.9c-0.5,0.2-1,0.3-1.5,0.4l-257.8,36c-2.3,0.3-4.7-0.3-6.6-1.7c-1.9-1.4-3.1-3.5-3.4-5.8L64,159.9c-0.7-4.8,2.7-9.3,7.5-10l257.8-36c2.3-0.3,4.7,0.3,6.6,1.7c1.9,1.4,3.1,3.5,3.4,5.8l36,257.8C375.9,383.5,373.3,387.6,369.3,388.9z"/>
        <rect x="113.8" y="103" transform="matrix(0.1337 -0.991 0.991 0.1337 -21.8517 475.0013)" class="st1" width="294" height="294"/>
        <polygon class="st2" points="244.1,396.1 252.1,337.1 181.3,279.3 102.9,320.5 95.4,376"/>
        <polygon class="st0" points="100.4,338.9 193.4,289.9 181.6,279.1 103,319.8"/>
        <path class="st0" d="M172,89.7c12,47.4,51.6,85.1,103.1,92.1c51.4,6.9,99.7-18.9,123.8-61.4L172,89.7z"/>
        <g>
          <g>
            <path class="st2" d="M300.9,107.1l-88.3,47c17.2,14.4,38.6,24.3,62.6,27.5c51.4,6.9,99.6-18.8,123.7-61.4L300.9,107.1z"/>
          </g>
        </g>
        <polygon class="st2" points="401.1,309 351.6,268.5 136.9,381.6 386.8,415.3"/>
        <polygon class="st0" points="170.9,386.2 367.4,282.4 351.9,268.3 134.1,381.2"/>
        <path class="st3" d="M387.3,425.3c-0.6,0-1.2,0-1.8-0.1L94.1,385.9c-2.6-0.4-5-1.7-6.6-3.8c-1.6-2.1-2.3-4.8-2-7.4l39.3-291.4c0.7-5.5,5.8-9.3,11.2-8.6l291.4,39.3c2.6,0.4,5,1.7,6.6,3.8c1.6,2.1,2.3,4.8,2,7.4l-39.3,291.4C396,421.5,392,425.1,387.3,425.3zM106.7,367.5l271.5,36.6l36.6-271.5L143.3,95.9L106.7,367.5z"/>
      </g>
    </svg>
    `,
  h5pImageDefault: `
    <svg class="h5p-image-placeholder-svg" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 903 459" preserveAspectRatio="xMidYMid slice">
      <defs>
        <style>
          .cls-1 {fill: var(--h5p-theme-alternative-darker);}
          .cls-2 {fill: var(--h5p-theme-alternative-dark);}
          .cls-3 {fill: var(--h5p-theme-alternative-base);}
        </style>
      </defs>
      <g>
        <g>
          <rect class="cls-3" x="1" y="0" width="903.1" height="459.1"/>
          <polygon class="cls-2" points="527.5 459.5 527.5 334.1 364.8 234 48.1 459.5 527.5 459.5"/>
          <polygon class="cls-2" points="904.2 246 732.2 142.6 287.1 459.8 904.2 459.8 904.2 246"/>
          <polygon class="cls-2" points="394.7 459.5 106.3 254 .1 332.4 .1 459.5 394.7 459.5"/>
          <polygon class="cls-1" points="-.3 366.9 133.8 274.2 105.1 255.7 -.3 332.9 -.3 366.9"/>
          <polygon class="cls-1" points="370.5 459.2 771.6 168.7 732.2 142.6 292 459.2 370.5 459.2"/>
          <polygon class="cls-1" points="102.8 459.5 392.8 252.6 365.3 233.5 43.6 459.5 102.8 459.5"/>
          <path class="cls-1" d="M43.3.4c30.1,78,105.7,133.3,194.3,133.3S401.8,78.3,431.8.4H43.3Z"/>
          <path class="cls-2" d="M267.4.4L126.7,101.6c32.1,20.3,70.1,32,110.9,32,88.6,0,164.2-55.3,194.3-133.3h-164.5Z"/>
        </g>
      </g>
    </svg>
    `,
};

export default PlaceholderImg;
