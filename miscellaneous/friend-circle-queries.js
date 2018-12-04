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

// Complete the maxCircle function below.
function maxCircle(queries) {
  const results = [];
  const numHash = {};
  const sizeHash = {};
  let maxSize = 0;
  const root = (num) => {
    while (numHash[num] != num) {
      num = numHash[num];
    }
    return num;
  };
  for (let i = 0; i < queries.length; i += 1) {
    const current = queries[i];
    const n1 = current[0];
    const n2 = current[1];
    if (!numHash[n1]) {
      numHash[n1] = n1;
      sizeHash[n1] = 1;
    }
    if (!numHash[n2]) {
      numHash[n2] = n2;
      sizeHash[n2] = 1;
    }
    const n1Root = root(n1);
    const n2Root = root(n2);
    if (n1Root != n2Root) {
      if (sizeHash[n1Root] > sizeHash[n2Root]) {
        sizeHash[n1Root] += sizeHash[n2Root];
        numHash[n2Root] = numHash[n1Root];
      } else {
        sizeHash[n2Root] += sizeHash[n1Root];
        numHash[n1Root] = numHash[n2Root];
      }
    }
    maxSize = Math.max(sizeHash[n1Root], sizeHash[n2Root], maxSize);
    results.push(maxSize);
  }
  return results;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const ans = maxCircle(queries);

    ws.write(ans.join('\n') + '\n');

    ws.end();
}
