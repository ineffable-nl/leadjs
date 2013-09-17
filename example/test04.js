
var p = console.log
p()
p()
p("--------------------------------------------------------------------")
p()
p("running test04")

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
        p("## importing :", _importModule, "alias", _importAlias)
        _moduleImports.push({
          module: _importModule,
          alias:  _importAlias
        })
      }
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

    where : function(_whereFunctions) {
      p("### where ###")
      delete this['import'];
      delete this['where'];

      // p('_moduleImports', _moduleImports);
      var scope = _whereFunctions;

      for (var i in _moduleImports) {
        var _moduleImport = _moduleImports[i]
          , _moduleImportInstance = modules[_moduleImport.module];

        p("## _moduleImport :", _moduleImport)
        if (typeof _moduleImport.alias==='undefined') {
          p("import in module scope")

        }
        else {
          p("import as alias", _moduleImport.alias)
          scope[_moduleImport.alias] = _moduleImportInstance;
        }
      }

      for (var _functionName in _whereFunctions) {
        p(' - '+_moduleName+' :: '+_functionName
          // +' => '+_functions[_functionName]
        );

        // p('scope', scope)
        _moduleFunctions[_functionName] = function() {
          var fn = _whereFunctions[_functionName];
          p('--=> fn', fn)
          with (scope) {
            fn.apply(this, arguments);
          }
        }

        if (_functionName==='main') {
          p('MAIN FOUND')
          moduleMain = this;
        }
      }
      // _moduleFunctions = _whereFunctions;

      for (var _exportId in _moduleExportNames) {
        var _exportName = _moduleExportNames[_exportId];
        _moduleExports[_exportName] = _moduleFunctions[_exportName];
      }

      modules[_moduleName] = this;
      p('#### /module(', _moduleName, ') ####')
      p()

      return this;
    }
  }
}





p('testmodules start here')
module('Prelude', [
    "preludeTest"
  , "not"
  , "fst"
])
  .where({
    preludeTest : function() {
      return 'preludeTest';
    },

    not : function(b) {
      return !b;
    }
  });

module('Data.Char', ["ord", "chr"])
  .where({
    ord : function(c) {
      return c.charCodeAt(0);
    },

    chr : function(i) {
      return String.fromCharCode(c);
    }
  });

module('Data.List', ["dataListTest", "head"])
  .where({
    dataListTest : function() {
      p('dataListTest()');
      p('preludeTest()', preludeTest());
    },

    head : function(l) {
      return l[0];
    }
  });

module('App.Test', ["main"])
  .import('Data.Char')
  .import('Data.List', 'L')
  .where({
    localFunction : function() {
      return 'local App.Test function';
    },

    main : function() {
      p('main called')
      p('from this', this)
      p('this.localFunction()', localFunction());
      p('List', L);
    }
  });


p()
// p("#### all modules ####")
// p(modules)

p("#### main module ####")
p(moduleMain)
moduleMain.main();

p()
p("--- EOF")
p()
