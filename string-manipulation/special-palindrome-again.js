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

// Complete the substrCount function below.
function substrCount(n, s) {
  let total = n;
  for (let i = 0; i < n; i += 1) {
    const current = s.charAt(i);
    let currentRepeat = 1;
    let j = i + 1;
    while (j < n) {
      if (s.charAt(j) === current) {
        total += 1;
        currentRepeat += 1;
        j += 1;
      } else {
        break;
      }
    }
    j = j + 1;
    while (j < n) {
      if (s.charAt(j) === current) {
        currentRepeat -= 1;
        j += 1;
        if (currentRepeat === 0) {
          total += 1;
          break;
        }
      } else {
        break;
      }
    }
  }
  return total;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    const result = substrCount(n, s);

    ws.write(result + '\n');

    ws.end();
}
