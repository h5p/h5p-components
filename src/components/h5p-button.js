// eslint-disable-next-line no-use-before-define, no-var
var H5P = H5P || {};
H5P.Components = H5P.Components || {};

H5P.Components.Button = (function () {
  /**
   * @typedef {'primary' | 'secondary' | 'nav'} ButtonStyleType
   * @typedef {'check' | 'retry' | 'done' | 'show-results' | 'book' | 'flip' | 'reveal-answer' | 'next' | 'previous'} ButtonIcon
   */

  /**
   * @typedef ButtonParams
   * @type {object}
   * @property {[string]} label The button text
   * @property {[string]} ariaLabel The screenreader friendly text. Default is label.
   * @property {[string]} tooltip The tooltip to show on hover/focus. Default is label if icon enabled. Needed since icon only button on small screens
   * @property {[ButtonStyleType]} styleType Which (visual) type of button it is.
   * @property {[ButtonIcon]} icon Which icon to show on the button.
   * @property {[string]} classes Additional classes to add to the button
   * @property {[function]} onClick The function to perform once the button is clicked
   * @property {[string]} buttonType Which html type the button should be. Default is button
   * @property {[boolean]} disabled Whether the button should be enabled or disabled. Default is enabled
   */

  /**
   * Create a themed, responsive button
   * @param {ButtonParams} params A set of parameters to configure the Button component.
   * @returns {HTMLElement} The button element.
   */
  function Button(params) {
    const { createElement } = H5P.Components.utils;
    let buttonStyleType = 'h5p-theme-primary-cta';

    if (params.styleType === 'secondary') {
      buttonStyleType = 'h5p-theme-secondary-cta';
    }
    else if (params.styleType === 'nav') {
      buttonStyleType = 'h5p-theme-nav-button';
    }

    if (params.icon) {
      buttonStyleType += ` h5p-theme-${params.icon}`;
      params.tooltip = params.tooltip ?? params.label;
    }

    const button = createElement('button', {
      innerHTML: params.label ? `<span class="h5p-theme-label">${params.label}</span>` : '',
      ariaLabel: H5P.Components.utils.parseString(params.ariaLabel ?? params.label),
      classList: params.classes ? `${buttonStyleType} ${params.classes}` : buttonStyleType,
      onclick: params.onClick,
      type: params.buttonType ?? 'button',
      disabled: params.disabled ?? false,
    });

    if (params.tooltip) {
      H5P.Tooltip(button, { text: params.tooltip });
    }

    return button;
  }

  return Button;
})();
