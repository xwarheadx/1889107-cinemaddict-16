import {createElement} from '../render.js';

const createEmptyTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
  </section>`
);

export default class EmptyFilmsList {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createEmptyTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
