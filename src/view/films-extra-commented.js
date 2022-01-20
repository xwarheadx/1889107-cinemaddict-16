import { createElement } from '../render.js';
const createExtraViewMoviesTemplate = () => (`<section class="films-list films-list--extra-commented">
<h2 class="films-list__title">Most commented</h2>

<div class="films-list__container">
  <article class="film-card">
  </article>

  <article class="film-card">
  </article>
</div>
</section>
</section>`);
export default class ExtraCommentedFilmsList {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createExtraViewMoviesTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
