import AbstractView from './abstract-view.js';

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
export default class ExtraCommentedFilmsList extends AbstractView {
  get template() {
    return createExtraViewMoviesTemplate();
  }
}
