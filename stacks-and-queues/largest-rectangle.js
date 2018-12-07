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

// Complete the largestRectangle function below.
function largestRectangle(h) {
  let largest = 0;
  const indexStack = [];
  for (let i = 0; i < h.length; i += 1) {
    let currentLeftIndex = i;
    while (indexStack.length > 0 && h[i] <= indexStack[indexStack.length - 1].value) {
      const { leftIndex, value } = indexStack.pop();
      currentLeftIndex = leftIndex;
      largest = Math.max(largest, value * (i - leftIndex));
    }
    indexStack.push({
      leftIndex: currentLeftIndex,
      value: h[i],
    });
  }
  while (indexStack.length > 0) {
    const { leftIndex, value } = indexStack.pop();
    largest = Math.max(largest, value * (h.length - leftIndex));
  }
  return largest;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const h = readLine().split(' ').map(hTemp => parseInt(hTemp, 10));

    let result = largestRectangle(h);

    ws.write(result + "\n");

    ws.end();
}
