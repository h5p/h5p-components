// eslint-disable-next-line no-use-before-define, no-var
var H5P = H5P || {};
H5P.Components = H5P.Components || {};

H5P.Components.Navigation = (function () {
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
   * @property {number} index The current position in the navigation.
   * @property {number} navigationLength The number of "items" we can navigate through.
   * @property {[NavigationVariant]} variant The type of grid layout for the navigation (3split is default).
   * @property {[NavigationTexts]} texts Translations stuff. @todo, should H5P.Component maintain own translations?
   * @property {[string]} className Extra css classes to be applied on the navigation element
   * @property {[function]} handlePrevious A function that enables the previous button and triggers when it has been clicked.
   * @property {[function]} handleNext A function that enables the next button and triggers when it has been clicked.
   * @property {[function]} handleLast A function that enables the "last" button and triggers when it has been clicked. Typically a "submit" or "show results" button.
   * @property {[NavigationProgressType]} progressType Can show a progress bar, dot navigation or textual progress.
   * @property {[Array]} dots If progessType==='dots', the dots array is required. Each dot has tabIndex and ariaLabel property.
   * @property {[function]} handleProgressDotClick A function that is called when the user clicks the on a "dot". Optional.
   * @property {[object]} options
   * @property {[boolean]} options.disableBackwardsNavigation If backwards navigation should be disabled or not.
   * @property {[boolean]} showDisabledButtons If true, buttons will be disabled instead of hidden when not usable.
   * @property {[string]} title Optional page title, used in content-types such as IB.
   */

  /**
   * Create a navigation component, with optional progress components.
   * @param {NavigationParams} params A set of parameters to configure the Navigation component.
   * @returns {HTMLElement} The navigation element.
   */
  function Navigation(params = {}) {
    const { createElement } = H5P.Components.utils;

    let progressBar,
      dotsNavigation,
      progressText,
      title,
      prevButton,
      nextButton,
      lastButton;
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
      prevButton = H5P.Components.Button({
        styleType: 'nav',
        label: params?.texts?.previousButton ?? 'Previous',
        ariaLabel: params?.texts.previousButtonAria,
        tooltip: params?.texts.previousTooltip,
        icon: 'previous',
        classes:
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
      progressBar = H5P.Components.ProgressBar({
        index,
        progressLength: params.navigationLength,
      });
      container.appendChild(progressBar);
    }
    else if (params.progressType === 'dots') {
      dotsNavigation = H5P.Components.ProgressDots({
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

      progressText = createElement('span', {
        classList: 'progress-text',
      });
      progressText.textContent = params.texts.textualProgress
        .replace('@current', index + 1)
        .replace('@total', params.navigationLength);
      progressContainer.appendChild(progressText);

      if (params.title) {
        titleElement = createElement('h1', {
          classList: 'title',
        });
        titleElement.textContent = params.title;
        progressContainer.appendChild(titleElement);
      }

      container.appendChild(progressContainer);
    }

    if (params.handleNext) {
      const nextClassList = 'h5p-theme-next';
      nextButton = H5P.Components.Button({
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
      lastButton = H5P.Components.Button({
        styleType: 'primary',
        label: params?.texts?.lastButton ?? 'Submit',
        ariaLabel: params?.texts.lastButtonAria,
        tooltip: params?.texts.lastTooltip,
        icon: 'show-results',
        classes: 'h5p-theme-submit h5p-visibility-hidden',
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

    const updateTitle = (newTitle) => {
      if (title) {
        title.textContent = newTitle;
      }
    };

    const setCurrentIndex = (newIndex) => {
      index = newIndex;
      if (progressBar) {
        progressBar.updateProgressBar(index);
      }
      else if (progressText) {
        progressText.textContent = params.texts.textualProgress
          .replace('@current', index + 1)
          .replace('@total', params.navigationLength);
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

    container.setCurrentIndex = setCurrentIndex;
    container.previous = previous;
    container.next = next;
    container.setCanShowLast = setCanShowLast;
    container.updateTitle = updateTitle;
    container.progressBar = progressBar;
    container.progressDots = dotsNavigation;

    return container;
  }

  return Navigation;
})();
