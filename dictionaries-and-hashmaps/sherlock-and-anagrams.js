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

// Complete the sherlockAndAnagrams function below.
function sherlockAndAnagrams(s) {
  const length = s.length;
  const strMap = {};
  let pairs = 0;
  for (let i = 0; i < length; i += 1) {
    for (let j = i + 1; j <= length; j += 1) {
      const substr = s.substring(i, j);
      const subarray = substr.split('');
      const sortedSubarray = subarray.sort();
      const sortedStr = sortedSubarray.join('');
      if (!strMap[sortedStr]) {
        strMap[sortedStr] = 1;
      } else {
        strMap[sortedStr] += 1;
      }
    }
  }
  for (const [key, value] of Object.entries(strMap)) {
    if (value > 1) {
      pairs += value * (value - 1) / 2;
    }
  }
  return pairs;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        let result = sherlockAndAnagrams(s);

        ws.write(result + "\n");
    }

    ws.end();
}
