import '../styles/h5p-dropzone.css';
import { createElement } from '../utils.js';

/**
 * @typedef {'fit' | 'intersect' | 'pointer' | 'touch'} DropzoneTolerance
 * @typedef {'inline' | 'area'} DropzoneVariant
 */

/**
 * @typedef DropzoneParams
 * @type {object}
 * @property {string} role Role for the dropzone
 * @property {string} ariaLabel A label for the dropzone element
 * @property {number} [index]
 *    An index to track which dropzone this element is in a set Defaults to -1
 * @property {boolean} ariaDisabled If the dropzone should be aria disabled
 * @property {string} [classes] Extra classes to be added to the dropzone
 * @property {string} [containerClasses] Extra classes to be added to the container of the dropzone
 * @property {number} [tabIndex] Tabindex to use on the dropzone element (default -1)
 * @property {boolean} [backgroundOpacity] The level of opacity on the dropzone (0-100)
 * @property {DropzoneVariant} [variant] The type of dropzone to use. Default is 'inline'
 * @property {DropzoneTolerance} tolerance
 *    Specifies which mode to use for testing whether draggable is hovering over a droppable
 * @property {string} [areaLabel] A label used for a dropzone area
 * @property {function} handleAcceptEvent A function for jquery-droppable accept option
 * @property {function} handleDropEvent A callback function for the drop event
 * @property {function} handleDropOutEvent A callback function for the out event
 * @property {function} handleDropOverEvent A callback function for the over event
 */

/**
 * Create a themed, Dropzone element
 * @param {DropzoneParams} params A set of parameters to configure the Dropzone component
 * @returns {HTMLElement} The dropzone element
 */
function Dropzone(params) {
  const classList = ['h5p-dropzone',
    params.variant === 'area' ? 'h5p-dropzone--area' : 'h5p-dropzone--inline',
  ];

  if (typeof params.containerClasses === 'string') {
    classList.push(params.containerClasses);
  }

  if (params.backgroundOpacity === 0) {
    classList.push('h5p-dropzone--transparent-background');
  }
  else if (params.backgroundOpacity === 100) {
    classList.push('h5p-dropzone--opaque-background');
  }

  const options = {
    classList: classList.join(' '),
    role: params.role,
    ariaDisabled: params.ariaDisabled,
  };

  const dropzoneContainer = createElement('div', options);

  if (params.variant === 'area' && params.areaLabel) {
    const areaLabel = createElement('div', { classList: 'h5p-dropzone_label' });
    areaLabel.innerHTML = params.areaLabel;
    dropzoneContainer.appendChild(areaLabel);
  }

  const $dropzone = H5P.jQuery('<div/>', {
    'aria-dropeffect': 'none',
    'aria-label': params.ariaLabel,
    tabindex: params.tabIndex ?? -1,
    class: params.classes ? params.classes : '',
  }).appendTo(dropzoneContainer)
    .droppable({
      activeClass: 'h5p-dropzone--active',
      tolerance: params.tolerance,
      accept: params.handleAcceptEvent,
      over: (event, ui) => {
        dropzone.classList.add('h5p-dropzone--hover');
        params.handleDropOverEvent?.(event, ui);
      },
      out: (event, ui) => {
        dropzone.classList.remove('h5p-dropzone--hover');
        params.handleDropOutEvent?.(event, ui);
      },
      drop: (event, ui) => {
        dropzone.classList.remove('h5p-dropzone--hover');
        params.handleDropEvent?.(event, ui, params.index ?? -1);
      },
    });
  const dropzone = $dropzone.get(0);

  return dropzoneContainer;
}

export default Dropzone;
