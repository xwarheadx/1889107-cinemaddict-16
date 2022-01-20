import AbstractView from './abstract-view.js';
const createSiteMenuTemplate = (filterCounts) => (
  `<nav class="main-navigation">
      <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filterCounts.watchlist}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filterCounts.history}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filterCounts.favorite}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
);
export default class MainNavigation extends AbstractView {
  #filterCounts = null;

  constructor(filterCounts) {
    super();
    this.#filterCounts = filterCounts;
  }

  get template() {
    return createSiteMenuTemplate(this.#filterCounts);
  }
}
