import { RenderPosition, render } from './render.js';
import { generateMovie } from './mock/movie-card-generator.js';
import MainPresenter from './presenter/main-presenter.js';

import FooterStatistics from './view/footer-stats.js';
import MainNavigation from './view/main-navigation.js';
import Profile from './view/profile.js';
import Sort from './view/sort.js';

const MOVIE_COUNT = 25;

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

render(siteHeaderElement, new Profile(counts.history), RenderPosition.BEFOREEND );
render(siteMainElement, new MainNavigation(counts), RenderPosition.BEFOREEND);
render(siteMainElement, new Sort(), RenderPosition.BEFOREEND);
const moviePresenter = new MainPresenter(siteMainElement);
moviePresenter.init(movies);
render(siteFooterElement, new FooterStatistics(movies), RenderPosition.BEFOREEND);

