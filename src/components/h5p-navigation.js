/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import '../styles/h5p-navigation.css';
import { createElement } from '../utils.js';
import Button from './h5p-button.js';
import ProgressBar from './h5p-progress-bar.js';
import ProgressDots from './h5p-progress-dots.js';

/**
 * @typedef NavigationTexts
 * @type {object}
 * @property {string} previousButton
 * @property {string} nextButton
 * @property {string} lastButton
 * @property {[string]} previousButtonAria
 * @property {[string]} nextButtonAria
 * @property {[string]} lastButtonAria
 * @property {[string]} previousTooltip
 * @property {[string]} nextTooltip
 * @property {[string]} lastTooltip
 * @property {[string]} currentTooltip
 * @property {[string]} totalTooltip
 * The items below are used by ProgressDots
 * @property {string} jumpToQuestion
 * @property {string} answeredText
 * @property {string} unansweredText
 * The item below is used by ProgressText
 * @property {string} textualProgress
 */

/**
 * @typedef {'3-split' | '2-split-next' | '2-split-spread'} NavigationVariant
 * @typedef {'bar' | 'dots' | 'text'} NavigationProgressType
 */

/**
 * @typedef NavigationParams
 * @type {object}
 * @property {number} index The current position in the navigation
 * @property {number} navigationLength The number of "items" we can navigate through
 * @property {[NavigationVariant]} variant
 *    The type of grid layout for the navigation (3split is default)
 * @property {[NavigationTexts]} texts
 *    Translations stuff. @todo, should H5P.Component maintain own translations?
 * @property {[string]} className Extra css classes to be applied on the navigation element
 * @property {[function]} handlePrevious
 *    A function that enables the previous button and triggers when it has been clicked
 * @property {[function]} handleNext
 *    A function that enables the next button and triggers when it has been clicked
 * @property {[function]} handleLast
 *    A function that enables the "last" button and triggers when it has been clicked
 *    Typically a "submit" or "show results" button
 * @property {[NavigationProgressType]} progressType
 *    Can show a progress bar, dot navigation or textual progress
 * @property {[Array]} dots
 *    If progressType==='dots', the dots array is required
 *    Each dot has tabIndex and ariaLabel property
 * @property {[function]} handleProgressDotClick
 *    A function that is called when the user clicks the on a "dot". Optional
 * @property {[object]} options
 * @property {[boolean]} options.disableBackwardsNavigation
 *    If backwards navigation should be disabled or not
 * @property {[boolean]} showDisabledButtons
 *    If true, buttons will be disabled instead of hidden when not usable
 *  @property {[Array]} titles
 *    Array of titles for each page/chapter, used when progressType is 'text'
 */

/**
 * Create DOM elements from text with placeholders
 * @param {string} text - Text containing placeholders like @current, @total
 * @param {object} replacements - Object mapping placeholder names to replacement functions
 * @returns {[Node]} Array of DOM nodes (text nodes and elements)
 */
