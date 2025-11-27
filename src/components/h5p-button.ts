import '../styles/h5p-button.css';
import * as Utils from '../utils.js';

/** Maximum number of lines for label before hiding it */
const MAX_LABEL_LINE_COUNT = 1;

/** Maximum width ratio between label and button before hiding label */
const MAX_LABEL_WIDTH_RATIO = 0.85;

/**
 * Button style types
 */
type ButtonStyleType = 'primary' | 'secondary' | 'nav';

/**
 * Available button icons
 */
export type ButtonIcon = 
  | 'check'
  | 'retry' 
  | 'done'
  | 'show-results'
  | 'book'
  | 'flip'
  | 'next'
  | 'previous'
  | 'show-solutions';

/**
 * Parameters for button configuration
 */
interface ButtonParams {
  label?: string;
  ariaLabel?: string;
  tooltip?: string;
  styleType?: ButtonStyleType;
  icon?: ButtonIcon;
  classes?: string;
  onClick?: (event: MouseEvent) => void;
  buttonType?: string;
  disabled?: boolean;
  tooltipPosition?: string;
}

/**
 * Web Component for H5P Button (no Shadow DOM)
 */
class H5PButtonComponent extends HTMLElement {

   connectedCallback() {
    this.render();
  }

  get params(): ButtonParams {
    return {
      label: this.getAttribute("label") || undefined,
      ariaLabel: this.getAttribute("aria-label") || undefined,
      tooltip: this.getAttribute("tooltip") || undefined,
      styleType: (this.getAttribute("style-type") as ButtonStyleType) || 'primary',
      icon: (this.getAttribute("icon") as ButtonIcon) || undefined,
      classes: this.getAttribute("classes") || undefined,
      buttonType: this.getAttribute("button-type") || 'button',
      disabled: this.hasAttribute("disabled"),
      tooltipPosition: this.getAttribute("tooltip-position") || 'top',
      onClick: (event: MouseEvent) => {
        //for future fullproof implementation need to do something to handle the evennt listener
      }
    };
  }
  render() {
    this.innerHTML = '';
    const buttonElement = this.createButton(this.params);
    this.appendChild(buttonElement);
  }

  createButton(params: ButtonParams): HTMLElement {
    let buttonStyleType = 'h5p-theme-primary-cta';
  
    if (params.styleType === 'secondary') {
      buttonStyleType = 'h5p-theme-secondary-cta';
    }
    else if (params.styleType === 'nav') {
      buttonStyleType = 'h5p-theme-nav-button';
    }
  
    let tooltip;
    if (params.icon) {
      buttonStyleType += ` h5p-theme-${params.icon}`;
      tooltip = params.tooltip ?? params.label;
    }
  
    const button = Utils.createElement('button', {
      innerHTML: params.label ? `<span class="h5p-theme-label">${params.label}</span>` : '',
      ariaLabel: Utils.parseString(params.ariaLabel ?? params.label),
      classList: params.classes ? `${buttonStyleType} ${params.classes}` : buttonStyleType,
      onclick: params.onClick,
      type: params.buttonType ?? 'button',
      disabled: params.disabled ?? false,
    });
  
     if (tooltip && (H5P as any).Tooltip) {
      (H5P as any).Tooltip(button, { 
        text: tooltip, 
        position: params.tooltipPosition ?? 'top' 
      });
    }
  
    if (params.icon) {
      this.IconOnlyObserver.observe(button);
    }
  
    return button;
  }

  IconOnlyObserver = new ResizeObserver((entries) => {
  Utils.debounce(() => {
    for (const entry of entries) {
      const button = entry.target as HTMLElement;
      if (!button.isConnected || button.matches(':hover')) {
        continue;
      }

      const label = button.querySelector('.h5p-theme-label') as HTMLElement;
      const lineCount = Utils.computeLineCount(label);
      if (!lineCount) {
        continue;
      }

      const ratio = Utils.computeWidthRatio(label, button);
      const shouldHide = lineCount > MAX_LABEL_LINE_COUNT || ratio > MAX_LABEL_WIDTH_RATIO;

      // For visual consistency, label of related buttons should be hidden as well if one is hidden
      const parent = button.parentElement;
      for (const child of parent.children) {
        if (!(child instanceof HTMLButtonElement) || !child.isConnected) {
          continue;
        }
        child.classList.toggle('icon-only', shouldHide);
      }
    }
  });
 });
}

customElements.define('h5p-button', H5PButtonComponent);

/**
 * Original function for backwards compatibility
 */
function H5PButton(params: ButtonParams): HTMLElement {
  debugger;
  const element = new H5PButtonComponent().createButton(params);
  return element;
}
export default H5PButton;