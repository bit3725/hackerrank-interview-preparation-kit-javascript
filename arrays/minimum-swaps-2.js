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

// Complete the minimumSwaps function below.
function minimumSwaps(arr) {
  let sum = 0;
  const checked = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (checked[i]) {
      continue;
    }
    let next = i;
    while (!checked[next]) {
      checked[next] = true;
      if (arr[next] != next + 1) {
        next = arr[next] - 1;
        if (!checked[next]) {
          sum += 1;
        }
      }
    }
    if (sum == arr.length - 1) {
      break;
    }
  }
  return sum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr);

    ws.write(res + '\n');

    ws.end();
}
