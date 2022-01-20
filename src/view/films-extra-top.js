import AbstractView from './abstract-view.js';

const createExtraTopMoviesTemplate = () => (`<section class="films-list films-list--extra-top">
<h2 class="films-list__title">Top rated</h2>

<div class="films-list__container">
  <article class="film-card">
  </article>
  <article class="film-card">
  </article>
</div>
</section>
`);
export default class ExtraTopFilmList extends AbstractView {
  get template() {
    return createExtraTopMoviesTemplate();
  }
}

