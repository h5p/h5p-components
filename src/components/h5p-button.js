var H5P = H5P || {};
H5P.Components = H5P.Components || {};

H5P.Components.Button = (function () {
  /**
   * Create a themed, responsive button
   * @param {string} [params.label] The button text
   * @param {string} [params.ariaLabel] The screenreader friendly text. Default is label.
   * @param {string} [params.tooltip] The tooltip to show on hover/focus. Default is label if icon enabled. Needed since icon only button on small screens
   * @param {string} [params.styleType] Which (visual) type of button it is. Options are primary (default), secondary and nav.
   * @param {string} [params.icon] Which icon to show on the button. Options are check, retry, done, show-results, book, flip, reveal-answer, next, previous
   * @param {string} [params.classes] Additional classes to add to the button
   * @param {function} [params.onClick] The function to perform once the button is clicked
   * @param {string} [params.buttonType] Which html type the button should be. Default is button
   * @param {boolean} [params.disabled] Whether the button should be enabled or disabled. Default is enabled
   */
  function Button (params) {
    const { createElement } = H5P.Components.utils;
    let buttonStyleType = 'h5p-theme-primary-cta';

    if (params.styleType === 'secondary') {
      buttonStyleType = 'h5p-theme-secondary-cta';
    } else if (params.styleType === 'nav') {
      buttonStyleType = 'h5p-theme-nav-button';
    }

    if (params.icon) {
      buttonStyleType += ` h5p-theme-${params.icon}`;
      params.tooltip = params.tooltip ?? params.label;
    }

    const button = createElement('button', {
      innerHTML: params.label ? `<span class="h5p-theme-label">${params.label}</span>` : '',
      ariaLabel: params.ariaLabel ?? params.label,
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
