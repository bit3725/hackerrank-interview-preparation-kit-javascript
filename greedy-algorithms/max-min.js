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

// Complete the maxMin function below.
function maxMin(k, arr) {
  const arrLength = arr.length;
  const sortedArr = arr.sort((a, b) => a - b);
  let minimum = Number.MAX_VALUE;
  for (let i = k - 1; i < arrLength; i += 1) {
    const unfairness = sortedArr[i] - sortedArr[i - k + 1];
    if (unfairness < minimum) {
      minimum = unfairness;
    }
  }
  return minimum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const k = parseInt(readLine(), 10);

    let arr = [];

    for (let i = 0; i < n; i++) {
        const arrItem = parseInt(readLine(), 10);
        arr.push(arrItem);
    }

    const result = maxMin(k, arr);

    ws.write(result + '\n');

    ws.end();
}
