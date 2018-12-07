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

// Complete the digitSum function below.
function superDigit(n, k) {
  const digitSum = (dStr) => {
    if (dStr.length === 1) {
      return dStr - 0;
    }
    let newDigit = 0;
    for (let i = 0; i < dStr.length; i += 1) {
      newDigit += dStr.charAt(i) - 0;
    }
    return digitSum(newDigit + '');
  }
  let sumN = 0
  for (let i = 0; i < n.length; i += 1) {
    sumN += n.charAt(i) - 0;
  }
  return digitSum(sumN * k + '');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = nk[0];

    const k = parseInt(nk[1], 10);

    const result = superDigit(n, k);

    ws.write(result + '\n');

    ws.end();
}
