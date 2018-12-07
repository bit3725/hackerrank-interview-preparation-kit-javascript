'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the abbreviation function below.
function abbreviation(a, b) {
  const aLength = a.length;
  const bLength = b.length;
  const equalPossible = [];
  for (let i = 0; i <= aLength; i += 1) {
    equalPossible[i] = [];
    for (let j = 0; j <= bLength; j += 1) {
      const aCharCode = a.charCodeAt(i - 1);
      const bCharCode = b.charCodeAt(j - 1);
      if (i === 0) {
        if (j === 0) {
          equalPossible[i][j] = true;
        } else {
          equalPossible[i][j] = false;
        }
        continue;
      }
      if (j === 0 && i > 0) {
        if (aCharCode <= 90) {
          equalPossible[i][j] = false;
        } else {
          equalPossible[i][j] = equalPossible[i - 1][j];
        }
        continue;
      }
      if (aCharCode === bCharCode) {
        equalPossible[i][j] = equalPossible[i - 1][j - 1];
      } else {
        if (aCharCode <= 90) {
          equalPossible[i][j] = false;
        } else {
          if (aCharCode - 32 === bCharCode) {
            equalPossible[i][j] = equalPossible[i - 1][j] || equalPossible[i - 1][j - 1];
          } else {
            equalPossible[i][j] = equalPossible[i - 1][j];
          }
        }
      }
    }
  }
  return equalPossible[aLength][bLength] ? 'YES' : 'NO';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const a = readLine();

        const b = readLine();

        let result = abbreviation(a, b);

        ws.write(result + "\n");
    }

    ws.end();
}
