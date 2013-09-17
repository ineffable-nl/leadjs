p=console.log
p(Array(100).join("\n"))
p("--")
p("test10 go")
p("--")
p()

var __main = function() { throw "main not found in modules" }
var __evalLocalVariable = function(key, value) {
  return ['var ', key, ' = ', value].join('')
}
var __eval = function(arr) {
  p('run eval:')
  arr.map(function(v) { p(' ->',v) })
  // eval(arr.join("\n"))
}
var hasMain = false
var modules = {}
var module = function(_name, _exports, _imports, _body) {
  var _ = { name        : _name
          , exportNames : _exports
          , exportFuncs : [ ]
          , imports     : _imports
          , body        : _body
          , scope       : { }
          , scopeLocal  : [ ]
          }

  var functions = {
    // __exportFuncs : function() {
    //   return _.exportFuncs;
    // }
  }

  _body.call(this)

  __exports = function() {
    for (var key in _.exportNames) {
      var _name = _.exportNames[key]

      p('where',key,_name)
      var e = 'functions["'+_name+'"] = '+_name
      p('add function:', _name, '=>', e)
      eval(e)

      if (_name==='main') {
        var _mainName = _name
        __main = functions[_name]
      }
    }
  }

  __exports()
  p('functions', functions)

  return functions;
}

var a=module
  ( 'App.Testah'
  , [ "what"
    ]
  , { 'App.Test' : 'T'
    }
  , function() {
      p('Loading App.Testah')

      what = function() {
        p('what')
        return 'whatwhat in da butt'
      }
    }
  )

// what = function() {
//   return 'fucked up whatwhat'
// }

var b=module
  ( 'App.Test'
  , [ "main"
    , "fn"
    ]
  , { 'App.Testah' :'T'
    }
  , function() {
      p('Loading App.Test')

      main = function() {
        p('main called')
        // p(this)
        p('fn', fn())
        return 'main returns'
      }

      fn = function() {
        p('>> fn called')
        p('hiddenFn()', hiddenFn())
        return 'fn returns'
      }

      hiddenFn = function() {
        p('>>>> hiddenFn called')
        return 'hiddenFn returns'
      }
    }
  )

p('a',a,'b',b)
p('modules', modules)

p('__main')
p('def:', __main)
p('exec:',__main())

