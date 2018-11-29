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

// Complete the minTime function below.
function minTime(machines, goal) {
  const sortedMachines = machines.sort((a, b) => a - b);
  const machinesLength = machines.length;
  let minDay = parseInt(goal / machinesLength) * sortedMachines[0];
  let maxDay = (parseInt(goal / machinesLength) + 1) * sortedMachines[machinesLength - 1];
  while (minDay < maxDay) {
    const midDay = parseInt((maxDay + minDay) / 2);
    let currentTotal = 0;
    for (let i = 0; i < machines.length; i += 1) {
      currentTotal += parseInt(midDay / sortedMachines[i]);
    }
    if (currentTotal >= goal) {
      maxDay = midDay;
    } else if (currentTotal < goal) {
      minDay = midDay + 1;
    }
  }
  return minDay;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nGoal = readLine().split(' ');

    const n = parseInt(nGoal[0], 10);

    const goal = parseInt(nGoal[1], 10);

    const machines = readLine().split(' ').map(machinesTemp => parseInt(machinesTemp, 10));

    const ans = minTime(machines, goal);

    ws.write(ans + '\n');

    ws.end();
}
