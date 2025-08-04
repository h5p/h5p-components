// eslint-disable-next-line no-use-before-define, no-var
var H5P = H5P || {};
H5P.Components = H5P.Components || {};

H5P.Components.ProgressBar = (function () {
  
  /**
   * @typedef ProgressBarParams
   * @type {object}
   * @property {number} [index = 0] The current position in the navigation.
   * @property {number} [progressLength = 1] The number of "items" we can navigate through.
   * @property {number} [ariaValueMax = 100] The max value of the slider
   * @property {number} [ariaValueMin = 0] The min value of the slider
   * @property {number} [ariaValueNow = 0] The current/initial value of the slider
   */

  /**
   * Creates a progress bar.
   * @param {ProgressBarParams} params A set of parameters to configure ProgressBar
   * @returns {HTMLElement} The ProgressBar element.
   */
  function ProgressBar(params = {}) {
    const { createElement } = H5P.Components.utils;
    const progressLength = params.progressLength ?? 1;
    
    let index = params.index ?? 0;

    const progressBar = createElement('div', {
      classList: 'h5p-visual-progress',
      role: 'progressbar',
      ariaValueMax: params.ariaValueMax ?? 100,
      ariaValueMin: params.ariaValueMin ?? 0,
      ariaValueNow: params.ariaValueNow ?? 0,
    });

    const progressBarInner = createElement('div', {
      classList: 'h5p-visual-progress-inner',
    });

    progressBar.appendChild(progressBarInner);
    
    const updateProgressBar = (newIndex) => {
      index = newIndex;
      progressBar.setAttribute('aria-valuenow', (newIndex + 1 / progressLength * 100).toFixed(2));
      progressBarInner.style.width = (newIndex + 1) / progressLength * 100 + '%';
    };

    updateProgressBar(index);

    progressBar.updateProgressBar = updateProgressBar;

    return progressBar;
  }

  return ProgressBar;
})();
