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
          , exportNames : [ ]
          , exportFuncs : [ ]
          , imports     : [ ]
          , scope       : { }
          , scopeLocal  : [ ]
          }

  var functions = {
    __exportFuncs : function() {
      return _.exportFuncs;
    },

    exports : function(_exports) {
      _.exportNames = _exports
      delete this.exports //only allowed to define exports once
      return this
    },

    imports : function(_name, _alias) {
      _.imports.push({
        module: _name,
        alias: _alias
      })

      return this
    },

    where : function(_body) {
      p('where', _body)

      delete this.exports
      delete this.imports
      delete this.where

      // _body()

      return this

      for (var key in _.imports) {
        p("import:", _.imports[key])
      }

      for (var key in _.definitions) {
        _.scope[key] = _body[key].bind(this)
        this[key] = _.scope[key]

        _.scopeLocal.push(
          __evalLocalVariable(key, 'this.'+key)
        )

        hasMain = true
      }
      p('scopelocal', _.scopeLocal)

      if (hasMain===true) {
        var _key = 'main'
        p('main found!',_.name)
        __main = function() {
          _.scopeLocal.map(function(v) { p(" ->",v) })
          eval(_.scopeLocal.join("\n"))
          p('CALLING FN IN ILLOGICAL PLACE:', fn())
          return _.scope[_key].apply(this, arguments)
        }
      }

      modules[_name] = this
      return this
    }
  }

  for (var key in _.exportNames) {
    var _name = _.exportNames[key];
    p('where',key,_name)
    functions[_name] = function() {
      p('function called', _name)
    }

    if (_name==='main') {
      var _mainName = _name
      __main = functions[_name]
    }
  }

  return functions;
}

module( 'App.Testah'
  , [ "what"
    ]
  , { 'App.Test' : 'T'
    }
  , function() {
      what = function() {
        p('what')
        return 'whatwhat in da butt'
      }
    }
  )

what = function() {
  return 'fucked up whatwhat'
}

module( 'App.Test'
  , [ "main"
    , "fn"
    ]
  , { 'App.Testah' :'T'
    }
  , function() {
    main = function() {
      p('main called')
      p(this)
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

// p('a',a,'b',b)
p('modules', modules)

p('__main')
p('def:', __main)
p('exec:',__main())

