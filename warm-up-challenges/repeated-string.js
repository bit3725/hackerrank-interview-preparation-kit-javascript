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

// Complete the repeatedString function below.
function repeatedString(s, n) {
  const sLength = s.length;
  const remainder = n % sLength;
  const times = (n - remainder) / sLength;
  let aCount = 0;
  let theRest = 0;
  for (let i = 0, j = 0; i < sLength; i += 1, j += 1) {
    const char = s.charAt(i);
    if (char === 'a') {
      aCount += 1;
      if (j < remainder) {
        theRest += 1;
      }
    }
  }
  return aCount * times + theRest;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const n = parseInt(readLine(), 10);

    let result = repeatedString(s, n);

    ws.write(result + "\n");

    ws.end();
}
