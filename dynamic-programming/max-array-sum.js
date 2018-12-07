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

// Complete the maxSubsetSum function below.
function maxSubsetSum(arr) {
  let maxSum = arr[0];
  let positionMaxSum = [];
  for (let i = 0; i < arr.length; i += 1) {
    const current = arr[i];
    if (i === 0) {
      positionMaxSum[0] = current;
    } else if (i === 1) {
      positionMaxSum[1] = Math.max(positionMaxSum[0], current);
      maxSum = positionMaxSum[1];
    } else {
      positionMaxSum[i] = Math.max(current, current + positionMaxSum[i - 2], maxSum);
      maxSum = Math.max(maxSum, positionMaxSum[i]);
    }
  }
  return maxSum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = maxSubsetSum(arr);

    ws.write(res + '\n');

    ws.end();
}
