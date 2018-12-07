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

// Complete the candies function below.
function candies(n, arr) {
  let sum = 1;
  let currentCandies = 1;
  let candiesArray = [1];
  for (let i = 1; i < n; i++) {
    const current = arr[i];
    const prev = arr[i - 1];
    if (current > prev) {
      currentCandies += 1;
    } else {
      currentCandies = 1;
    }
    candiesArray.push(currentCandies);
    sum += currentCandies;
  }
  currentCandies = 1;
  for (let i = n - 2; i >= 0; i--) {
    const current = arr[i];
    const prev = arr[i + 1];
    if (current > prev) {
      currentCandies += 1;
    } else {
      currentCandies = 1;
    }
    if (currentCandies > candiesArray[i]) {
      sum += currentCandies - candiesArray[i];
    }
  }
  return sum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let arr = [];

    for (let i = 0; i < n; i++) {
        const arrItem = parseInt(readLine(), 10);
        arr.push(arrItem);
    }

    const result = candies(n, arr);

    ws.write(result + '\n');

    ws.end();
}
