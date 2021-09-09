# optpas
Command line option parser.

## Install
`npm i optpas`

## Local run
### Help
`node run.js help`
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
`node run.js test -- -b 1 -i 2 -f 3.4 -s 5 -x a b c`
```
{"options":{"bool":true,"int":2,"float":3.4,"string":"5","flag":true},"values":["a","b","c"]}
```
#### Failure: Invalid option
`node run.js test -- -a`
```
Invalid option: -a
```
#### Failure: Not found parameter
`node run.js test -- -i`
```
Not found parameter: -i
```

## How to use
### 1. Create script
> ./optpas.js
>```
>var optpas = require("optpas");
>var parser = new optpas.OptionParser();
>parser.Add('b', "bool", "0", "Boolean.", (v) => {return (0 != parseInt(v));});
>parser.Add('i', "int", "0", "Integer.", (v) => {return parseInt(v);});
>parser.Add('f', "float", "0", "Float.", (v) => {return parseFloat(v);});
>parser.Add('s', "string", "", "String.");
>parser.Add('x', "flag", null, "Flag.", () => {return true;});
>var parsed = parser.Parse(process.argv.slice(2));
>console.log(JSON.stringify(parsed));
>```
### 2. Run script
`node ./optpas.js`
