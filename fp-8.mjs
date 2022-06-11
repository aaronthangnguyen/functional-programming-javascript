import { expect } from 'expect';
import * as R from 'ramda';

const sentence =
  'PechaKucha is a presentation style in which 20 slides are shown for 20 seconds each (6 minutes and 40 seconds in total).';

const isNumber = value => Number.isInteger(value);

const numbersInString = R.compose(
  R.count(isNumber),
  R.map(parseInt),
  R.split('')
);

console.log(numbersInString(sentence));
expect(numbersInString(sentence)).toBe(7);

console.log('If you see this printed in the console, the test passed!');
