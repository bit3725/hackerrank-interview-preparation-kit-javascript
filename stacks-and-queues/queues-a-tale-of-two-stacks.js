function processData(input) {
  //Enter your code here
  const inputArray = input.split('\n');
  const q = parseInt(inputArray[0], 10);
  const queue = [];
  for (let i = 1; i < inputArray.length; i += 1) {
    const query = inputArray[i].split(' ');
    if (query[0] === '1') {
      queue.push(query[1]);
    }
    if (query[0] === '2') {
      queue.shift();
    }
    if (query[0] === '3') {
      console.log(queue[0]);
    }
  }
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
  _input += input;
});

process.stdin.on("end", function () {
  processData(_input);
});
