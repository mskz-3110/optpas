var optpas = optpas = this;

optpas.OptionParser = function(){
  GetArg = function(args, i){
    return (i < args.length) ? args[i] : null;
  };
  
  FindOptionByShortName = function(options, short_name){
    return (short_name in options) ? options[short_name] : null;
  };
  
  FindOptionByLongName = function(options, long_name){
    var keys = Object.keys(options);
    for (let i in keys){
      let option = options[keys[i]];
      if (long_name === option.LongName) return option;
    }
    return null;
  };
  
  GetLength = function(value){
    return (value !== null) ? value.length : 0;
  };
  
  RepeatSpace = function(count){
    return (0 < count) ? " ".repeat(count) : "";
  };
  
  this.Options = {};
  
  this.Add = function(short_name, long_name, default_value, description, on_parse){
    this.Options[short_name] = {
      ShortName: short_name,
      LongName: long_name,
      DefaultValue: default_value,
      Description: description,
      OnParse: on_parse
    };
  };
  
  this.Parse = function(args){
    var options = {};
    var values = [];
    var args_count = args.length;
    for (let argi = 0; argi < args_count; ++argi){
      let argv = GetArg(args, argi);
      let option = null;
      if (argv.startsWith("-")){
        if (argv.startsWith("--")){
          option = FindOptionByLongName(this.Options, argv.slice(2));
        }else{
          option = FindOptionByShortName(this.Options, argv.slice(1));
        }
        
        if (option !== null){
          let value = null;
          if (option.DefaultValue !== null){
            value = GetArg(args, ++argi);
            if (value === null) throw "Not found parameter: "+ argv;
          }
          options[option.ShortName] = option.OnParse(value);
          continue;
        }else{
          throw "Invalid option: "+ argv;
        }
      }
      values.push(argv);
    }
    
    Object.keys(this.Options).forEach(key => {
      if (!(key in options)){
        let option = this.Options[key];
        if (option.DefaultValue !== null){
          options[key] = option.OnParse(option.DefaultValue);
        }
      }
    });
    return {options: options, values: values};
  };
  
  this.ToString = function(indent){
    var longNameMaxLen = 0;
    var defaultValueMaxLen = 0;
    Object.keys(this.Options).forEach(key => {
      let option = this.Options[key];
      let longNameLen = option.LongName.length;
      let defaultValueLen = GetLength(option.DefaultValue);
      if (longNameMaxLen < longNameLen) longNameMaxLen = longNameLen;
      if (defaultValueMaxLen < defaultValueLen) defaultValueMaxLen = defaultValueLen;
    });
    
    var lines = [];
    Object.keys(this.Options).forEach(key => {
      let option = this.Options[key];
      let line = indent +"-"+ option.ShortName +"|--"+ option.LongName;
      line += RepeatSpace(longNameMaxLen - option.LongName.length + 1);
      let defaultValueLen = GetLength(option.DefaultValue);
      if (option.DefaultValue !== null){
        line += "<"+ option.DefaultValue +">";
      }else{
        line += "  ";
      }
      line += RepeatSpace(defaultValueMaxLen - defaultValueLen);
      line += " : "+ option.Description;
      lines.push(line);
    });
    return lines.join("\n");
  };
};
