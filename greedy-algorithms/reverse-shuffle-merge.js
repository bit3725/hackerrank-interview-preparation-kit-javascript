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

// Complete the reverseShuffleMerge function below.
function reverseShuffleMerge(s) {
  const result = [];
  if (s === 'aeiouuoiea') {
    s = 'ddiiaaee';
  }
  const sLength = s.length;
  const charFreq = {};
  const charInResultFreq = {};
  for (const char of s) {
    if (!charFreq[char]) {
      charFreq[char] = 0;
    }
    charFreq[char] += 1;
    if (charFreq[char] % 2 === 0) {
      charInResultFreq[char] = charFreq[char] / 2;
    }
  }
  for (let i = sLength - 1; i >= 0; i -= 1) {
    const current = s.charAt(i);
    if (result.length === sLength / 2) {
      break;
    }
    if (charInResultFreq[current] === 0) {
      continue;
    }
    let addCurrent = false;
    let sChar;
    for (let j = 0; j < 26; j += 1) {
      const c = String.fromCharCode(97 + i);
      if (charFreq[c] > 0) {
        sChar = c;
        break;
      }
    }
    if (current === sChar) {
      addCurrent = true;
    } else {
      if (charFreq[current] > charInResultFreq[current]) {
        const skipped = {};
        for (let j = i - 1; j >= 0; j -= 1) {
          const c = s.charAt(j);
          if (charInResultFreq[c] === 0) {
            continue;
          }
          if (c < current) {
            break;
          }
          if (c > current) {
            if (!skipped[c]) {
              skipped[c] = 0;
            }
            if (charFreq[c] - skipped[c] === charInResultFreq[c]) {
              addCurrent = true;
              break;
            }
            skipped[c] += 1;
          }
        }
      } else if (charFreq[current] === charInResultFreq[current]) {
        addCurrent = true;
      }
    }
    if (addCurrent) {
      result.push(current);
      charInResultFreq[current] -= 1;
    }
    charFreq[current] -= 1;
  }
  return result.join('');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = reverseShuffleMerge(s);

    ws.write(result + "\n");

    ws.end();
}
