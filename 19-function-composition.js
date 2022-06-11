import * as R from 'ramda';

const sentence =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

const wordList = R.split(' ', sentence);
console.log(wordList);

const countWords = R.compose(R.length, R.split);
console.log(countWords(' ', sentence));

// All ramda functions are curriable
const countWords2 = R.compose(R.length, R.split(' '));
console.log(countWords2(sentence));

const countWords3 = R.pipe(R.split(' '), R.length);
console.log(countWords3(sentence));
