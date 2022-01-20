import { RenderPosition, renderElement } from './render.js';
import Statistic from './view/footer-stats.js';
import MainMenu from './view/menu.js';
import MovieCard from './view/movie-card.js';
import MovieTemplate from './view/movie-container.js';
import TopMovieTemplate from './view/movies-extra-top.js';
import ViewMovieTemplate from './view/movies-extra-view.js';
import Popup from './view/popup.js';
import ShowMore from './view/show-more.js';
import SortMenu from './view/sort.js';
import UserName from './view/user-name.js';
import { generateMovie } from './mock/movie-card-generator.js';

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

renderElement(siteHeaderElement, new UserName(counts.history).element, RenderPosition.BEFOREEND );
renderElement(siteMainElement, new MainMenu(counts).element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortMenu().element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, new MovieTemplate().element, RenderPosition.BEFOREEND);

const siteMoviesContainerElement = siteMainElement.querySelector('.films-list__container');
const renderPopup = (movie) => {
  const movieCardComponent = new MovieCard(movie).element;
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

renderElement(siteMainElement, new TopMovieTemplate().element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, new ViewMovieTemplate().element, RenderPosition.BEFOREEND);
renderElement(siteFooterElement, new Statistic(movies).element, RenderPosition.BEFOREEND);

