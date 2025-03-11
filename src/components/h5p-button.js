var H5P = H5P || {};
H5P.Components = H5P.Components || {};
createElement = H5P.Components.utils.createElement;

/**
 * Create a themed, responsive button
 * @param {HTMLElement} container
 * @param {string} [params.label] The button text
 * @param {string} [params.ariaLabel] The screenreader friendly text. Default is label.
 * @param {string} [params.tooltip] The tooltip to show on hover/focus. Default is label if icon enabled. Needed since icon only button on small screens
 * @param {string} [params.type] Which (visual) type of button it is. Options are primary (default), secondary and nav.
 * @param {string} [params.icon] Which icon to show on the button. Options are check, retry, done, show-results, book, flip, reveal-answer, next, previous
 * @param {string} [params.classes] Additional classes to add to the button
 * @param {function} [params.onClick] The function to perform once the button is clicked
 */
H5P.Components.Button = (function () {
  function Button (container, params) {
    const button = createElement('button', {
      innerHTML: params.label ? `<span class="h5p-theme-label">${params.label}</span>` : '',
      ariaLabel: params.ariaLabel ?? params.label,
      classList: params.classes ?? '',
      onclick: params.onClick,
    });

    switch (params.type) {
      case 'secondary':
        button.classList.add('h5p-theme-secondary-cta');
        break;
      case 'nav':
        button.classList.add('h5p-theme-nav-button');
        break;
      default:
        button.classList.add('h5p-theme-primary-cta');
        break;
    }

    if (params.icon) {
      button.classList.add(`h5p-theme-${params.icon}`);
      params.tooltip = params.tooltip ?? params.label;
    }

    if (params.tooltip) {
      H5P.Tooltip(button, { text: params.tooltip });
    }

    container.appendChild(button);
    return button;
  }

  return Button;
})();
