var optpas = require("./optpas.js");
var parser = new optpas.OptionParser();
parser.Add('b', "bool", "0", "Boolean.", (v) => {return (0 != parseInt(v));});
parser.Add('i', "int", "0", "Integer.", (v) => {return parseInt(v);});
parser.Add('f', "float", "0", "Float.", (v) => {return parseFloat(v);});
parser.Add('s', "string", "", "String.");
parser.Add('x', "flag", null, "Flag.", () => {return true;});

var args = process.argv.slice(2);
var type = args.shift();
switch (type){
case "test":{
  console.log(JSON.stringify(parser.Parse(args)));
}break;

case "help":{
  process.stdout.write(`
  test : Option parser test.
${parser.ToString("    ")}
  help : Show usage.
`);
  process.exit(2);
}break;

default:{
  console.log("Invalid type=" + type + " args=" + JSON.stringify(args));
  process.exit(1);
}break;
}
