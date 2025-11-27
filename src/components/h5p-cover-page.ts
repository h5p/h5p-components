import "../styles/h5p-cover-page.css";
import { createElement } from "../utils.js";
import H5PButton, { ButtonIcon } from "./h5p-button.ts";

/**
 * Parameters for cover page configuration
 */
interface CoverPageParams {
  title: string;
  description: string | null;
  img: string | null;
  imgAlt: string;
  useMediaContainer: boolean;
  buttonLabel: string;
  icon: ButtonIcon | null;
  buttonOnClick?: (event: MouseEvent) => void;
}
/**
 * Web Component for H5P Cover Page
 */
class H5PCoverPageComponent extends HTMLElement {
  
  connectedCallback() {
    this.render();
  }

  get params(): CoverPageParams {
    return {
      title: this.getAttribute("title") || "",
      description: this.getAttribute("description") || null,
      img: this.getAttribute("img") || null,
      imgAlt: this.getAttribute("img-alt") || "",
      useMediaContainer: this.hasAttribute("use-media-container"),
      buttonLabel: this.getAttribute("button-label") || "Start",
      icon: this.getAttribute("icon") as ButtonIcon | null,
      //for future fullproof implementation need to do something to handle the evennt listener
    };
  }

  render() {
    this.innerHTML = '';
    const coverPageElement = this.createCoverPage(this.params);
    this.appendChild(coverPageElement);
  }

  createCoverPage(params: CoverPageParams): HTMLElement {
   let coverPageClasses = 'h5p-theme-cover-page';

  if (params.useMediaContainer || params.img) {
    coverPageClasses += ' h5p-theme-cover-page-with-image';
  }

  const coverPage = createElement('div', {
    classList: coverPageClasses,
  });

  coverPage.appendChild(createElement('div', {
    classList: 'h5p-theme-pattern-container',
    innerHTML: '<div class="h5p-theme-pattern"></div>',
  }));

  if (params.useMediaContainer) {
    coverPage.appendChild(createElement('div', {
      classList: 'h5p-theme-cover-img',
    }));
  }
  else if (params.img) {
    coverPage.appendChild(createElement('img', {
      src: params.img,
      alt: params.imgAlt ?? '',
      classList: 'h5p-theme-cover-img',
    }));
  }

  const detailContainer = createElement('div', { classList: 'h5p-theme-cover-details' });

  if (params.icon) {
    detailContainer.appendChild(createElement('span', {
      classList: `h5p-theme-cover-icon h5p-theme-${params.icon}`,
      ariaHidden: true,
    }));
  }

  detailContainer.appendChild(createElement('h2', {
    textContent: params.title,
  }));

  if (params.description) {
    detailContainer.appendChild(createElement('p', {
      classList: 'h5p-theme-cover-description',
      innerHTML: params.description,
    }));
  }

  detailContainer.appendChild(H5PButton({
    label: params.buttonLabel,
    icon: params.icon,
    onClick: params.buttonOnClick
  }));

  coverPage.appendChild(detailContainer);

  return coverPage;
  }
}

customElements.define('h5p-cover-page', H5PCoverPageComponent);

/**
 * Original function for backwards compatibility
 */
function H5PCoverPage(params: CoverPageParams): HTMLElement {
  const element = new H5PCoverPageComponent().createCoverPage(params);
  return element;
}
export default H5PCoverPage;