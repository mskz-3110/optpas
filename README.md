# optpas
Command line option parser

## Install
`npm i optpas`

## Run
### Help
`npm run --silent optpas help`
```
  test : Option parser test.
    -b|--bool   <0> : Boolean.
    -i|--int    <0> : Integer.
    -f|--float  <0> : Float.
    -s|--string <>  : String.
    -x|--flag       : Flag.
  help : Show usage.
```
### Test
#### Success
`npm run --silent optpas test -- -b 1 -i 2 -f 3.4 -s 5 -x a b c`
```
{"options":{"b":true,"i":2,"f":3.4,"s":"5","x":true},"values":["a","b","c"]}
```
#### Failure: Invalid option
`npm run --silent optpas test -- -a`
```
Invalid option: -a
```
#### Failure: Not found parameter
`npm run --silent optpas test -- -i`
```
Not found parameter: -i
```

## Usage
```
var optpas = require("optpas");
var parser = new optpas.OptionParser();
parser.Add('b', "bool", "0", "Boolean.", (v) => {return (0 != parseInt(v));});
parser.Add('i', "int", "0", "Integer.", (v) => {return parseInt(v);});
parser.Add('f', "float", "0", "Float.", (v) => {return parseFloat(v);});
parser.Add('s', "string", "", "String.", (v) => {return v;});
parser.Add('x', "flag", null, "Flag.", () => {return true;});
var {options, values} = parser.Parse(process.argv.slice(2));
```
