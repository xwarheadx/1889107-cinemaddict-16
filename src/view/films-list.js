import { createElement } from '../render.js';
const createMoviesContainerTemplate = () => (
  `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container">
    </div>
  </section>`
);
export default class MovieTemplate {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMoviesContainerTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
