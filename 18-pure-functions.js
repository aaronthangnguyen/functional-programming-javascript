import * as R from 'ramda';

const greet = R.curry((greeting, firstName) => `${greeting} ${firstName}`);

const morningGreeting = greet('Good morning');
console.log(morningGreeting('Aaron'));
