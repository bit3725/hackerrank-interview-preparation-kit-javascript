'use strict';

const fs = require('fs');

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

// Complete the minimumAbsoluteDifference function below.
function minimumAbsoluteDifference(arr) {
  let minimum = Number.MAX_VALUE;
  const arrLength = arr.length;
  const sortedArr = arr.sort((a, b) => a - b);
  for (let i = 1; i < arrLength; i += 1) {
    const currentAbsoluteDifference = Math.abs(arr[i - 1] - arr[i]);
    if (currentAbsoluteDifference < minimum) {
      minimum = currentAbsoluteDifference;
    }
    if (minimum === 0) {
      return minimum;
    }
  }
  return minimum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = minimumAbsoluteDifference(arr);

    ws.write(result + '\n');

    ws.end();
}
