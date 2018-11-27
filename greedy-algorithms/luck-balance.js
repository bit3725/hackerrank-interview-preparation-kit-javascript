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

// Complete the luckBalance function below.
function luckBalance(k, contests) {
  const contestLength = contests.length;
  const sortedContests = contests.sort((a, b) => b[0] - a[0]);
  let luck = 0;
  let loseCount = 0;
  for (let i = 0; i < contestLength; i += 1) {
    const current = sortedContests[i];
    if (current[1] === 0) {
      luck += current[0]
    } else {
      loseCount += 1;
      if (loseCount <= k) {
        luck += current[0];
      } else {
        luck -= current[0];
      }
    }
  }
  return luck;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    let contests = Array(n);

    for (let i = 0; i < n; i++) {
        contests[i] = readLine().split(' ').map(contestsTemp => parseInt(contestsTemp, 10));
    }

    const result = luckBalance(k, contests);

    ws.write(result + '\n');

    ws.end();
}
