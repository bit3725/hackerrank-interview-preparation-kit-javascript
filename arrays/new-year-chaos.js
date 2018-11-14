'use strict';

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

// Complete the minimumBribes function below.
function minimumBribes(q) {
  let moves = 0;
  const temp = [];
  const length = q.length;
  for (let i = 0; i < length; i += 1) {
    temp[i] = i + 1;
  }
  for (let i = 0; i < length; i += 1) {
    const current = q[i];
    const gap = current - i - 1;
    if (gap > 2) {
      console.log('Too chaotic');
      return;
    } else if (gap == 2 || i + 2 < length && current === temp[i + 2]) {
      moves += 2;
      temp[i + 2] = temp[i + 1];
      temp[i + 1] = temp[i];
      temp[i] = current;
    } else if (gap == 1 || i + 1 < length && current === temp[i + 1]) {
      moves += 1;
      temp[i + 1] = temp[i];
      temp[i] = current;
    }
  }

  console.log(moves);
}

function main() {
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const q = readLine().split(' ').map(qTemp => parseInt(qTemp, 10));

        minimumBribes(q);
    }
}
