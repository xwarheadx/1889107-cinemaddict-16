import AbstractView from './abstract-view.js';

const createFooterStatisticTemplate = (movies) => (
  `<section class="footer__statistics">
      <p>${movies.length} movies inside</p>
    </section>`
);
export default class FooterStatistics extends AbstractView {
  #movies = null;
  constructor(movies) {
    super();
    this.#movies = movies;
  }

  get template() {
    return createFooterStatisticTemplate(this.#movies);
  }
}
