import FilmsList from '../view/films-list.js';
import EmptyFilmsList from '../view/films-list-empty.js';
import ExtraCommentedFilmsList from '../view/films-extra-commented.js';
import ExtraTopFilmList from '../view/films-extra-top.js';
import ShowMore from '../view/show-more.js';
import Sort from '../view/sort.js';
import { remove, render, RenderPosition } from '../render.js';
import FilmPresenter from './film-presenter.js';
import { updateItem } from '../utils.js';
import {MOVIE_COUNT_PER_STEP, SortType} from '../const.js';

export default class MainPresenter {
    #siteMain = null;
    #siteMoviesContainerElement = null;
    #movie = null;
    #sortComponent = new Sort();
    #containerComponent = new FilmsList();
    #emptyListComponent = new EmptyFilmsList();
    #extraTopComponent = new ExtraTopFilmList();
    #extraCommentedComponent = new ExtraCommentedFilmsList();
    #showMoreBtnComponent = new ShowMore();
    #filmPresenter = new Map();
    #currentSortType = SortType.DEFAULT;
    #renderedMovieCount = MOVIE_COUNT_PER_STEP;
    #sourcedMovies = [];

    #movies = [];

    constructor(siteMainElement) {
      this.#siteMain = siteMainElement;
      this.#siteMoviesContainerElement = this.#containerComponent.element.querySelector('.films-list__container');
    }

    init = (movies) => {
      this.#movies = [...movies];
      this.#sourcedMovies = [...movies];
      this.#renderSort();
      render(this.#siteMain, this.#containerComponent, RenderPosition.BEFOREEND);
      this.#renderCards();
      this.#renderEmptyFilmList();
      this.#renderShowMoreBtn();
      this.#renderExtraTop();
      this.#renderExtraCommented();
    }

    #sortMovies = (sortType) => {
      switch (sortType) {
        case SortType.DATE:
          this.#movies.sort((movieA, movieB) => {const result = movieA.date - movieB.date; return result;});
          break;
        case SortType.RATING:
          this.#movies.sort((movieA, movieB) => {const result = movieA.rating - movieB.rating; return result;});
          break;
        default:
          this.#movies = [...this.#sourcedMovies];
      }

      this.#currentSortType = sortType;
    }

    #handleSortTypeChange = (sortType) => {
      if (this.#currentSortType === sortType) {
        return;
      }
      this.#sortMovies(sortType);
      this.#clearMovieList();
      this.#renderCards();
      this.#renderShowMoreBtn();
    }

      #renderSort = () => {
        this.#sortComponent = new Sort(this.#currentSortType);
        render(this.#siteMain, this.#sortComponent, RenderPosition.BEFOREEND);
        this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
      }

      #clearMovieList = () => {
        this.#filmPresenter.forEach((presenter) => presenter.destroy());
        this.#filmPresenter.clear();
        this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
        remove(this.#showMoreBtnComponent);}

      #renderCards = () => {
        this.#movies.slice(0, 5).forEach((movie) => {
          const filmCardPresenter = new FilmPresenter(this.#handleMovieChange, this.#siteMoviesContainerElement, this.#handleModeChange);
          filmCardPresenter.init(movie);
          this.#filmPresenter.set(movie.id, filmCardPresenter);
        });
      }

    #renderEmptyFilmList = () => {
      if (this.#movies.length === 0) {
        render(this.#siteMain, this.#emptyListComponent, RenderPosition.BEFOREEND);
      }
    }

    #renderShowMoreBtn = () => {
      if (this.#movies.length > MOVIE_COUNT_PER_STEP) {
        let renderMovieCount = MOVIE_COUNT_PER_STEP;
        const showMoreBtnView = new ShowMore();
        this.#showMoreBtnComponent = showMoreBtnView;
        render(this.#siteMoviesContainerElement, showMoreBtnView, RenderPosition.AFTEREND);

        const showMoreButtton = document.querySelector('.films-list__show-more');

        showMoreBtnView.setClickHandler(() => {
          this.#movies
            .slice(renderMovieCount, renderMovieCount + MOVIE_COUNT_PER_STEP)
            .forEach((movie) => {
              const filmCardPresenter = new FilmPresenter(this.#handleMovieChange, this.#siteMoviesContainerElement, this.#handleModeChange);
              filmCardPresenter.init(movie);
              this.#filmPresenter.set(movie.id, filmCardPresenter);
            });

          renderMovieCount += MOVIE_COUNT_PER_STEP;

          if (renderMovieCount >= this.#movies.length) {
            showMoreButtton.remove();
          }
        });
      }
    }

    #renderExtraTop = () => { render(this.#siteMain, this.#extraTopComponent, RenderPosition.BEFOREEND); };
    #renderExtraCommented = () => { render(this.#siteMain, this.#extraCommentedComponent, RenderPosition.BEFOREEND); };
    #handleMovieChange = (updatedTask) => {
      this.#movies = updateItem(this.#movies, updatedTask);
      this.#sourcedMovies= updateItem(this.#sourcedMovies, updatedTask);
      this.#filmPresenter.get(updatedTask.id).init(updatedTask);
    }

    #handleModeChange = () => {
      this.#filmPresenter.forEach((presenter) => presenter.resetView());
    }
}
