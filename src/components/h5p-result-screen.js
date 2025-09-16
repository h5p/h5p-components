// eslint-disable-next-line no-use-before-define, no-var
var H5P = H5P || {};
H5P.Components = H5P.Components || {};

H5P.Components.ResultScreen = (function () {
  /**
   * @typedef ResultQuestion
   * @type {object}
   * @property {[string]} imgUrl The url to an image to display before the question
   * @property {[boolean]} useDefaultImg Use a default image. Will be overwritten by imgUrl
   * @property {string} title The textual description of the question
   * @property {string} points The score of the question
   * @property {[boolean]} isCorrect If the answer is considered correct (Some content types are more lenient)
   * @property {[string]} userAnswer What the user answered
   * @property {[string]} correctAnswer The correct answer
   * @property {[string]} correctAnswerPrepend The label before the correct answer
   */

  /**
   * @typedef ResultQuestionGroup
   * @type {object}
   * @property {[string[]]} listHeaders The table headers
   * @property {ResultQuestion[]} questions The list of tasks to be summarized
   */

  /**
   * @typedef ResultScreenParams
   * @type {object}
   * @property {string} header The main header of the result screen
   * @property {string} scoreHeader The header detailing the total score
   * @property {ResultQuestionGroup[]} questionGroups The groups of questions
   */

  /**
   * Create a result screen, summing up the tasks of the content and the scores achieved
   * @param {ResultScreenParams} params A set of parameters to configure the ResultScreen component.
   * @returns {HTMLElement} The result screen element.
   */
  function ResultScreen(params) {
    const { createElement } = H5P.Components.utils;
    // Create main wrapper
    const resultScreen = createElement('div', { classList: 'h5p-theme-result-screen' });

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
    params.questionGroups.forEach((group) => {

      const groupContainer = createElement('div', {
        classList: 'h5p-theme-results-list-container',
      });

      if (group.listHeaders) {
        const listHeaders = createElement('div', { classList: 'h5p-theme-results-list-heading' });
        group.listHeaders.forEach(title => {
          listHeaders.appendChild(createElement('div', { classList: 'heading-item', textContent: title }));
        });
        groupContainer.appendChild(listHeaders);
      }

      const resultList = createElement('ul', { classList: 'h5p-theme-results-list' });

      group.questions.forEach((question) => {
        resultList.appendChild(createQuestion(question));
      });

      groupContainer.appendChild(resultList);
      resultScreen.appendChild(groupContainer);
    });

    return resultScreen;
  }

  const createQuestion = (question) => {
    const { createElement } = H5P.Components.utils;

    const listItem = createElement('li', {
      classList: 'h5p-theme-results-list-item',
    });

    if (question.imgUrl) {
      listItem.appendChild(createElement(
        'div',
        { classList: 'h5p-theme-results-image' },
        { 'background-image': `url("${question.imgUrl}")` },
      ));
    }
    else if (question.useDefaultImg) {
      listItem.appendChild(createElement(
        'div',
        { classList: 'h5p-theme-results-image default-image' },
      ));
    }

    const questionContainer = createElement('div', {
      classList: 'h5p-theme-results-question-container',
    });

    questionContainer.appendChild(createElement('div', {
      classList: 'h5p-theme-results-question',
      innerHTML: question.title,
    }));

    // UserAnswer might be an empty string
    if (typeof(question.userAnswer) === 'string') {
      const answerContainer = createElement('div', {
        classList: 'h5p-theme-results-answer',
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
            classList: 'h5p-theme-results-solution',
          });

          if (question.correctAnswerPrepend) {
            solutionContainer.appendChild(createElement('span', {
              classList: 'h5p-theme-results-solution-label',
              textContent: question.correctAnswerPrepend,
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
      innerHTML: question.points,
    }));

    return listItem;
  };

  return ResultScreen;
})();
