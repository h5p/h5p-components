// eslint-disable-next-line no-use-before-define, no-var
var H5P = H5P || {};
H5P.Components = H5P.Components || {};

H5P.Components.Dropzone = (function ($) {
  /**
   * @typedef {'fit' | 'intersect' | 'pointer' | 'touch'} DropzoneTolerance
   * @typedef {'inline' | 'area'} DropzoneVariant
   */

  /**
   * @typedef DropzoneParams
   * @type {object}
   * @property {string} ariaLabel A label for the draggable element.
   * @property {[string]} classes Extra classes to be added to the dropzone.
   * @property {[string]} containerClasses Extra classes to be added to the container of the dropzone.
   * @property {[number]} tabIndex Tabindex to use on the dropzone element (default -1).
   * @property {[boolean]} hasOpaqueBackground If the dropzone background is opaque.
   * @property {[DropzoneVariant]} The type of dropzone to use. Default is 'inline'.
   * @property {DropzoneTolerance} tolerance Specifies which mode to use for testing whether draggable is hovering over a droppable.
   * @property {[string]} areaLabel A label used for a dropzone area.
   * @property {function} handleDropEvent A callback function for the drop event.
   * @property {function} handleDropOutEvent A callback function for the out event.
   * @property {function} handleDropOverEvent A callback function for the over event.
   */

  /**
   * Create a themed, Draggable element
   * @param {DropzoneParams} params A set of parameters to configure the Draggable component.
   * @returns {HTMLElement} The Draggable element.
   */
  function Dropzone(params) {
    const { createElement } = H5P.Components.utils;
    let classes = 'h5p-dropzone ';

    if (params.variant === 'area') {
      classes += ' h5p-dropzone--area';
    }
    else {
      classes += ' h5p-dropzone--inline';
    }

    if (typeof params.containerClasses === 'string') {
      classes += ` ${params.containerClasses}`;
    }

    if (!params.hasOpaqueBackground) {
      classes += ' h5p-dropzone--opaque-background';
    }

    const options = {
      classList: classes,
      role: params.role,
      ariaDisabled: params.ariaDisabled
    };

    const dropzoneContainer = createElement('div', options);

    if (params.variant === 'area' && params.areaLabel) {
      const areaLabel = createElement('div', { classList: 'h5p-dropzone_label' });
      areaLabel.textContent = params.areaLabel;
      dropzoneContainer.appendChild(areaLabel);
    }
    
    $('<div/>', {
      'aria-dropeffect': 'none',
      'aria-label':  params.ariaLabel,
      'tabindex': params.tabIndex ?? -1,
      class: params.classes ? params.classes : '',
    }).appendTo(dropzoneContainer)
      .droppable({
        activeClass: 'h5p-dropzone--active',
        tolerance: params.tolerance,
        accept: params.handleAcceptEvent,
        over: params.handleDropOverEvent,
        out: params.handleDropOutEvent,
        drop: params.handleDropEvent
      });

    return dropzoneContainer;
  }

  return Dropzone;
})(H5P.jQuery);
