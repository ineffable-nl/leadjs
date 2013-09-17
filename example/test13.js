p=console.log
p('\033[2J');
p("--")
p("test10 go")
p("--")
p()

var __main = function() { throw "main not found in modules" }
var __launch = function() {
  for (var k in __modules) {
    modules[k] = __modules[k].call(__modules[k])
    delete __modules[k]
  }

  __main.call(__main)
}

var hasMain = false
var __modules = { }
var modules = { }


var module = function(_name, _exports) {
  p('>>>>>>>>>>>> module '+_name+' >>>>>>>>>>>>')
  p('>>>> exports:',_exports)
  var imports = [ ]
  if (_name!=='Prelude') {
    imports.push({ name : "Prelude" })
  }

  fns = {
    import : function(_importModule, _importAlias) {
      p("<<<< import",_importModule,(_importAlias&&"as "+_importAlias)||'')
      imports.push({name  : _importModule
                  , alias : _importAlias
                  })
      return fns
    },
    where : function(_body) {
      where = function() {
        var functions = {
        }

        for (var i=0, len=imports.length; i<len; i++) {
          var m = imports[i]
          p('<< import module',m.name)
          if (typeof m.alias==='undefined') {
            me = modules[m.name]

            p("<< import global in module")
            p('>>',m.name,'module exports', me)

            for (var key in me) {
              var fn = me[key]
              functions[key] = fn
            }

            p('<<<<<<<')
            p()
          }
          else {
            p("- import as",m.alias)
            functions[m.alias] = modules[m.name]
          }
        }

        p(">>>>>>>")
        p(">> Loading",_name)
        var b = _body.toString()
        // p(_body.toString())
        // _body()
        b = b.slice(b.indexOf("{")+1, -1)
        p('body\n', b)
        eval(b)
        p('typeof fn', typeof fn)
        p()

        for (var key in _exports) {
          var _exportName = _exports[key]
          functions[_exportName] = eval(_exportName)

          if (_exportName==='main') {
            var _mainName = _exportName
            __main = functions[_exportName]
          }
        }

        p('<< functions', functions)

        return functions
      }

      p("<<<<<<<<<<<< module "+_name+" <<<<<<<<<<<<")
      p()
      __modules[_name] = where
    }

  }
  return fns
}

module("Prelude", [
    "fst"
])
.where(function() {
  fst = function(t) {
    return t[0]
  }
})

module('App.Testah', [
    "what"
  , "why"
])
.where(function() {
  var what = function() {
    p('what')
    p('App.Testah :: how', how())
    p('App.Testah :: fn', fn())
    return 'whatwhat in da butt'
  }

  var why = function() {
    return 'why returned'
  }

  var how = function() {
    return 'how returned'
  }

  var fn = function() {
    return '>>>>>> REWRITTEN FN <<<<<<<'
  }
})

module('App.Global', [
    "whatever"
])
.where(function() {
  whatever = function() {
    p('what')
    p('App.Testah :: how', how())
    p('App.Testah :: fn', fn())
    return 'whatwhat in da butt'
  }
})

// what = function() {
//   return 'fucked up whatwhat'
// }

module('App.Test', [
      "main"
    , "fn"
  ])
.import("App.Testah", "T")
.import("App.Global")
.where(function() {
  main = function() {
    p('main called')
    // p(this)
    p('fn', fn())
    p('fst', fst(['a','b']))
    return 'main returns'
  }

  var fn = function() {
    p('>> fn called')
    p('hiddenFn()', hiddenFn())
    return 'fn returns'
  }

  var hiddenFn = function() {
    p('>>>> hiddenFn called')
    // p('this', this)
    // p('what()', T.why())
    return 'hiddenFn returns'
  }
})

__launch()
