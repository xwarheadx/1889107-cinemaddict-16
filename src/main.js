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

const MOVIE_COUNT = 5;

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('header');
const siteFooterElement = document.querySelector('footer');

renderTemplate(siteHeaderElement, createUserNameButtonTemplate(), renderPosition.BEFOREEND );
renderTemplate(siteMainElement, createSiteMenuTemplate(), renderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSortTemplate(), renderPosition.BEFOREEND);
renderTemplate(siteMainElement, createMoviesContainerTemplate(), renderPosition.BEFOREEND);
const siteFilmsContainerElement = siteMainElement.querySelector('.films-list .films-list__container');
for (let i = 0; i < MOVIE_COUNT; i++) {
  renderTemplate(siteFilmsContainerElement, createMovieCardTemplate(), renderPosition.BEFOREEND);
}
renderTemplate(siteMainElement, createShowMoreButtonTemplate(), renderPosition.BEFOREEND);
renderTemplate(siteMainElement, createExtraTopMoviesTemplate(), renderPosition.BEFOREEND);
renderTemplate(siteMainElement, createExtraViewMoviesTemplate(), renderPosition.BEFOREEND);
renderTemplate(siteFooterElement, createFooterStatisticTemplate(), renderPosition.BEFOREEND);
