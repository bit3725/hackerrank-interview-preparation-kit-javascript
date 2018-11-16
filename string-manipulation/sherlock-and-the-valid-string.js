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

// Complete the isValid function below.
function isValid(s) {
  const charArray = Array(26).fill(0);
  for (let i = 0; i < s.length; i += 1) {
    charArray[s.charCodeAt(i) - 97] += 1;
  }
  let flag = 0;
  let oneGap = false;
  for (let i = 0; i < 26; i += 1) {
    if (charArray[i] > 0) {
      if (flag < 1) {
        flag = charArray[i];
      }
      if (flag !== charArray[i]) {
        if (Math.abs(flag - charArray[i]) === 1) {
          if (!oneGap) {
            oneGap = true;
            continue;
          }
        }
        if (charArray[i] === 1) {
          if (!oneGap) {
            oneGap = true;
            continue;
          }
        }
        return 'NO';
      }
    }
  }
  return 'YES';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = isValid(s);

    ws.write(result + "\n");

    ws.end();
}
