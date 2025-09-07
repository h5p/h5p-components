// eslint-disable-next-line no-use-before-define, no-var
var H5P = H5P || {};
H5P.Components = H5P.Components || {};

H5P.Components.Draggable = (function ($) {
  /**
   * @typedef DraggableParams
   * @type {object}
   * @property {string} label A label for the draggable element.
   * @property {[number]} tabIndex Tabindex to use on the draggable element (default 0).
   * @property {[boolean]} ariaGrabbed Initialize the grabbed state on the draggable (default false).
   * @property {[boolean]} hasHandle A boolean determining if the draggable has visual handles or not.
   * @property {function} handleRevert A callback function to handle revert.
   * @property {function} handleDragEvent A callback function for the drag event.
   * @property {function} handleDragStartEvent A callback function for the dragstart event.
   * @property {function} handleDragStopEvent A callback function for the dragend event.
   */

  /**
   * Create a themed, Draggable element
   * @param {DraggableParams} params A set of parameters to configure the Draggable component.
   * @returns {HTMLElement} The Draggable element.
   */
  function Draggable(params) {
    const { createElement } = H5P.Components.utils;
    let classes = 'h5p-draggable';

    if (params.hasHandle) {
      classes += ' h5p-draggable--has-handle';
    }

    if (params.statusChangesBackground) {
      classes += ' h5p-draggable--background-status';
    }

    if (params.pointsAndStatus) {
      classes += ' h5p-draggable--points-and-status';
    }

    const draggable = createElement('div', {
      classList: classes,
      innerHTML: `<span>${params.label}</span><span class="h5p-hidden-read"></span>`,
      role: 'button',
      tabIndex: params.tabIndex ?? 0,
    });

    // Have to set it like this, because it cannot be set with createElement.
    draggable.setAttribute('aria-grabbed', params.ariaGrabbed ?? false);

    // Use jQuery draggable (for now)
    $(draggable).draggable({
      revert: params.handleRevert,
      drag: params.handleDragEvent,
      start: params.handleDragStartEvent,
      stop: params.handleDragStopEvent,
      containment: params.containment,
    });
    

    return draggable;
  }

  return Draggable;
})(H5P.jQuery);
