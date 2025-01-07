var H5P = H5P || {};
H5P.Components = H5P.Components || {};
const createElement = H5P.Components.utils.createElement;

/**
 * Create a result screen, summing up the tasks of the content and the scores achieved
 * @param {HTMLElement} container
 * @param {string} params.header The main header of the result screen
 * @param {string} params.scoreHeader The header detailing the total score
 * @param {[string]} params.listHeaders The table headers
 */
H5P.Components.ResultScreen = (function () {
  function ResultScreen (container, params) {
    // Create main wrapper
    const resultScreen = document.createElement('div');
    resultScreen.classList.add('h5p-theme-result-screen');

    // Create header banner
    const header = createElement('div', { classList: 'h5p-theme-results-banner' });
    header.appendChild(createElement('div', { classList: 'h5p-theme-pattern' }));
    header.appendChild(createElement('div', {
      classList: 'h5p-theme-results-title',
      textContent: params.header,
    }));
    header.appendChild(createElement('div', {
      classList: 'h5p-theme-results-score',
      innerHTML: params.scoreHeader,
    }));
    resultScreen.append(header);

    // Create the summary table
    const listContainer = createElement('div', { classList: 'h5p-theme-results-list-container' });
    const listHeaders = createElement('div', { classList: 'h5p-theme-results-list-heading' });
    params.listHeaders.forEach(title => {
      listHeaders.appendChild(createElement('h3', { textContent: title }));
    });
    listContainer.appendChild(listHeaders);

    const resultList = createElement('div', { classList: 'h5p-theme-results-list' });
    // TODO: loop through questions

    listContainer.appendChild(resultList);
    resultScreen.appendChild(listContainer);

    container.appendChild(resultScreen);
    return resultScreen;
  }

  return ResultScreen;
})();