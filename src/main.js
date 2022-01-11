import { renderPosition, renderTemplate } from './render.js';
import { createSiteMenuTemplate } from './view/menu.js';
import { createMovieCardTemplate } from './view/movie-card.js';
import { createUserNameButtonTemplate } from './view/user-name.js';
import { createSortTemplate } from './view/sort.js';
import { createShowMoreButtonTemplate } from './view/show-more.js';
import { createFooterStatisticTemplate } from './view/footer-stats.js';
import { createExtraTopMoviesTemplate } from './view/movies-extra-top.js';
import { createExtraViewMoviesTemplate } from './view/movies-extra-view.js';
import { createMoviesContainerTemplate} from './view/movie-container.js';
import { createPopupTemplate } from './view/popup.js';
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

renderTemplate(siteHeaderElement, createUserNameButtonTemplate(counts.history), renderPosition.BEFOREEND );
renderTemplate(siteMainElement, createSiteMenuTemplate(counts), renderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSortTemplate(), renderPosition.BEFOREEND);
renderTemplate(siteMainElement, createMoviesContainerTemplate(), renderPosition.BEFOREEND);

const siteMoviesContainerElement = siteMainElement.querySelector('.films-list__container');
for (let i = 0; i < Math.min(movies.length, MOVIE_COUNT_PER_STEP); i++) {
  renderTemplate(siteMoviesContainerElement, createMovieCardTemplate(movies[i]), renderPosition.BEFOREEND);
}

if (movies.length > MOVIE_COUNT_PER_STEP) {
  let renderMovieCount = MOVIE_COUNT_PER_STEP;

  renderTemplate(siteMainElement, createShowMoreButtonTemplate(), renderPosition.BEFOREEND);
  const showMoreButtton = siteMainElement.querySelector('.films-list__show-more');
  showMoreButtton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movies
      .slice(renderMovieCount, renderMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => renderTemplate(siteMoviesContainerElement, createMovieCardTemplate(movie), renderPosition.BEFOREEND));

    renderMovieCount += MOVIE_COUNT_PER_STEP;

    if (renderMovieCount >= movies.length) {
      showMoreButtton.remove();
    }

  });
}

renderTemplate(siteMainElement, createExtraTopMoviesTemplate(), renderPosition.BEFOREEND);
renderTemplate(siteMainElement, createExtraViewMoviesTemplate(), renderPosition.BEFOREEND);
renderTemplate(siteFooterElement, createFooterStatisticTemplate(movies), renderPosition.BEFOREEND);
renderTemplate(siteFooterElement, createPopupTemplate(movies[1]), renderPosition.BEFOREEND);
