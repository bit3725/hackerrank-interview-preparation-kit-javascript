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

// Complete the triplets function below.
function triplets(a, b, c) {
  let total = 0;
  let aLength = a.length;
  let bLength = b.length;
  let cLength = c.length;
  const aSorted = a.sort((cur, next) => cur - next);
  const bSorted = b.sort((cur, next) => cur - next);
  const cSorted = c.sort((cur, next) => cur - next);
  const aNumHash = {};
  const bNumHash = {};
  const cNumHash = {};
  let aIndex = 0;
  let aTotal = 0;
  let cIndex = 0;
  let cTotal = 0;
  for (let i = 0; i < bLength; i += 1) {
    const bCurrent = bSorted[i];
    if (!bNumHash[bCurrent]) {
      bNumHash[bCurrent] = true;
    } else {
      continue;
    }
    while (aIndex < aLength) {
      const aCurrent = aSorted[aIndex];
      if (aCurrent <= bCurrent) {
        aIndex += 1;
        if (!aNumHash[aCurrent]) {
          aNumHash[aCurrent] = true;
          aTotal += 1;
        }
      } else {
        break;
      }
    }
    while (cIndex < cLength) {
      const cCurrent = cSorted[cIndex];
      if (c[cIndex] <= bCurrent) {
        cIndex += 1;
        if (!cNumHash[cCurrent]) {
          cNumHash[cCurrent] = true;
          cTotal += 1;
        }
      } else {
        break;
      }
    }
    total += aTotal * cTotal;
  }
  return total;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const lenaLenbLenc = readLine().split(' ');

    const lena = parseInt(lenaLenbLenc[0], 10);

    const lenb = parseInt(lenaLenbLenc[1], 10);

    const lenc = parseInt(lenaLenbLenc[2], 10);

    const arra = readLine().split(' ').map(arraTemp => parseInt(arraTemp, 10));

    const arrb = readLine().split(' ').map(arrbTemp => parseInt(arrbTemp, 10));

    const arrc = readLine().split(' ').map(arrcTemp => parseInt(arrcTemp, 10));

    const ans = triplets(arra, arrb, arrc);

    ws.write(ans + '\n');

    ws.end();
}
