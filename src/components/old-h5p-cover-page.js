import '../styles/h5p-cover-page.css';
import { createElement } from '../utils.js';
import Button from './h5p-button.js';

/**
 * @typedef {
 *   'check' |
 *   'retry' |
 *   'done' |
 *   'show-results' |
 *   'book' |
 *   'flip' |
 *   'next' |
 *   'previous'
 * } CoverPageIcon
 */

/**
 * @typedef CoverPageParams
 * @type {object}
 * @property {string} title The title for the cover page
 * @property {[string]} description The description or sub-title of the content
 * @property {[string]} img The url to the image
 * @property {[string]} imgAlt The alt text for the image
 * @property {[boolean]} useMediaContainer Add a container instead of an img
 *    so the consumer can attach it themselves
 * @property {string} buttonLabel The label of the button
 * @property {function} buttonOnClick The function to trigger when clicking the button
 * @property {[CoverPageIcon]} icon The name of the icon to use for the button and above the title
 */

/**
 * Create a themed, responsive cover page
 * @param {CoverPageParams} params A set of parameters to configure the CoverPage component
 * @returns {HTMLElement} The cover page element
 */
function CoverPage(params) {
  let coverPageClasses = 'h5p-theme-cover-page';

  if (params.useMediaContainer || params.img) {
    coverPageClasses += ' h5p-theme-cover-page-with-image';
  }

  const coverPage = createElement('div', {
    classList: coverPageClasses,
  });

  coverPage.appendChild(createElement('div', {
    classList: 'h5p-theme-pattern-container',
    innerHTML: '<div class="h5p-theme-pattern"></div>',
  }));

  if (params.useMediaContainer) {
    coverPage.appendChild(createElement('div', {
      classList: 'h5p-theme-cover-img',
    }));
  }
  else if (params.img) {
    coverPage.appendChild(createElement('img', {
      src: params.img,
      alt: params.imgAlt ?? '',
      classList: 'h5p-theme-cover-img',
    }));
  }

  const detailContainer = createElement('div', { classList: 'h5p-theme-cover-details' });

  if (params.icon) {
    detailContainer.appendChild(createElement('span', {
      classList: `h5p-theme-cover-icon h5p-theme-${params.icon}`,
      ariaHidden: true,
    }));
  }

  detailContainer.appendChild(createElement('h2', {
    textContent: params.title,
  }));

  if (params.description) {
    detailContainer.appendChild(createElement('p', {
      classList: 'h5p-theme-cover-description',
      innerHTML: params.description,
    }));
  }

  detailContainer.appendChild(Button({
    label: params.buttonLabel,
    icon: params.icon,
    onClick: params.buttonOnClick,
  }));

  coverPage.appendChild(detailContainer);

  return coverPage;
}

export default CoverPage;
