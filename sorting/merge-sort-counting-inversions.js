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

// Complete the countInversions function below.
function countInversions(arr) {
  let swapTimes = 0;

  const merge = (arrLeft, arrRight) => {
    const sortedArray = [];
    const leftLength = arrLeft.length;
    const rightLength = arrRight.length;
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < leftLength && rightIndex < rightLength) {
      if (arrLeft[leftIndex] > arrRight[rightIndex]) {
        sortedArray.push(arrRight[rightIndex]);
        rightIndex += 1;
        swapTimes += leftLength - leftIndex;
      } else {
        sortedArray.push(arrLeft[leftIndex]);
        leftIndex += 1;
      }
    }
    while (leftIndex < leftLength) {
      sortedArray.push(arrLeft[leftIndex]);
      leftIndex += 1;
    }
    while (rightIndex < rightLength) {
      sortedArray.push(arrRight[rightIndex]);
      rightIndex += 1;
    }
    return sortedArray;
  }

  const mergeSort = (array) => {
    const arrayLength = array.length;
    if (arrayLength === 1) {
      return array;
    }
    const mid = parseInt(arrayLength / 2);
    return merge(mergeSort(array.slice(0, mid)), mergeSort(array.slice(mid)));
  }

  mergeSort(arr);
  return swapTimes;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = countInversions(arr);

        ws.write(result + '\n');
    }

    ws.end();
}
