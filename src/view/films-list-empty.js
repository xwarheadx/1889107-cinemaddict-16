import AbstractView from './abstract-view.js';

const createEmptyTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
  </section>`
);

export default class EmptyFilmsList extends AbstractView {
  get template() {
    return createEmptyTemplate();
  }
}
