var optpas = this;

optpas.OptionParser = function(){
  GetArrayValue = function(array, i){
    return (i < array.length) ? array[i] : null;
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
  
  this.Add = function(short_name, long_name, default_value, description, on_parse = null){
    this.Options[short_name] = {
      ShortName: short_name,
      LongName: long_name,
      DefaultValue: default_value,
      Description: description,
      OnParse: (on_parse !== null) ? on_parse : (v) => {return v;}
    };
  };
  
  this.Parse = function(args){
    var options = {};
    var values = [];
    var args_count = args.length;
    for (let argi = 0; argi < args_count; ++argi){
      let argv = GetArrayValue(args, argi);
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
            value = GetArrayValue(args, ++argi);
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
    Object.keys(options).forEach(key => {
      let option = this.Options[key];
      let value = options[key];
      delete options[key];
      options[option.LongName] = value;
    });
    return {options: options, values: values};
  };
  
  this.ToString = function(indent){
    var long_name_max_len = 0;
    var default_value_max_len = 0;
    Object.keys(this.Options).forEach(key => {
      let option = this.Options[key];
      let long_name_len = option.LongName.length;
      let default_value_len = GetLength(option.DefaultValue);
      if (long_name_max_len < long_name_len) long_name_max_len = long_name_len;
      if (default_value_max_len < default_value_len) default_value_max_len = default_value_len;
    });
    
    var lines = [];
    Object.keys(this.Options).forEach(key => {
      let option = this.Options[key];
      let line = indent +"-"+ option.ShortName +"|--"+ option.LongName;
      line += RepeatSpace(long_name_max_len - option.LongName.length + 1);
      let default_value_len = GetLength(option.DefaultValue);
      if (option.DefaultValue !== null){
        line += "<"+ option.DefaultValue +">";
      }else{
        line += "  ";
      }
      line += RepeatSpace(default_value_max_len - default_value_len);
      line += " : "+ option.Description;
      lines.push(line);
    });
    return lines.join("\n");
  };
};
