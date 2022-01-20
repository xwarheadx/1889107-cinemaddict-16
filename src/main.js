import { RenderPosition, renderElement } from './render.js';
import { generateMovie } from './mock/movie-card-generator.js';
import FilmCard from './view/film-card.js';
import ExtraCommentedFilmsList from './view/films-extra-commented.js';
import ExtraTopFilmList from './view/films-extra-top.js';
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

renderElement(siteHeaderElement, new Profile(counts.history).element, RenderPosition.BEFOREEND );
renderElement(siteMainElement, new MainNavigation(counts).element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, new Sort().element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmsList().element, RenderPosition.BEFOREEND);

const siteMoviesContainerElement = siteMainElement.querySelector('.films-list__container');
const renderPopup = (movie) => {
  const movieCardComponent = new FilmCard(movie).element;
  const moviePopupComponent = new Popup(movie).element;

  renderElement(siteMoviesContainerElement, movieCardComponent, RenderPosition.BEFOREEND);
  movieCardComponent.addEventListener('click', () => {
    document.body.appendChild(moviePopupComponent);
    document.body.classList.add('hide-overflow');
  });
  moviePopupComponent.querySelector('.film-details__close-btn').addEventListener('click', () => {
    document.body.removeChild(moviePopupComponent);
    document.body.classList.remove('hide-overflow');
  });
};

for (let i = 0; i < Math.min(movies.length, MOVIE_COUNT_PER_STEP); i++) {
  renderPopup(movies[i]);
}

if (movies.length > MOVIE_COUNT_PER_STEP) {
  let renderMovieCount = MOVIE_COUNT_PER_STEP;

  renderElement(siteMainElement, new ShowMore().element, RenderPosition.BEFOREEND);
  const showMoreButtton = siteMainElement.querySelector('.films-list__show-more');
  showMoreButtton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movies
      .slice(renderMovieCount, renderMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => renderPopup(movie));

    renderMovieCount += MOVIE_COUNT_PER_STEP;

    if (renderMovieCount >= movies.length) {
      showMoreButtton.remove();
    }

  });
}

renderElement(siteMainElement, new ExtraTopFilmList().element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, new ExtraCommentedFilmsList().element, RenderPosition.BEFOREEND);
renderElement(siteFooterElement, new FooterStatistics(movies).element, RenderPosition.BEFOREEND);

