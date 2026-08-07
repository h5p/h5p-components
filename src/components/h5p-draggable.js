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
  H5P.jQuery(draggable).draggable({
    revert: params.handleRevert,
    drag: params.handleDragEvent,
    start: params.handleDragStartEvent,
    stop: params.handleDragStopEvent,
    containment: params.containment,
  });

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

  draggable.setContentOpacity = setContentOpacity;
  draggable.setOpacity = setOpacity;
  draggable.getBorderWidth = getBorderWidth;
  draggable.setContent = setContent;
  draggable.setDragHandleVisibility = setDragHandleVisibility;

  return draggable;
}

export default Draggable;
