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

// Complete the makeAnagram function below.
function makeAnagram(a, b) {
  const charMapA = {};
  let total = 0;
  for (let i = 0; i < a.length; i++) {
    if (!charMapA[a[i]]) {
      charMapA[a[i]] = 1;
    } else {
      charMapA[a[i]] += 1;
    }
  }
  for (let i = 0; i < b.length; i++) {
    if (!charMapA[b[i]]) {
      total += 1;
    } else {
      charMapA[b[i]] -= 1;
    }
  }
  for (const value of Object.values(charMapA)) {
    total += value;
  }
  return total;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const a = readLine();

    const b = readLine();

    const res = makeAnagram(a, b);

    ws.write(res + '\n');

    ws.end();
}
