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

// Complete the maximumSum function below.
function maximumSum(a, m) {
  const moduloPrefix = [];
  const aLength = a.length;
  let curr = 0;
  for (let i = 0; i < aLength; i += 1) {
    curr = (curr + a[i] % m) % m;
    moduloPrefix[i] = curr;
  }
  let maxSum = 0;
  const sortedPrefix = [];
  for (let i = 0; i < aLength; i += 1) {
    const current = moduloPrefix[i];
    maxSum = Math.max(maxSum, current);
    const sortedPrefixLength = sortedPrefix.length;
    let low = 0;
    let high = sortedPrefixLength - 1;
    let insertAndCalculateModulo = true;
    while (low <= high) {
      const mid = parseInt((low + high) / 2);
      const midValue = sortedPrefix[mid];
      if (current > midValue) {
        low = mid + 1;
      } else if (current < midValue) {
        high = mid - 1;
      } else {
        insertAndCalculateModulo = false;
        break;
      }
    }
    if (insertAndCalculateModulo) {
      if (low <= sortedPrefixLength - 1) {
        maxSum = Math.max(maxSum, (current - sortedPrefix[low] + m) % m);
      }
      sortedPrefix.splice(low, 0, current);
    }
  }
  return maxSum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const nm = readLine().split(' ');

        const n = parseInt(nm[0], 10);

        const m = parseInt(nm[1], 10);

        const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

        let result = maximumSum(a, m);

        ws.write(result + "\n");
    }

    ws.end();
}
