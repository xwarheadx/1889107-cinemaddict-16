import { getRandomInteger } from '../utils.js';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
const generateCommentDate = () => {
  const totalDate = 30;
  const daysStep = getRandomInteger(0, -totalDate);

  return dayjs().add(daysStep, 'day');
};
const EMOTIONS = [
  './images/emoji/smile.png',
  './images/emoji/sleeping.png',
  './images/emoji/puke.png',
  './images/emoji/angry.png'];
const COMMENTS = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
  'Amazing movie'];
const AUTHORS = [
  'Ivan',
  'John Doe',
  'Tim Macoveev'];

export const generateComment = () => (
  {
    id: nanoid(),
    author: AUTHORS[getRandomInteger(0, AUTHORS.length-1)],
    emotion: EMOTIONS[getRandomInteger(0, EMOTIONS.length-1)],
    text: COMMENTS[getRandomInteger(0, COMMENTS.length-1)],
    date: generateCommentDate(),
  }
);
