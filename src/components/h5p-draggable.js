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
  let disabled = false;

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

  const setDisabled = (value) => {
    disabled = !!value;
    draggable.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    draggable.classList.toggle('h5p-draggable--disabled', disabled);
  };

  const setDragHandleVisibility = (value) => {
    draggable.classList.toggle('h5p-draggable--has-handle', value);
  };

  const getBorderWidth = () => {
    const computedStyle = window.getComputedStyle(draggable);
    return computedStyle.getPropertyValue('--border-width');
  };

  const isOverlapping = (dropzone, dropRect, dragRect, pointerX, pointerY) => {
    const tolerance = dropzone.tolerance ?? 'intersect';

    /* Taken from jQuery UI's droppable tolerance documentation:
    https://api.jqueryui.com/droppable/#option-tolerance */
    switch (tolerance) {
      case 'fit':
        // Draggable overlaps the droppable entirely.
        return dragRect.left >= dropRect.left && dragRect.right <= dropRect.right
          && dragRect.top >= dropRect.top && dragRect.bottom <= dropRect.bottom;
      case 'touch':
        // Draggable overlaps the droppable any amount.
        return !(dragRect.right < dropRect.left || dragRect.left > dropRect.right
            || dragRect.bottom < dropRect.top || dragRect.top > dropRect.bottom);
      case 'pointer':
        // Mouse pointer overlaps the droppable.
        return pointerX >= dropRect.left && pointerX <= dropRect.right
          && pointerY >= dropRect.top && pointerY <= dropRect.bottom;
      case 'intersect':
      default: {
        // Draggable overlaps the droppable at least 50% in both directions.
        const overlapX = Math.max(
          0,
          Math.min(dragRect.right, dropRect.right) - Math.max(dragRect.left, dropRect.left),
        );
        const overlapY = Math.max(
          0,
          Math.min(dragRect.bottom, dropRect.bottom) - Math.max(dragRect.top, dropRect.top),
        );
        return overlapX >= dragRect.width / 2 && overlapY >= dragRect.height / 2;
      }
    }
  };

  const findDropzone = (dropzones, dragRect, pointerX, pointerY) => {
    let match = null;

    for (const { dropzone, dropRect } of dropzones) {
      if (isOverlapping(dropzone, dropRect, dragRect, pointerX, pointerY)) {
        match = dropzone;
      }
    }

    return match;
  };

  const makeDraggable = () => {
    draggable.style.position ||= 'relative';
    let isDragging = false;
    let activePointerId = null;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerCurrentX = 0;
    let pointerCurrentY = 0;
    let draggableStartLeft = 0;
    let draggableStartTop = 0;
    let draggableStartRect = null;
    let dropzones = [];
    let currentDropzone = null;

    const setPosition = (left, top) => {
      draggable.style.left = `${left}px`;
      draggable.style.top = `${top}px`;
    };

    const setDragging = (value) => {
      isDragging = value;
      draggable.style.willChange = value ? 'transform' : '';
    };

    const onPointerDown = (e) => {
      if (disabled || isDragging) return;
      setDragging(true);
      activePointerId = e.pointerId;
      e.preventDefault();

      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
      const parent = draggable.offsetParent ?? draggable.parentElement;
      const parentRect = parent.getBoundingClientRect();

      draggableStartRect = draggable.getBoundingClientRect();
      draggableStartLeft = draggableStartRect.left - parentRect.left;
      draggableStartTop = draggableStartRect.top - parentRect.top;

      setPosition(draggableStartLeft, draggableStartTop);

      if (params.handleDragStartEvent) {
        params.handleDragStartEvent(e);
      }

      dropzones = (params.getDropZones?.() ?? []).map((dropzone) => ({
        dropzone,
        dropRect: dropzone.getBoundingClientRect(),
      }));
      draggable.setPointerCapture(activePointerId);
    };

    const onPointerMove = (e) => {
      if (!isDragging || e.pointerId !== activePointerId) return;

      e.preventDefault();

      pointerCurrentX = e.clientX - pointerStartX;
      pointerCurrentY = e.clientY - pointerStartY;

      draggable.style.transform = `translate(${pointerCurrentX}px, ${pointerCurrentY}px)`;

      const dragRect = new DOMRect(
        draggableStartRect.x + pointerCurrentX,
        draggableStartRect.y + pointerCurrentY,
        draggableStartRect.width,
        draggableStartRect.height,
      );
      const overlappedDropzone = findDropzone(dropzones, dragRect, e.clientX, e.clientY);
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
      if (!isDragging || e.pointerId !== activePointerId) return;

      setDragging(false);
      draggable.releasePointerCapture(activePointerId);

      draggable.style.transform = 'translate(0, 0)';
      setPosition(
        draggableStartLeft + pointerCurrentX,
        draggableStartTop + pointerCurrentY,
      );

      const overlappedDropzone = cancelled ? null : currentDropzone;
      overlappedDropzone?.handleDrop?.(draggable);

      if (params.handleDragStopEvent) {
        params.handleDragStopEvent(e);
      }

      if (params.handleRevert && params.handleRevert(overlappedDropzone)) {
        setPosition(draggableStartLeft, draggableStartTop);
        pointerCurrentX = 0;
        pointerCurrentY = 0;
      }
      currentDropzone = null;
      activePointerId = null;
      draggableStartRect = null;
      dropzones = [];
    };

    draggable.addEventListener('pointerdown', onPointerDown);
    draggable.addEventListener('pointermove', onPointerMove);
    draggable.addEventListener('pointerup', (e) => finishDrag(e));
    draggable.addEventListener('pointercancel', (e) => finishDrag(e, true));
  };

  makeDraggable();

  draggable.setContentOpacity = setContentOpacity;
  draggable.setOpacity = setOpacity;
  draggable.setDisabled = setDisabled;
  draggable.getBorderWidth = getBorderWidth;
  draggable.setContent = setContent;
  draggable.setDragHandleVisibility = setDragHandleVisibility;

  return draggable;
}

export default Draggable;
