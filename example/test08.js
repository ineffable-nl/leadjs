var p = console.log
p()
p("---")
p("test08")
p("---")
p()

var mainFound = false;
var main = function() {
  throw "no main function defined in module";
};
function module(name, defines) {
  var _name = name
    , _where = {}
    , _defines = defines
    , _scope = {}
    ;

  var createFns = [];
  for (var k in _defines) {
    if (k!=='main') {
      var createFn = k+' = function() { _scope["'+k+'"].apply(this, arguments); }';
      createFns.push(createFn);
    }
  }

  if (createFns.length>0) {
    createFnsEval = "var "+createFns.join(",\n")+";\n"
    p("call eval:", "\n"+createFnsEval)
    eval(createFnsEval);
    // p('fn', fn);
  }

  return {
    // _ : { defines : [],
    //       scope   : {} },

    where : function(where) {
      delete this.where;

      // for (var k in where) {
      //   // _defines.push(k);
      //   // _scope[k] = where[k];
      //   if (k!=='main') {
      //     eval('var '+k+' = '+where[k]);
      //   }
      // }

      // this._.defines = _defines;
      // this._.scope = _scope;

      for (var k in where) {
        p("> this[",k,"] =",where[k].toString());
        _scope[k] = where[k].bind(this);
        this[k] = _scope[k];

        if (k==='main') {
          p("> >> >>> >> > main found < << <<< << <")

          if (mainFound===true) {
            throw "multiple main entries found, confusing..";
          }
          mainFound = true;

          main = this[k];
        }
      }

      // p("FN", fn, fn())

      return this;
    }
    // ,
    // display : function() {
    //   p()
    //   var title = '### '+name+' ###'
    //     , line = (new Array(title.length+1)).join("-")
    //     ;

    //   p(line)
    //   p(title)
    //   for (var k in a) {
    //     var m = a[k];
    //     if (k==='_') {
    //       for (var l in m) {
    //         p('- (private)',l,'=',m[l])
    //       }
    //     }
    //     else {
    //       p('- (public)',k,'=',m.toString())
    //     }
    //   }
    //   p(title)
    //   p(line)
    //   p()

    //   return this;
    // }
  }
}

var a = module('App.Test',
  { main : []
  , fn : []
  , test : []
  , testNest : []
  }
)
.where({
  main : function() {
    p('called main entry point')
    p('call local fn')
    p('this =',this)
    // this.display();
    p('fn', fn)
    p(fn())
    return 'main returns';
  },

  fn : function() {
    p('fn called')
    p('calling test')
    p(test())
    return 'fn returns';
  },

  test : function() {
    p('test called')
    p('nesting call', testNest())
    return 'test returns';
  },

  testNest : function() {
    return 'nested return';
  }
});

// for (k in a) {
//   eval('var '+k+' = '+a[k])
// }

// with (a) {
  p('main')
  p('as function:', main)
  p('executed:', main())

  // main();
// }
