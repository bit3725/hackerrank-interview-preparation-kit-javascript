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

// Complete the minimumPasses function below.
function minimumPasses(m, w, p, n) {
  let currentPassTimes = 1;
  let currentCandies = m * w;
  let minPassTimes = Math.ceil(n / currentCandies);
  while (true) {
    if (currentCandies >= n) {
      minPassTimes = Math.min(minPassTimes, currentPassTimes);
      break;
    }
    if (currentPassTimes >= minPassTimes) {
      break;
    }
    const maxPurchaseAndHireNum = Math.floor(currentCandies / p);
    if (maxPurchaseAndHireNum > 0) {
      const mwGap = Math.abs(m - w);
      let addToLow = maxPurchaseAndHireNum;
      let addToHigh = 0;
      if (mwGap < maxPurchaseAndHireNum) {
        addToLow = mwGap + Math.ceil((maxPurchaseAndHireNum - mwGap) / 2);
        addToHigh = Math.floor((maxPurchaseAndHireNum - mwGap) / 2);
      }
      if (m <= w) {
        m += addToLow;
        w += addToHigh;
      } else {
        w += addToLow;
        m += addToHigh;
      }
      currentCandies -= maxPurchaseAndHireNum * p;
      const candiesToProduce = n - currentCandies;;
      const candiesMake = m * w;
      let extraPassTimes = currentPassTimes + Math.ceil(candiesToProduce / candiesMake);
      minPassTimes = Math.min(minPassTimes, extraPassTimes);
      currentCandies += m * w;
      currentPassTimes += 1;
    } else {
      let extraTimes = Math.ceil((p - currentCandies) / (m * w));
      currentPassTimes += extraTimes;
      currentCandies += m * w * extraTimes;
    }
  }
  return minPassTimes;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const mwpn = readLine().split(' ');

    const m = parseInt(mwpn[0], 10);

    const w = parseInt(mwpn[1], 10);

    const p = parseInt(mwpn[2], 10);

    const n = parseInt(mwpn[3], 10);

    let result = minimumPasses(m, w, p, n);

    ws.write(result + "\n");

    ws.end();
}
