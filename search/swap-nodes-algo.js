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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the swapNodes function below.
 */
function swapNodes(indexes, queries) {
  const swap = (k, node, depth) => {
    if (!node) {
      return;
    }
    swap(k, node.left, depth + 1);
    swap(k, node.right, depth + 1);
    if (depth % k === 0) {
      const temp = node.left;
      node.left = node.right;
      node.right = temp;
    }
  }
  const inOrderTraversal = (order, node) => {
    if (!node) {
      return;
    }
    inOrderTraversal(order, node.left)
    order.push(node.value);
    inOrderTraversal(order, node.right);
  }
  const result = [];
  const indexesLength = indexes.length;
  const treeNodes = Array(indexesLength + 1);
  for (let i = 1; i <= indexesLength; i += 1) {
    if (!treeNodes[i]) {
      treeNodes[i] = { value: i, left: null, right: null };
    }
    const leftValue = indexes[i - 1][0];
    if (leftValue !== -1) {
      if (!treeNodes[leftValue]) {
        treeNodes[leftValue] = { value: leftValue, left: null, right: null };
      }
      treeNodes[i].left = treeNodes[leftValue];
    }
    const rightValue = indexes[i - 1][1];
    if (rightValue !== -1) {
      if (!treeNodes[rightValue]) {
        treeNodes[rightValue] = { value: rightValue, left: null, right: null };
      }
      treeNodes[i].right = treeNodes[rightValue];
    }
  }
  for (let j = 0; j < queries.length; j += 1) {
    const k = queries[j];
    swap(k, treeNodes[1], 1);
    const order = [];
    inOrderTraversal(order, treeNodes[1]);
    result.push(order);
  }
  return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let indexes = Array(n);

    for (let indexesRowItr = 0; indexesRowItr < n; indexesRowItr++) {
        indexes[indexesRowItr] = readLine().split(' ').map(indexesTemp => parseInt(indexesTemp, 10));
    }

    const queriesCount = parseInt(readLine(), 10);

    let queries = [];

    for (let queriesItr = 0; queriesItr < queriesCount; queriesItr++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    let result = swapNodes(indexes, queries);

    ws.write(result.map(x => x.join(' ')).join("\n") + "\n");

    ws.end();
}
