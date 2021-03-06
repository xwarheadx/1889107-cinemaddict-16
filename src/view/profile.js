import AbstractView from './abstract-view.js';

const createUserNameButtonTemplate = (history) => {
  let rank = '';
  if (history > 0) {rank = 'Novice';}
  if (history > 10) {rank = 'Fan';}
  if (history > 20) {rank = 'Movie buff';}
  return `<section class="header__profile profile">
<p class="profile__rating">${rank}</p>
<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;};
export default class Profile extends AbstractView {
  #history = null;

  constructor(history) {
    super();
    this.#history = history;
  }

  get template() {
    return createUserNameButtonTemplate(this.#history);
  }
}
