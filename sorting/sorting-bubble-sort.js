'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the countSwaps function below.
function countSwaps(a) {
  const length = a.length;
  let swapTimes = 0
  for (let i = 0; i < length; i += 1) {
    for (let j = 0; j < length - 1; j += 1) {
      if (a[j] > a[j + 1]) {
        swapTimes += 1;
        a[j] += a[j + 1];
        a[j + 1] = a[j] - a[j + 1];
        a[j] = a[j] - a[j + 1];
      }
    }
  }
  console.log(`Array is sorted in ${swapTimes} swaps.`);
  console.log(`First Element: ${a[0]}`);
  console.log(`Last Element: ${a[length - 1]}`);
}

function main() {
    const n = parseInt(readLine(), 10);

    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    countSwaps(a);
}
