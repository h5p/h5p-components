// eslint-disable-next-line no-use-before-define, no-var
var H5P = H5P || {};
H5P.Components = H5P.Components || {};

H5P.Components.ResultScreen = (function selfInvokeInit() {
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
    } else if (question.useDefaultImg) {
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
    if (typeof (question.userAnswer) === 'string') {
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

  /**
   * Create a result screen, summing up the tasks of the content and the scores achieved
   * @param {string} params.header The main header of the result screen
   * @param {string} params.scoreHeader The header detailing the total score
   *
   * @param {[Object]} params.questionGroups The groups of questions
   * @property {[string]} [params.questionGroups.listHeaders] The table headers
   * @property {[Object]} params.questionGroups.questions The list of tasks to be summarized
   * @property {string} [params.questionGroups.questions.imgUrl] The url to an image to display
   * before the question
   * @property {boolean} [params.questionGroups.question.useDefaultImg] Use a default image.
   * Will be overwritten by imgUrl
   * @property {string} params.questionGroups.questions.title The textual description of
   * the question
   * @property {string} params.questionGroups.questions.points The score of the question
   * @property {boolean} [params.questionGroups.question.isCorrect] If the answer is considered
   * correct (Some content types are more lenient)
   * @property {string} [params.questionGroups.question.userAnswer] What the user answered
   * @property {string} [params.questionGroups.question.correctAnswer] The correct answer
   * @property {string} [params.questionGroups.question.correctAnswerPrepend] The label before the
   * correct answer
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
        group.listHeaders.forEach((title) => {
          listHeaders.appendChild(createElement('h3', { textContent: title }));
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

  return ResultScreen;
}());
