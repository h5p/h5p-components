import styles from '!!raw-loader!../styles/h5p-input-radio.css';
// import '@brightspace-ui/core/components/inputs/input-radio.js';
// import '@brightspace-ui/core/components/inputs/input-radio-group.js';
import * as Utils from '../utils.js';

function InputRadio(params = {}) {
  const radioGroup = Utils.createElement('ul', {
    role: 'radiogroup',
    classList: 'h5p-answers',
  });

  const radios = [];

  params.items?.forEach((item) => {
    const radio = Utils.createElement('li', {
      id: item.id,
      role: 'radio',
      ariaChecked: 'false',
      tabindex: '0',
      classList: 'h5p-answer',
    });

    radios.push(radio);

    radio.addEventListener('click', (e) => {
      radio.setAttribute('aria-checked', true);
      radios.forEach((r) => {
        if (r !== radio) {
          r.setAttribute('aria-checked', false);
        }
      });
      params.onChange({ ...e, target: radio });
    });

    const alternativeContainer = Utils.createElement('div', {
      classList: 'h5p-alternative-container',
    });

    const alternativeInner = Utils.createElement('span', {
      classList: 'h5p-alternative-inner',
      innerHTML: `<div>${item.content}</div>`,
    });

    radioGroup.appendChild(radio);
    radio.appendChild(alternativeContainer);
    alternativeContainer.appendChild(alternativeInner);
  });

  let wrapper;

  if (params.encapsulated) {
    Utils.addHostStyling();
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);

    wrapper = document.createElement('div');
    const shadow = wrapper.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [sheet];

    shadow.appendChild(radioGroup);
  }

  return wrapper ?? radioGroup;
}

export default InputRadio;
