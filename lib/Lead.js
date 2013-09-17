//Lead.js
if (typeof print!=='function') {
  print=console.log;
}
if (typeof exports==='undefined') {
  console.debug('exports unavailable, this is probably not nodejs');
  // exports={};
}

var modules = {};
module = function(_name, _exports) {
  print("module", _name, "exports", _exports);
  var _where = {};

  return {
    __exports : _exports,
    __where : _where,

    import : function(_import) {
      print("import", _import, "in", _name);

      if (typeof modules[_import]==='undefined') {
        print('module', _import, 'not found, crashing now');
        return;
      }

      var _module = modules[_import],
          _exports = _module.__exports;

      for (var i=0, len=_exports.length; i<len; i++) {
        var key = _exports[i];
        print('+ importing function:', key);
        eval('var '+key+' = '+_module[key].toString());
      }

      return this;
    },
    where : function(_body) {
      var hasMain = false;
      for (key in _body) {
        this[key] = _body[key];

        if (key==='main') {
          print('found main() in', _name);
          hasMain = true;
        }
      }

      if (hasMain===true) {
        for (key in _body) {
          eval('var '+key+' = '+_body[key].toString());
        }

        print('executing main() in', _name);
        this.main();
      }

      delete this['import'];
      delete this['where'];
      modules[_name] = this;
      _where = _body;
      return this;
    }
  }
};

module("App.Test", [ "testFunction" ])
// .import("Data.List")
.where(function(){
  function testFunctionHidden() {
    return "i r hidden";
  };

  function testFunction() {
    console.log("testFunction called");
    console.log("testFunctionHidden called from testFunction");
    console.log(testFunctionHidden());
  };
});

// importing = function(){
//   print("import", _import, "in", _name);

//   if (typeof modules[_import]==='undefined') {
//     print('module', _import, 'not found, crashing now');
//     return;
//   }

//   var _module = modules[_import],
//       _exports = _module.__exports;

//   for (var i=0, len=_exports.length; i<len; i++) {
//     var key = _exports[i];
//     print('+ importing function:', key);
//     eval('var '+key+' = '+_module[key].toString());
//   }

//   return this;
// }

// module(
//   "Data.List",
//   [ "List"
//   , "head"
//   , "tail"
//   ]
// )
// .where({
//   List : Lambda('List', function() {

//   }),

//   // head : Lambda(['A'], 'A', function(l) {
//   head : function(l) {
//     return l[0];
//   },

//   tail : Lambda(['A'], ['A'], function(l) {
//     return l[1];
//   })
// });


exports.module = module;
// exports.modules = modules;




// function Lambda(vars,f) {
//   //print("create lambda function",vars,f);
//   return function() {
//     var varslen = vars.length-1,
//     argslen = arguments.length;

//     if (varslen==argslen) {
//       for (k in arguments) {
//         if (vars[k].check(arguments[k])==false) {
//           print(arguments[k]+" is different type than expected");
//         }
//       }
//       return f.apply(this,arguments);
//     }
//     else if (varslen>argslen) {
//       print("return new lambda with predefined variables");
//     }
//     else {
//       print("too many arguments, I cant handle it man..");
//     }
//   }
// }


// String.check = function(v) {
//   return typeof v == "string";
// }

// Integer = {
//   check : function(v) {
//     return typeof v == "number";
//   }
// }

// var left = Lambda([String, Integer, String], function(s,a) {
//   return s.substring(0,a);
// });

// print(left("testicles one two", 4));
