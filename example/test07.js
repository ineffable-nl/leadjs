// "use strict";

var p = console.log
p()
p("--------------------------------------------------------------------")
p()
p("running test07")







p('testmodules start here')
module('Prelude')
.defines({
    preludeTest : []
  , not : []
})
.exports([
    "not"
])
.where({
  preludeTest : function() {
    return "preludeTest";
  },

  not : function(b) {
    return !b;
  }
});

module('Data.List')
.defines({
    dataListTest : []
  , head : [['A'], 'Maybe A']
  , unsafeHead : [['A', 'A']]
})
.exports([
    "dataListTest"
  , "head"
])
.where(function() {
  return {
    dataListTest : function() {
      p('dataListTest()');
      p('preludeTest()', preludeTest());
    },

    head : function(l) {
      p("head(", l, ")")
      with (this.scope()) {
        return l.length>0 ? unsafeHead(l) : null;
      }
    },

    unsafeHead : function(l) {
      return l[0];
    }
  }
  });

module('App.Test')
.defines({
    localFunction : []
  , main : []
})
.exports([
    "main"
])
.imports('Data.Char')
.imports('Data.List', 'L')
.where(function() {
  p("creating module")
  p(">>>>>>> scope", scope)

  // var localFunction = function() { return scope.localFunction.apply(this, arguments); }
  //   , L = scope.L
  //   ;

  return {
    localFunction : function() {
      return 'local App.Test function';
    },

    main : function() {
      // p("main scope:", this)
      // with (this) {
        p()
        p('------- main called')
        p()
        p('from this', this)
        p('scope', this.scope())
        // p(this.toString())
        p()
        p('localFunction()')
        p(localFunction())

        p('L.head', L.head(['a','b','c']));
        // p('L.unsafeHead', L.unsafeHead(['a','b','c']));
      // }
    }
  }
});


p()
p()
p()
p()
p("#### main module ####")
p("#### main module ####")
p("#### main module ####")
p("#### main module ####")
p(moduleMain)
// with (moduleMain.scope()) {
  moduleMain.main();
// }

p()
p("--- EOF")
p()
