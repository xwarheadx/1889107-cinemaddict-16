import FilmCard from '../view/film-card.js';
import Popup from '../view/popup.js';
import {replace, remove, render, RenderPosition} from '../render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED: 'OPENED',
};

export default class cardPresenter {
  #movie = null;
  #changeData = null;
  #movieContainer = null;
  #movieCardComponent = null;
  #moviePopupComponent = null;
  #modeChange = null;
  #mode = Mode.DEFAULT
  #siteBody = document.querySelector('body');

  constructor(changeData, movieCardContainer, changeMode) {
    this.#changeData = changeData;
    this.#movieContainer = movieCardContainer;
    this.#modeChange = changeMode;
  }

  init = (movie) => {
    this.#movie = movie;
    const prevMovieCardComponent = this.#movieCardComponent;
    const prevMoviePopupComponent = this.#moviePopupComponent;
    this.#movieCardComponent = new FilmCard(movie);
    this.#moviePopupComponent = new Popup(movie);

    this.#moviePopupComponent.setPopupCloseBtnHandler(() => {
      this.#closePopup();
    });

    this.#movieCardComponent.setClickHandler(() => {
      this.#renderPopup ();
      document.addEventListener('keydown', this.#onKeyDownClosePopup);
    });

    this.#movieCardComponent.setWatchlistAddedClickHandler(this.#handleWatchlistAddedClick);
    this.#movieCardComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#movieCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#moviePopupComponent.setWatchlistAddedClickHandler(this.#handleWatchlistAddedClick);
    this.#moviePopupComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#moviePopupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevMovieCardComponent === null || prevMoviePopupComponent === null) {
      render(this.#movieContainer, this.#movieCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#movieCardComponent, prevMovieCardComponent);
    }

    if (this.#mode === Mode.OPENED) {
      replace(this.#moviePopupComponent, prevMoviePopupComponent);
      replace(this.#movieCardComponent, prevMovieCardComponent);
    }

    remove(prevMovieCardComponent);
    remove(prevMoviePopupComponent);
  }

  #closePopup = () => {
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onKeyDownClosePopup);
    this.#mode = Mode.DEFAULT;
    this.init(this.#movie);
  }

  #onKeyDownClosePopup = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#onKeyDownClosePopup);
    }
  };

  #handleWatchlistAddedClick = () => {
    const scrollHeight = this.#moviePopupComponent.element.scrollTop;
    this.#changeData({...this.#movie, inWatchlist: !this.#movie.inWatchlist});
    this.#moviePopupComponent.element.scrollTo(0, scrollHeight);
  }

  #handleWatchedClick = () => {
    const scrollHeight = this.#moviePopupComponent.element.scrollTop;
    this.#changeData({...this.#movie, isWatched: !this.#movie.isWatched});
    this.#moviePopupComponent.element.scrollTo(0, scrollHeight);
  }

  #handleFavoriteClick = () => {
    const scrollHeight = this.#moviePopupComponent.element.scrollTop;
    this.#changeData({...this.#movie, isFavorite: !this.#movie.isFavorite});
    this.#moviePopupComponent.element.scrollTo(0, scrollHeight);
  }

  destroy = () => {
    remove(this.#movieCardComponent);
    remove(this.#moviePopupComponent);
  }

  #renderPopup = () => {
    this.#siteBody.appendChild(this.#moviePopupComponent.element);
    this.#modeChange();
    this.#mode = Mode.OPENED;
    document.body.classList.add('hide-overflow');
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#moviePopupComponent.reset(this.#movie);
      this.#closePopup();
    }
  }
}
