import AbstractView from './abstract-view.js';
const createDescription = (description) => description.length > 140 ? `${description.slice(0, 139)}...` : description;
const createMovieCardTemplate = (movie) => {
  const {name, poster, description, rating, date, duration, genre, inWatchlist, isWatched, isFavorite, comments} = movie;
  const activeClassName = (status) => status ? 'film-card__controls-item--active': '';
  return `<article class="film-card">
<a class="film-card__link">
  <h3 class="film-card__title">${name}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${date}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre[0]}</span>
  </p>
  <img src=${poster} alt="" class="film-card__poster">
  <p class="film-card__description">${createDescription(description)}</p>
  <span class="film-card__comments">${comments.length} comments</span>
</a>
<div class="film-card__controls">
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist  ${activeClassName(inWatchlist)}" type="button">Add to watchlist</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${activeClassName(isWatched)}" type="button">Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite ${activeClassName(isFavorite)}" type="button">Mark as favorite</button>
</div>
</article>`;};
export default class FilmCard extends AbstractView {
  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createMovieCardTemplate(this.#movie);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }}
