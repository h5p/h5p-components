// eslint-disable-next-line no-use-before-define, no-var
var H5P = H5P || {};
H5P.Components = H5P.Components || {};

H5P.Components.CoverPage = (function () {
  /**
   * Create a themed, responsive button
   * @param {string} params.title The title for the cover page
   * @param {string} [params.description] The description or sub-title of the content
   * @param {string} [params.img] The url to the image
   * @param {string} [params.imgAlt] The alt text for the image
   * @param {string} [useMediaContainer] Add a container instead of an img, so the consumer can attach it themselves
   * @param {string} params.buttonLabel The label of the button
   * @param {string} params.buttonOnClick The function to trigger when clicking the button
   * @param {string} [params.icon] The name of the icon to use for the button and above the title
   *                               Options are check, retry, done, show-results, book, flip, reveal-answer, next, previous
   */
  function CoverPage(params) {
    const { createElement } = H5P.Components.utils;
    const coverPage = createElement('div', {
      classList: 'h5p-theme-cover-page',
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
        classList: 'h5p-theme-cover-icon h5p-theme-' + params.icon,
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

    detailContainer.appendChild(H5P.Components.Button({
      label: params.buttonLabel,
      icon: params.icon,
      onClick: params.buttonOnClick,
    }));

    coverPage.appendChild(detailContainer);

    return coverPage;
  }

  return CoverPage;
})();
