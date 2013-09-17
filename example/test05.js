// "use strict";

var p = console.log
p()
p("--------------------------------------------------------------------")
p()
p("running test05")

var modules = {};
var moduleMain = null;
var module = function(_moduleName, _moduleExportNames) {
  p()
  p('#### module(', _moduleName, ') ####')
  p("## exports :", _moduleExportNames)

  var _moduleFunctions = {}
    , _moduleImports = []
    , _moduleExports = {}
    , _import = function(_importModule, _importAlias) {
        // p("## importing :", _importModule, "alias", _importAlias)
        _moduleImports.push({
          module: _importModule,
          alias:  _importAlias
        })
      }
    , _scope = {}
    , imports = {}
    , exports = {}
    ;

  if (_moduleName!=='Prelude') {
    _import('Prelude');
  }

  return {
    __exports : function() {
      return _moduleExports;
    },

    import : function(_importModule, _importAlias) {
      _import(_importModule, _importAlias);
      return this;
    },

    scope : function() {
      p("getting scope for", _moduleName);
      p("= scope:", _scope)
      return _scope;
    },

    where : function(_whereFunctionsClass) {
      p("### where ###")
      delete this['import'];
      delete this['where'];

      scope = {};

      p("# create module scope with imports defined by exports")
      p(_moduleImports)
      for (var i=0, len=_moduleImports.length; i<len; i++) {

        var m = _moduleImports[i]
        if (typeof modules[m.module]==='undefined') {
          throw m.module+" not found in modules, import failed"
        }
        var mi = modules[m.module]
          , me = mi.__exports();

        if (typeof m.alias==='undefined') {
          for (var name in me) {
            if (typeof scope[name]!=='undefined') {
              p("scope:", scope)
              throw name+" already defined in module";
            }
            scope[name] = me[name];
          }
        }
        else {
          if (typeof scope[m.alias]!=='undefined') {
            p("error scope:", scope)
            throw m.alias+" already defined in module";
          }
          scope[m.alias] = me;
        }
      }

      p("# allow all module functions in module, regardless of exports")

      _whereFunctions = _whereFunctionsClass();
      console.log("_whereFunctions", _whereFunctions);

      for (var name in _whereFunctions) {
        if (typeof scope[name]!=='undefined') {
          p("error scope:", scope)
          throw name+" already defined in module";
        }

        scope[name] = _whereFunctions[name].bind(this);
        // scope[name] = function() {
        //   with (scope) {
        //     return _whereFunctions[name].apply(this, arguments);
        //   }
        // }
      }

      p("# export functions to be reused:", _moduleExportNames)
      for (var i in _moduleExportNames) {
        var name = _moduleExportNames[i];

        if (typeof scope[name]==='undefined') {
          p("error scope:", scope)
          throw name+" not available for (re)exporting";
        }

        _moduleExports[name] = scope[name];
        this[name] = scope[name];

        if (name==="main") {
          moduleMain = this;
        }
      }


      modules[_moduleName] = this;

      _scope = scope;
      // functions = scope;
      // exports = scope;
      // for (var name in scope) {
      //   this[name] = scope[name];
      // }

      p("### ended up with scope:", _scope)
      p()
    }
  }
}





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