function createElementsFromPlaceholders(text, replacements) {
  const placeholders = Object.keys(replacements);
  const regExp = new RegExp(`(${placeholders.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');

  return text.split(regExp)
    .filter((part) => part !== '')
    .map((part) => (replacements[part] ? replacements[part]() : document.createTextNode(part)));
}

/**
 * Create a span element with optional tooltip
 * @param {string} className - CSS class name for the span
 * @param {string|number} content - Text content for the span
 * @param {string} [tooltipText] - Optional tooltip text
 * @returns {HTMLElement} The span element
 */
function createProgressSpan(className, content, tooltipText) {
  const span = createElement('span', {
    classList: className,
    innerText: content,
  });

  if (tooltipText) {
    H5P.Tooltip(span, { text: tooltipText, position: 'top' });
  }

  return span;
}

/**
 * Update progress text element with new current/total values
 * @param {HTMLElement} progressText - Existing progress text element to update
 * @param {string} textualProgress - Text template with @current and @total placeholders
 * @param {number} currentIndex - Current index (0-based)
 * @param {number} navigationLength - Total number of items
 * @param {object} texts - Text configuration object
 * @param {string} [params.texts.currentTooltip] - Tooltip for current index
 * @param {string} [params.texts.totalTooltip] - Tooltip for total count*
 */
// eslint-disable-next-line max-len
function updateProgressText(progressText, textualProgress, currentIndex, navigationLength, texts = {}) {
  // Clear existing content
  progressText.innerHTML = '';

  // Create new content
  const domParts = createElementsFromPlaceholders(textualProgress, {
    '@current': () => createProgressSpan('progress-current', currentIndex + 1, texts.currentTooltip),
    '@total': () => createProgressSpan('progress-last', navigationLength, texts.totalTooltip),
  });

  domParts.forEach((part) => progressText.appendChild(part));
}

/**
 * Create a progress text element with current/total placeholders
 * @param {object} params - Parameters for creating progress text
 * @param {string} params.textualProgress - Text template with @current and @total placeholders
 * @param {number} params.currentIndex - Current index (0-based)
 * @param {number} params.navigationLength - Total number of items
 * @param {object} params.texts - Text configuration object
 * @param {string} [params.texts.currentTooltip] - Tooltip for current index
 * @param {string} [params.texts.totalTooltip] - Tooltip for total count
 * @returns {HTMLElement} The complete progressText element
 */
function createProgressText({
  textualProgress, currentIndex, navigationLength, texts = {},
}) {
  const progressText = createElement('div', {
    classList: 'progress-text',
  });

  updateProgressText(progressText, textualProgress, currentIndex, navigationLength, texts);

  return progressText;
}

/**
 * Create a navigation component, with optional progress components.
 * @param {NavigationParams} params A set of parameters to configure the Navigation component
 * @returns {HTMLElement} The navigation element
 */
function Navigation(params = {}) {
  let progressBar;
  let dotsNavigation;
  let progressText;
  let title;
  let prevButton;
  let nextButton;
  let lastButton;
  let canShowLast = false;
  let index = params.index ?? 0;
  let className = 'h5p-navigation';

  if (params.variant === '2-split-spread') {
    className += ' h5p-navigation--2-split-spread';
  }
  else if (params.variant === '2-split-next') {
    className += ' h5p-navigation--2-split-next';
  }
  else {
    className += ' h5p-navigation--3-split';
  }

  const container = createElement('nav', {
    classList: `${className} ${params.className ?? ''}`,
    role: 'navigation',
  });

  if (params.handlePrevious) {
    const prevClassList = 'h5p-theme-previous';
    prevButton = Button({
      styleType: 'nav',
      label: params?.texts?.previousButton ?? 'Previous',
      ariaLabel: params?.texts.previousButtonAria,
      tooltip: params?.texts.previousTooltip,
      icon: 'previous',
      classes:
        // eslint-disable-next-line no-nested-ternary
        index === 0
          ? params.showDisabledButtons
            ? `${prevClassList} h5p-disabled`
            : `${prevClassList} h5p-visibility-hidden`
          : prevClassList,
      disabled: params.showDisabledButtons && index === 0,
      onClick: (event) => {
        if (params.handlePrevious(event) !== false) {
          previous();
        }
      },
    });
    container.appendChild(prevButton);
  }

  if (params.progressType === 'bar') {
    progressBar = ProgressBar({
      index,
      progressLength: params.navigationLength,
    });
    container.appendChild(progressBar);
  }
  else if (params.progressType === 'dots') {
    dotsNavigation = ProgressDots({
      dots: params.dots,
      texts: params.texts ?? {},
      handleProgressDotClick: (event) => {
        index = Number(event.target.getAttribute('data-index'));
        params.handleProgressDotClick?.(event, index);
      },
    });
    container.appendChild(dotsNavigation);
  }
  else if (params.progressType === 'text') {
    const progressContainer = createElement('div', {
      classList: 'progress-container h5p-theme-progress',
    });

    progressText = createProgressText({
      textualProgress: params.texts.textualProgress,
      currentIndex: index,
      navigationLength: params.navigationLength,
      texts: params.texts,
    });

    progressContainer.appendChild(progressText);

    // Page chapter title used in IB
    if (params.titles && params.titles.length > 0) {
      title = createElement('h1', {
        classList: 'title',
      });
      title.textContent = params.titles[index] || '';

      const progressWrapper = createElement('div', {
        classList: 'progress-wrapper',
      });
      progressWrapper.appendChild(progressContainer);
      progressWrapper.appendChild(title);
      container.appendChild(progressWrapper);
    }
    else {
      container.appendChild(progressContainer);
    }
  }

  if (params.handleNext) {
    const nextClassList = 'h5p-theme-next';
    nextButton = Button({
      styleType: 'nav',
      label: params?.texts?.nextButton ?? 'Next',
      ariaLabel: params?.texts.nextButtonAria,
      tooltip: params?.texts.nextTooltip,
      icon: 'next',
      classes:
        index === params.navigationLength - 1
          ? params.showDisabledButtons
            ? `${nextClassList} h5p-disabled`
            : `${nextClassList} h5p-visibility-hidden`
          : nextClassList,
      disabled:
        params.showDisabledButtons && index === params.navigationLength - 1,
      onClick: (event) => {
        if (params.handleNext(event) !== false) {
          next();
        }
      },
    });
    container.appendChild(nextButton);
  }

  if (params.handleLast) {
    lastButton = Button({
      styleType: 'primary',
      label: params?.texts?.lastButton ?? 'Submit',
      ariaLabel: params?.texts.lastButtonAria,
      tooltip: params?.texts.lastTooltip,
      icon: 'show-results',
      classes: 'h5p-visibility-hidden',
      onClick: (event) => {
        next();
        params.handleLast(event);
      },
    });
    container.appendChild(lastButton);
  }

  const calculateButtonVisibility = () => {
    if (params.showDisabledButtons) {
      // Disable/enable buttons instead of hiding them
      if (prevButton) {
        prevButton.toggleAttribute('disabled', index === 0);
        prevButton.classList.toggle('h5p-disabled', index === 0);
      }

      if (nextButton) {
        const isLastPage = index >= params.navigationLength - 1;
        nextButton.toggleAttribute('disabled', isLastPage);
        nextButton.classList.toggle('h5p-disabled', isLastPage);

        // Last button still uses visibility logic
        lastButton?.classList.toggle(
          'h5p-visibility-hidden',
          !canShowLast || !isLastPage,
        );
      }
    }
    else {
      // Original behavior - hide/show buttons
      if (prevButton && index === 0) {
        prevButton.classList.add('h5p-visibility-hidden');
      }
      else if (prevButton && index > 0) {
        prevButton.classList.remove('h5p-visibility-hidden');
      }

      if (nextButton && index >= params.navigationLength - 1) {
        nextButton.classList.add('h5p-visibility-hidden');
        lastButton?.classList.toggle('h5p-visibility-hidden', !canShowLast);
      }
      else if (nextButton && index < params.navigationLength - 1) {
        nextButton.classList.remove('h5p-visibility-hidden');
        lastButton?.classList.add('h5p-visibility-hidden');
      }
    }
  };

  const setCanShowLast = (canShow) => {
    canShowLast = canShow;
    calculateButtonVisibility();
  };

  const setCurrentIndex = (newIndex) => {
    index = newIndex;

    if (title && params.titles && params.titles[index]) {
      title.textContent = params.titles[index];
    }

    if (progressBar) {
      progressBar.updateProgressBar(index);
    }
    else if (progressText) {
      updateProgressText(
        progressText,
        params.texts.textualProgress,
        index,
        params.navigationLength,
        params.texts,
      );
    }
    else if (dotsNavigation) {
      dotsNavigation.toggleCurrentDot(index);
    }

    calculateButtonVisibility();
  };

  const previous = () => {
    setCurrentIndex(index - 1);
  };

  const next = () => {
    setCurrentIndex(index + 1);
  };

  const setNavigationLength = (navigationLength) => {
    if (typeof navigationLength !== 'number' || navigationLength < 0) {
      throw new Error('Invalid navigation length');
    }

    params.navigationLength = navigationLength;
  };

  container.setCurrentIndex = setCurrentIndex;
  container.setNavigationLength = setNavigationLength;
  container.previous = previous;
  container.next = next;
  container.setCanShowLast = setCanShowLast;
  container.progressBar = progressBar;
  container.progressDots = dotsNavigation;

  return container;
}

export default Navigation;
