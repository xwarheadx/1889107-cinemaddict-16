import { createElement } from '../render.js';

const createUserNameButtonTemplate = (history) => {
  let rank = '';
  if (history > 0) {rank = 'Novice';}
  if (history > 10) {rank = 'Fan';}
  if (history > 20) {rank = 'Movie buff';}
  return `<section class="header__profile profile">
<p class="profile__rating">${rank}</p>
<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;};
export default class UserName {
  #history = null;
  #element = null;

  constructor(history) {
    this.#history = history;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createUserNameButtonTemplate(this.#history);
  }

  removeElement() {
    this.#element = null;
  }
}
