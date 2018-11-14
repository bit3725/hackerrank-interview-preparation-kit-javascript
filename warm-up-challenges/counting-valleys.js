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

// Complete the countingValleys function below.
function countingValleys(n, s) {
  let valleyNum = 0;
  let inValley = false;
  let currentHeight = 0;
  for (let i = 0; i < n; i += 1) {
    let step = s.charAt(i);
    if (step === 'U') {
      currentHeight += 1;
    } else {
      currentHeight -= 1;
    }
    if (currentHeight < 0 && !inValley) {
      inValley = true;
    }
    if (currentHeight >= 0 && inValley) {
      valleyNum += 1;
      inValley = false;
    }
  }
  return valleyNum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    let result = countingValleys(n, s);

    ws.write(result + "\n");

    ws.end();
}
