process.stdin.resume();
process.stdin.setEncoding("utf8");

var reader = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on("line", (line) => {
  console.log("line: " + line);
});

var args = process.argv.slice(2);
console.log("args: " + JSON.stringify(args));
