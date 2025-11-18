import '../styles/h5p-progress-bar.css';
import { createElement } from '../utils.js';

/**
 * @typedef ProgressBarParams
 * @type {object}
 * @property {number} [index] The current position in the navigation (default: 0)
 * @property {number} [progressLength] The number of "items" we can navigate through (default: 1)
 * @property {number} [ariaValueMax] The max value of the slider (default: 100)
 * @property {number} [ariaValueMin] The min value of the slider (default: 0)
 * @property {number} [ariaValueNow] The current/initial value of the slider (default: 0)
 */

/**
 * Creates a progress bar.
 * @param {ProgressBarParams} params A set of parameters to configure ProgressBar
 * @returns {HTMLElement} The ProgressBar element.
 */
function ProgressBar(params = {}) {
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
    progressBar.setAttribute('aria-valuenow', (((newIndex + 1) / progressLength) * 100).toFixed(2));
    progressBarInner.style.width = `${((newIndex + 1) / progressLength) * 100}%`;
  };

  updateProgressBar(index);

  progressBar.updateProgressBar = updateProgressBar;

  return progressBar;
}

export default ProgressBar;
