import { RenderPosition, renderElement } from './render.js';
import { generateMovie } from './mock/movie-card-generator.js';
import FilmCard from './view/film-card.js';
import ExtraCommentedFilmsList from './view/films-extra-commented.js';
import ExtraTopFilmList from './view/films-extra-top.js';
import EmptyFilmsList from './view/films-list-empty.js';
import FilmsList from './view/films-list.js';
import FooterStatistics from './view/footer-stats.js';
import MainNavigation from './view/main-navigation.js';
import Popup from './view/popup.js';
import Profile from './view/profile.js';
import ShowMore from './view/show-more.js';
import Sort from './view/sort.js';

const MOVIE_COUNT = 25;
const MOVIE_COUNT_PER_STEP = 5;

const movies = Array.from({length: MOVIE_COUNT}, generateMovie);
const counts = {
  all: movies.length,
  watchlist: movies.filter((movie) => movie.inWatchlist).length,
  history: movies.filter((movie) => movie.isWatched).length,
  favorite: movies.filter((movie) => movie.isFavorite).length,
};
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('header');
const siteFooterElement = document.querySelector('footer');

renderElement(siteHeaderElement, new Profile(counts.history), RenderPosition.BEFOREEND );
renderElement(siteMainElement, new MainNavigation(counts), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new Sort(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmsList(), RenderPosition.BEFOREEND);

const siteMoviesContainerElement = siteMainElement.querySelector('.films-list__container');
const renderPopup = (movie) => {
  const movieCardComponent = new FilmCard(movie);
  const moviePopupComponent = new Popup(movie);
  const closePopup = () => {
    document.body.removeChild(moviePopupComponent.element);
    document.body.classList.remove('hide-overflow');
  };

  const onKeyDownClosePopup = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopup();
      document.removeEventListener('keydown', onKeyDownClosePopup);
    }
  };

  renderElement(siteMoviesContainerElement, movieCardComponent, RenderPosition.BEFOREEND);
  movieCardComponent.setClickHandler(() => {
    document.body.appendChild(moviePopupComponent.element);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', onKeyDownClosePopup);
  });
  moviePopupComponent.setPopupCloseBtnHandler(() => {
    closePopup();
  });
};

for (let i = 0; i < Math.min(movies.length, MOVIE_COUNT_PER_STEP); i++) {
  renderPopup(movies[i]);
}

if (movies.length > MOVIE_COUNT_PER_STEP) {
  let renderMovieCount = MOVIE_COUNT_PER_STEP;
  const showMoreBtnView = new ShowMore();
  renderElement(siteMainElement, showMoreBtnView, RenderPosition.BEFOREEND);
  const showMoreButtton = siteMainElement.querySelector('.films-list__show-more');
  showMoreBtnView.setClickHandler(() => {

    movies
      .slice(renderMovieCount, renderMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => renderPopup(movie));

    renderMovieCount += MOVIE_COUNT_PER_STEP;

    if (renderMovieCount >= movies.length) {
      showMoreButtton.remove();
    }

  });
}
if (movies.length === 0) {
  renderElement(siteMainElement, new EmptyFilmsList(), RenderPosition.BEFOREEND);
}
renderElement(siteMainElement, new ExtraTopFilmList(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new ExtraCommentedFilmsList(), RenderPosition.BEFOREEND);
renderElement(siteFooterElement, new FooterStatistics(movies), RenderPosition.BEFOREEND);

