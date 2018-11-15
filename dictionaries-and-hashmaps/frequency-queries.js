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

// Complete the freqQuery function below.
function freqQuery(queries) {
  const numMap = {};
  const freqMap = {};
  const length = queries.length;
  const result = [];
  for (let i = 0; i < length; i += 1) {
    const [type, data] = queries[i];
    if (type === 3) {
      if (freqMap[data] > 0) {
        result.push(1);
      } else {
        result.push(0);
      }
    } else {
      if (!numMap[data]) {
        numMap[data] = 0;
      }
      if (!freqMap[numMap[data]]) {
        freqMap[numMap[data]] = 0;
      }
      if (freqMap[numMap[data]] > 0) {
        freqMap[numMap[data]] -= 1;
      }
      if (type === 1) {
        numMap[data] += 1;
      }
      if (type == 2 && numMap[data] > 0) {
        numMap[data] -= 1;
      }
      if (!freqMap[numMap[data]]) {
        freqMap[numMap[data]] = 0;
      }
      freqMap[numMap[data]] += 1;
    }
  }
  return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const ans = freqQuery(queries);

    ws.write(ans.join('\n') + '\n');

    ws.end();
}
