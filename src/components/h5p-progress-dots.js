import '../styles/h5p-progress-dots.css';
import { createElement } from '../utils.js';
/**
 * @typedef ProgressDots
 * @type {object}
 * @property {string} ariaLabel A label for screen reader users when navigating to a dot
 * @property {[number]} tabIndex Initial tabIndex for a dot
 */

/**
 * @typedef ProgressDotsTexts
 * @type {object}
 * @property {string} jumpToQuestion
 * @property {string} answeredText
 * @property {string} unansweredText
 * @property {string} currentQuestionText
 */

/**
 * @typedef ProgressDotsParams
 * @type {object}
 * @property {[number]} index The current position in the navigation
 * @property {ProgressDots[]} dots Array of dots to process
 * @property {ProgressDotsTexts} texts A collection of translatable strings
 * @property {[function]} handleProgressDotClick A callback function when a dot is clicked
 */

/**
 * Creates navigational dots
 * @param {ProgressDotsParams} params A set of parameters to configure ProgressDots
 * @returns {HTMLElement} The ProgressDots element
 */
function ProgressDots(params = {}) {
  const progressLength = params.dots.length;

  let activeIndex = params.index ?? 0;
  const progressDotElements = [];

  const dotsContainer = createElement('ul', {
    className: 'h5p-progress-dots-container',
  });

  const onProgressDotClick = (event) => {
    event.preventDefault();

    const newIndex = Number(event.target.getAttribute('data-index'));

    toggleCurrentDot(newIndex);
    params.handleProgressDotClick?.(event);
  };

  const onKeyDown = (event) => {
    switch (event.code) {
      case 'Enter':
      case 'Space':
        onProgressDotClick(event);
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        // Go to previous dot
        setActiveDot(activeIndex - 1);
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        // Go to next dot
        setActiveDot(activeIndex + 1);
        break;

      default:
        break;
    }
  };

  const hasOneFocusableDot = params.dots.some((dot) => dot.tabIndex >= 0);

  params.dots.forEach((dot, i) => {
    const item = createElement('li', {
      className: 'h5p-progress-item',
    });
    // We need to ensure that we can keyboard navigate to at least one of the dots
    let tabIndex;
    if (hasOneFocusableDot) {
      tabIndex = dot.tabIndex ?? -1;
    }
    else if (i === 0) {
      tabIndex = 0;
    }
    else {
      tabIndex = -1;
    }
    const progressDot = createElement('a', {
      href: '#',
      className: `h5p-progress-dot unanswered ${tabIndex >= 0 ? 'current' : ''}`,
      ariaLabel: dot.ariaLabel,
      tabIndex,
      onclick: onProgressDotClick,
      onkeydown: onKeyDown,
    });

    progressDot.setAttribute('data-index', i);
    item.appendChild(progressDot);
    dotsContainer.appendChild(item);
    progressDotElements.push(progressDot);
  });

  const setActiveDot = (newIndex, placeFocus = true) => {
    if (newIndex < 0 || newIndex >= progressLength) {
      return;
    }
    activeIndex = newIndex;
    progressDotElements.forEach((el, i) => {
      el.setAttribute('tabIndex', activeIndex === i ? 0 : -1);
    });

    if (placeFocus) {
      progressDotElements[activeIndex].focus();
    }
  };

  const toggleCurrentDot = (newIndex) => {
    const { texts } = params;
    progressDotElements.forEach((el, i) => {
      el.setAttribute('tabIndex', activeIndex === i ? 0 : -1);
      const isCurrent = i === newIndex;
      let label = texts.jumpToQuestion
        .replace('%d', (newIndex + 1).toString())
        .replace('%total', progressDotElements.length);

      if (!isCurrent) {
        const isAnswered = el.classList.contains('answered');
        label += `, ${(isAnswered ? texts.answeredText : texts.unansweredText)}`;
      }
      else {
        label += `, ${texts.currentQuestionText}`;
      }

      el.classList.toggle('current', isCurrent);
      el.setAttribute('aria-label', label);
    });
  };

  const toggleFilledDot = (filledIndex, isFilled) => {
    const label = `${params.texts.jumpToQuestion
      .replace('%d', (filledIndex + 1).toString())
      .replace('%total', progressDotElements.length)
    }, ${
      isFilled ? params.texts.answeredText : params.texts.unansweredText}`;

    progressDotElements[filledIndex].classList.toggle('unanswered', !isFilled);
    progressDotElements[filledIndex].classList.toggle('answered', isFilled);
    progressDotElements[filledIndex].setAttribute('aria-label', label);
  };

  dotsContainer.setActiveDot = setActiveDot;
  dotsContainer.toggleFilledDot = toggleFilledDot;
  dotsContainer.toggleCurrentDot = toggleCurrentDot;

  return dotsContainer;
}

export default ProgressDots;
