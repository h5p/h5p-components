import '../styles/h5p-button.css';
import * as Utils from '../utils.js';

/** @constant {number} MAX_LABEL_LINE_COUNT Maximum number of lines for label before hiding it */
const MAX_LABEL_LINE_COUNT = 1;

/**
 * @constant {number} MAX_LABEL_WIDTH_RATIO
 * Maximum width ratio between label and button before hiding label */
const MAX_LABEL_WIDTH_RATIO = 0.85;

/**
 * @typedef {'primary' | 'secondary' | 'nav'} ButtonStyleType
 */

/**
 * @typedef {
 *   'check' |
 *   'retry' |
 *   'done' |
 *   'show-results' |
 *   'book' |
 *   'flip' |
 *   'next' |
 *   'previous' |
 *   'show-solutions'
 * } ButtonIcon
 */

/**
 * @typedef ButtonParams
 * @type {object}
 * @property {string} [label] The button text
 * @property {string} [ariaLabel] The screenreader friendly text. Default is label
 * @property {string} [tooltip] The tooltip to show on hover/focus. Default is label if icon enabled
 *    Needed since icon only button on small screens
 * @property {ButtonStyleType} [styleType] Which (visual) type of button it is
 * @property {ButtonIcon} [icon] Which icon to show on the button
 * @property {string[]} [classes] Additional classes to add to the button
 * @property {Function} [onClick] The function to perform once the button is clicked
 * @property {string} [buttonType] Which html type the button should be. Default is button
 * @property {boolean} [disabled] Whether the button should be enabled/disabled. Default is enabled
 */

/**
 * Create a themed, responsive button
 * @param {ButtonParams} params A set of parameters to configure the Button component
 * @returns {HTMLElement} The button element
 */
function Button(params) {
  const baseClass = 'h5p-theme-button';
  let buttonStyleType = 'h5p-theme-primary-cta';

  if (params.styleType === 'secondary') {
    buttonStyleType = 'h5p-theme-secondary-cta';
  }
  else if (params.styleType === 'nav') {
    buttonStyleType = 'h5p-theme-nav-button';
  }

  buttonStyleType = `${baseClass} ${buttonStyleType}`;

  let tooltip;
  if (params.icon) {
    buttonStyleType += ` h5p-theme-${params.icon}`;
    tooltip = params.tooltip ?? params.label;
  }

  const button = Utils.createElement('button', {
    innerHTML: params.label ? `<span class="h5p-theme-label">${params.label}</span>` : '',
    ariaLabel: Utils.parseString(params.ariaLabel ?? params.label),
    classList: params.classes ? `${buttonStyleType} ${params.classes}` : buttonStyleType,
    onclick: params.onClick,
    type: params.buttonType ?? 'button',
    disabled: params.disabled ?? false,
  });

  if (tooltip) {
    H5P.Tooltip(button, { text: tooltip, position: params.tooltipPosition ?? 'top' });
  }

  if (params.icon) {
    IconOnlyObserver.observe(button);
  }

  return button;
}

const IconOnlyObserver = new ResizeObserver(Utils.debounce((entries) => {
  for (const entry of entries) {
    const button = entry.target;
    if (!button.isConnected || button.matches(':hover')) {
      continue;
    }

    const label = button.querySelector('.h5p-theme-label');
    const lineCount = Utils.computeLineCount(label);
    if (!lineCount) {
      continue;
    }

    const ratio = Utils.computeWidthRatio(label, button);
    const shouldHide = lineCount > MAX_LABEL_LINE_COUNT || ratio > MAX_LABEL_WIDTH_RATIO;

    // For visual consistency, label of related buttons should be hidden as well if one is hidden
    const parent = button.parentElement;
    for (const child of parent.children) {
      if (!(child instanceof HTMLButtonElement) || !child.isConnected) {
        continue;
      }
      child.classList.toggle('icon-only', shouldHide);
    }
  }
}));

export default Button;
