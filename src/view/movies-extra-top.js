import { createElement } from '../render.js';
const createExtraTopMoviesTemplate = () => (`<section class="films-list films-list--extra">
<h2 class="films-list__title">Top rated</h2>

<div class="films-list__container">
  <article class="film-card">
  </article>
  <article class="film-card">
  </article>
</div>
</section>
`);
export default class TopMovieTemplate {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createExtraTopMoviesTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

