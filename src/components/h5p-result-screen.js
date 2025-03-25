var H5P = H5P || {};
H5P.Components = H5P.Components || {};
let createElement = H5P.Components.utils.createElement;

/**
 * Create a result screen, summing up the tasks of the content and the scores achieved
 * @param {HTMLElement} container
 * @param {string} params.header The main header of the result screen
 * @param {string} params.scoreHeader The header detailing the total score
 * @param {[string]} params.listHeaders The table headers
 *
 * @param {[Object]} params.questions The list of tasks to be summarized
 * @property {string} [params.questions.imgUrl] The url to an image to display before the question
 * @property {boolean} [params.question.useDefaultImg] Use a default image. Will be overwritten by imgUrl
 * @property {string} params.questions.title The textual description of the question
 * @property {string} params.questions.points The score of the question
 * @property {boolean} [params.question.isCorrect] If the answer is considered correct
 *                     (Some content types are more lenient)
 * @property {string} [params.question.userAnswer] What the user answered
 * @property {string} [params.question.correctAnswer] The correct answer
 * @property {string} [params.question.correctAnswerPrepend] The label before the correct answer
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

    const resultList = createElement('ul', { classList: 'h5p-theme-results-list' });
    params.questions.forEach((question) => {
      const listItem = createElement('li', {
        classList: 'h5p-theme-results-list-item'
      });

      if(question.imgUrl) {
        listItem.appendChild(createElement(
          'div',
          { classList: 'h5p-theme-results-image' },
          { 'background-image': `url("${question.imgUrl}")` },
        ));
      }
      else if(question.useDefaultImg) {
        listItem.appendChild(createElement(
          'div',
          { classList: 'h5p-theme-results-image default-image' },
        ));
      }

      const questionContainer = createElement('div', {
        classList: 'h5p-theme-results-question-container'
      });
      questionContainer.appendChild(createElement('div', {
        classList: 'h5p-theme-results-question',
        textContent: question.title
      }));

      // UserAnswer might be an empty string
      if (typeof(question.userAnswer) === 'string') {
        const answerContainer = createElement('div', {
          classList: 'h5p-theme-results-answer'
        });

        const answer = createElement('span', {
          classList: 'h5p-theme-results-box-small h5p-theme-results-correct',
          textContent: question.userAnswer,
        });
        answerContainer.appendChild(answer);

        // isCorrect defined AND false
        if (question.isCorrect === false) {
          answer.classList.add('h5p-theme-results-incorrect');
          answer.classList.remove('h5p-theme-results-correct');

          if (question.correctAnswer) {
            const solutionContainer = createElement('span', {
              classList: 'h5p-theme-results-solution'
            });

            if (question.correctAnswerPrepend) {
              solutionContainer.appendChild(createElement('span', {
                classList: 'h5p-theme-results-solution-label',
                textContent: question.correctAnswerPrepend
              }));
            }

            solutionContainer.innerHTML += question.correctAnswer;

            answerContainer.appendChild(solutionContainer);
          }
        }

        questionContainer.appendChild(answerContainer);
      }

      listItem.appendChild(questionContainer);

      listItem.appendChild(createElement('div', {
        classList: 'h5p-theme-results-points',
        textContent: question.points
      }));

      resultList.appendChild(listItem);
    });

    listContainer.appendChild(resultList);
    resultScreen.appendChild(listContainer);

    container.appendChild(resultScreen);
    return resultScreen;
  }

  return ResultScreen;
})();