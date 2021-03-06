import AbstractView from './abstract-view.js';
const createShowMoreButtonTemplate = () => ('<button class="films-list__show-more">Show more</button>');
export default class ShowMore extends AbstractView {
  get template() {
    return createShowMoreButtonTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }
}
