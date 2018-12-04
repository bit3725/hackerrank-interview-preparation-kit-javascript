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

// Complete the maxXor function below.
function maxXor(arr, queries) {
  // solve here
  class Node {
    constructor() {
      this.bitChild = [];
    }
  }
  const result = [];
  const MAX_BIT_INDEX = 29;
  const rootNode = new Node();
  for (let i = 0; i < arr.length; i += 1) {
    const cur = arr[i];
    let currentNode = rootNode;
    for (let i = MAX_BIT_INDEX; i >= 0; i -= 1) {
      let bit = (cur >>> i) & 1;
      if (!currentNode.bitChild[bit]) {
        currentNode.bitChild[bit] = new Node();
      }
      currentNode = currentNode.bitChild[bit];
    }
  }
  for (let i = 0; i < queries.length; i += 1) {
    let max = 0;
    const cur = queries[i];
    let currentNode = rootNode;
    for (let i = MAX_BIT_INDEX; i >= 0; i -= 1) {
      let bit = (cur >>> i) & 1;
      if (currentNode.bitChild[1 - bit]) {
        max += (1 << i);
        currentNode = currentNode.bitChild[1 - bit];
      } else {
        currentNode = currentNode.bitChild[bit];
      }
    }
    result.push(max);
  }
  return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const m = parseInt(readLine(), 10);

    let queries = [];

    for (let i = 0; i < m; i++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    const result = maxXor(arr, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
