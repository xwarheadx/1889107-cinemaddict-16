import { getRandomInteger } from './utils.js';
import { generateComment } from './comments-generator.js';
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, conctetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, Purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
];
const MOVIE_TITLES = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor'
];
const GENRES = [
  'Action',
  'Drama',
  'Film-Noir',
  'Mystery',
  'Cartoon',
  'Comedy',
  'Musical',
  'Western',
];
const POSTERS = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
];
const AGE_RATING = [
  '0+',
  '6+',
  '12+',
  '16+',
  '18+'];
const COUNTRIES = [
  'United States',
  'China',
  'Australia',
  'France',
  'Canada',
  'Germany',
  'United Kingdom'];
const DIRECTORS = [
  'Alfred Hitchcock',
  'Anthony Mann',
  'Steven Spielberg',
  'George Lucas',
  'Robert Zemeckis',
  'Jeffrey Jacob Abrams',
  'Martin Scorsese',
  'Francis Ford Coppola'
];
const WRITERS = [
  'Anne Wigton',
  'Heinz Herald',
  'Richard Weil',
  'Jeffrey Jacob Abrams',
  'Bob Gale',
  'Edgar Wright',
  'Michael Mann',
  'Art Linson'
];
const ACTORS = [
  'Al Pacino',
  'Robert De Niro',
  'Tom Sizemore',
  'Tom Cruise',
  'Nicole Kidman',
  'Frances McDormand',
  'William H. Macy',
  'Steve Buscemi',
  'Billy Bob Thornton',
  'Martin Freeman',
  'Kirsten Dunst',
  'Patrick Wilson'
];
export const getRandomArray = (list) => {
  const elements = [];
  while (elements.length <= getRandomInteger(0, list.length)) {
    const randomNumber = getRandomInteger(0, list.length - 1);
    if (elements.indexOf(list[randomNumber]) === -1) {
      elements.push(list[randomNumber]);
    }
  }
  return elements;
};

export const generateMovie = () => ({
  name: MOVIE_TITLES[getRandomInteger(0, MOVIE_TITLES.length-1)],
  poster: POSTERS[getRandomInteger(0, POSTERS.length-1)],
  rating: `${getRandomInteger(1, 9)}.${getRandomInteger(0, 9)}`,
  director: DIRECTORS[getRandomInteger(0, DIRECTORS.length-1)],
  writer: getRandomArray(WRITERS),
  actor: getRandomArray(ACTORS),
  country: getRandomArray(COUNTRIES),
  genre: getRandomArray(GENRES),
  ageRating: AGE_RATING[getRandomInteger(0, AGE_RATING.length-1)],
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length-1)],
  duration: `${getRandomInteger(1, 3)}h ${getRandomInteger(1, 59)}m`,
  date: `${getRandomInteger(1931, 2020)}`,
  comments: (Array.from({length: getRandomInteger(1,10)}, generateComment)),
  inWatchlist: (Boolean(getRandomInteger(0, 1))),
  isWatched: Boolean(getRandomInteger(0, 1)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
});
