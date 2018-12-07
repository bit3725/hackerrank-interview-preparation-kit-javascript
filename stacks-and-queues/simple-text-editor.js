function processData(input) {
  //Enter your code here
const inputArray = input.split('\n');
const q = parseInt(inputArray[0], 10);
const queue = [];
let str = '';
for (let i = 1; i < inputArray.length; i += 1) {
  const [operator, data] = inputArray[i].split(' ');
  if (operator === '1') {
    str += data;
    queue.push(['2', data.length]);
  }
  if (operator === '2') {
    const index = str.length - (data - 0);
    queue.push(['1', str.substring(index)]);
    str = str.slice(0, index);
  }
  if (operator === '3') {
    console.log(str.charAt(data - 1));
  }
  if (operator === '4') {
    const [operator, data] = queue.pop();
    if (operator === '1') {
      str += data;
    }
    if (operator === '2') {
      const index = str.length - (data - 0);
      str = str.slice(0, index);
    }
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
