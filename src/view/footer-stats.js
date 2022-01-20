import { createElement } from '../render.js';
const createFooterStatisticTemplate = (movies) => (
  `<section class="footer__statistics">
      <p>${movies.length} movies inside</p>
    </section>`
);
export default class FooterStatistics {
  #element = null;
  #movies = null;
  constructor(movies) {
    this.#movies = movies;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFooterStatisticTemplate(this.#movies);
  }

  removeElement() {
    this.#element = null;
  }
}
