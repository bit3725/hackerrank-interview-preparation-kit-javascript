'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the countTriplets function below.
function countTriplets(arr, r) {
  let total = 0;
  const num2Map = {};
  const num3Map = {};
  const length = arr.length;
  for (let i = 0; i < length; i += 1) {
    const current = arr[i];
    if (num3Map[current] > 0) {
      total += num3Map[current];
    }
    if (num2Map[current] > 0) {
      if (!num3Map[current * r]) {
        num3Map[current * r] = 0;
      }
      num3Map[current * r] += num2Map[current]
    }
    if (!num2Map[current * r]) {
      num2Map[current * r] = 0;
    }
    num2Map[current * r] += 1;
  }
  return total;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nr = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nr[0], 10);

    const r = parseInt(nr[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const ans = countTriplets(arr, r);

    ws.write(ans + '\n');

    ws.end();
}
