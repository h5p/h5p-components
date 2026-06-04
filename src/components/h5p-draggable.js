import '../styles/h5p-draggable.css';
import { createElement } from '../utils.js';

/**
 * @typedef DraggableParams
 * @type {object}
 * @property {string} label A label for the draggable element
 * @property {HTMLElement} [dom]
 *    A DOM element to use as the draggable element Label will be used as fallback
 * @property {number} [tabIndex] Tabindex to use on the draggable element (default 0)
 * @property {boolean} [ariaGrabbed] Initialize the grabbed state on the draggable (default false)
 * @property {boolean} [hasHandle] A boolean determining if the draggable has visual handles or not
 * @property {function} getDropZones
 * A callback function to get the drop zones to check for overlap with
 * @property {function} handleRevert A callback function to handle revert
 * @property {function} handleDragEvent A callback function for the drag event
 * @property {function} handleDragStartEvent A callback function for the dragstart event
 * @property {function} handleDragStopEvent A callback function for the dragend event
 */

/**
 * Create a themed, Draggable element
 * @param {DraggableParams} params A set of parameters to configure the Draggable component
 * @returns {HTMLElement} The Draggable element
 */
function Draggable(params) {
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

  const setContent = ({ dom, label }) => {
    draggable.innerHTML = '';
    if (dom) {
      draggable.append(dom);
    }
    else {
      draggable.innerHTML = `<span>${label}</span><span class="h5p-hidden-read"></span>`;
    }
  };

  const draggable = createElement('div', {
    classList: classes,
    role: 'button',
    tabIndex: params.tabIndex ?? 0,
  });

  setContent({ dom: params.dom, label: params.label });

  // Have to set it like this, because it cannot be set with createElement
  draggable.setAttribute('aria-grabbed', params.ariaGrabbed ?? false);

  // Use jQuery draggable (for now)
  // H5P.jQuery(draggable).draggable({
  //   revert: params.handleRevert,
  //   drag: params.handleDragEvent,
  //   start: params.handleDragStartEvent,
  //   stop: params.handleDragStopEvent,
  //   containment: params.containment,
  // });

  /**
   * Set opacity of element content
   * @param {number} value Opacity value between 0 and 100
   */
  const setContentOpacity = (value) => {
    const sanitizedValue = Math.max(0, Math.min(Number(value) ?? 100, 100)) / 100;
    draggable.style.setProperty('--content-opacity', sanitizedValue);
  };

  const setOpacity = (value) => {
    const sanitizedValue = Math.max(0, Math.min(Number(value) ?? 100, 100)) / 100;
    draggable.style.setProperty('--opacity', sanitizedValue);
  };

  const setDragHandleVisibility = (value) => {
    draggable.classList.toggle('h5p-draggable--has-handle', value);
  };

  const getBorderWidth = () => {
    const computedStyle = window.getComputedStyle(draggable);
    return computedStyle.getPropertyValue('--border-width');
  };

  const isOverlapping = (dropzone, dragRect) => {
    const dropRect = dropzone.getBoundingClientRect();
    const tolerance = dropzone.tolerance ?? 'intersect';

    switch (tolerance) {
      case 'fit':
        return dragRect.left >= dropRect.left && dragRect.right <= dropRect.right
          && dragRect.top >= dropRect.top && dragRect.bottom <= dropRect.bottom;
      case 'touch':
        return !(dragRect.right < dropRect.left || dragRect.left > dropRect.right
            || dragRect.bottom < dropRect.top || dragRect.top > dropRect.bottom);
      case 'pointer': {
        const cx = dragRect.left + dragRect.width / 2;
        const cy = dragRect.top + dragRect.height / 2;
        return cx >= dropRect.left && cx <= dropRect.right
          && cy >= dropRect.top && cy <= dropRect.bottom;
      }
      case 'intersect':
      default: {
        const ox = Math.max(
          0,
          Math.min(dragRect.right, dropRect.right) - Math.max(dragRect.left, dropRect.left),
        );
        const oy = Math.max(
          0,
          Math.min(dragRect.bottom, dropRect.bottom) - Math.max(dragRect.top, dropRect.top),
        );
        return (ox * oy) >= (dragRect.width * dragRect.height) / 2;
      }
    }
  };

  const findDropzone = () => {
    const dropzones = params.getDropZones?.() ?? [];
    const dragRect = draggable.getBoundingClientRect();

    let match = null;

    for (const dropzone of dropzones) {
      if (isOverlapping(dropzone, dragRect)) {
        match = dropzone;
      }
    }

    return match;
  };

  const makeDraggable = () => {
    draggable.style.position ||= 'relative';
    let isDragging = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerCurrentX = 0;
    let pointerCurrentY = 0;
    let draggableStartLeft = 0;
    let draggableStartTop = 0;
    let currentDropzone = null;

    const onPointerDown = (e) => {
      isDragging = true;

      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
      const parent = draggable.offsetParent ?? draggable.parentElement;
      const parentRect = parent.getBoundingClientRect();

      const dragRect = draggable.getBoundingClientRect();
      draggableStartLeft = dragRect.left - parentRect.left;
      draggableStartTop = dragRect.top - parentRect.top;

      draggable.setPointerCapture(e.pointerId);
      draggable.style.left = `${draggableStartLeft}px`;
      draggable.style.top = `${draggableStartTop}px`;

      if (params.handleDragStartEvent) {
        params.handleDragStartEvent(e);
      }
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;

      pointerCurrentX = e.clientX - pointerStartX;
      pointerCurrentY = e.clientY - pointerStartY;

      // To-do (will try to use transform later to enhance performance)
      // draggable.style.transform = `translate(${pointerCurrentX}px, ${pointerCurrentY}px)`;
      draggable.style.left = `${draggableStartLeft + pointerCurrentX}px`;
      draggable.style.top = `${draggableStartTop + pointerCurrentY}px`;

      const overlappedDropzone = findDropzone();
      if (overlappedDropzone !== currentDropzone) {
        currentDropzone?.handleDropOut?.();
        overlappedDropzone?.handleDropOver?.();
        currentDropzone = overlappedDropzone;
      }

      if (params.handleDragEvent) {
        params.handleDragEvent(e);
      }
    };

    const finishDrag = (e, cancelled = false) => {
      isDragging = false;

      draggable.releasePointerCapture(e.pointerId);

      const overlappedDropzone = cancelled ? null : currentDropzone;

      overlappedDropzone?.handleDrop?.(draggable);

      if (params.handleDragStopEvent) {
        params.handleDragStopEvent(e);
      }

      // if (params.handleRevert && params.handleRevert(overlappedDropzone)) {
      //   // draggable.style.transform = 'translate(0, 0)';
      //   draggable.style.left = `${draggableStartLeft}px`;

      //   draggable.style.top = `${draggableStartTop}px`;
      //   pointerCurrentX = 0;
      //   pointerCurrentY = 0;
      // }
      currentDropzone = null;
    };

    draggable.addEventListener('pointerdown', onPointerDown);
    draggable.addEventListener('pointermove', onPointerMove);
    draggable.addEventListener('pointerup', (e) => finishDrag(e));
    draggable.addEventListener('pointercancel', (e) => finishDrag(e, true));
  };

  makeDraggable();

  draggable.setContentOpacity = setContentOpacity;
  draggable.setOpacity = setOpacity;
  draggable.getBorderWidth = getBorderWidth;
  draggable.setContent = setContent;
  draggable.setDragHandleVisibility = setDragHandleVisibility;

  return draggable;
}

export default Draggable;
