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

// Complete the arrayManipulation function below.
function arrayManipulation(n, queries) {
  let max = 0;
  const arr = [0];
  for (let i = 0; i < queries.length; i += 1) {
    const start = queries[i][0] - 1;
    const end = queries[i][1];
    const summand = queries[i][2];
    if (!arr[start]) {
      arr[start] = summand;
    } else {
      arr[start] += summand;
    }
    if (!arr[end]) {
      arr[end] = 0 - summand;
    } else {
      arr[end] -= summand;
    }
  }
  for (let i = 1; i < n; i += 1) {
    if (!arr[i]) {
      arr[i] = 0;
    }
    arr[i] += arr[i - 1];
    if (max < arr[i]) {
      max = arr[i];
    }
  }
  return max;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    let queries = Array(m);

    for (let i = 0; i < m; i++) {
        queries[i] = readLine().split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    let result = arrayManipulation(n, queries);

    ws.write(result + "\n");

    ws.end();
}
