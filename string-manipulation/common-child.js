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

// Complete the commonChild function below.
function commonChild(s1, s2) {
  const s1Length = s1.length;
  const s2Length = s2.length;
  const lengthTable = [];
  for (let i = 1; i <= s1Length; i += 1) {
    if (!lengthTable[i - 1]) {
      lengthTable[i - 1] = [];
    }
    if (!lengthTable[i]) {
      lengthTable[i] = [];
    }
    for (let j = 1; j <= s2Length; j += 1) {
      if (!lengthTable[i - 1][j - 1]) {
        lengthTable[i - 1][j - 1] = 0;
      }
      if (!lengthTable[i - 1][j]) {
        lengthTable[i - 1][j] = 0;
      }
      if (!lengthTable[i][j - 1]) {
        lengthTable[i][j - 1] = 0;
      }
      if (s1.charAt(i - 1) === s2.charAt(j - 1)) {
        lengthTable[i][j] = lengthTable[i - 1][j - 1] + 1;
      } else {
        lengthTable[i][j] = Math.max(lengthTable[i - 1][j], lengthTable[i][j - 1]);
      }
    }
  }
  return lengthTable[s1Length][s2Length];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s1 = readLine();

    const s2 = readLine();

    let result = commonChild(s1, s2);

    ws.write(result + "\n");

    ws.end();
}
