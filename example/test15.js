/*
LeadJS. A functional Javascript library.
========================================

Style guidelines
----------------
* To prevent name collisions:
  * Prepend Lead-global private with $
  * Prepend function private with $_
  * Variables without prefix are global or arguments of function
* Keep variables, functions and arguments as short as possible, given the
    meaning is clear, e.g.:
  * sin(x), not sin(floatingVariable)
  * head(a) not head(listOrSomethingDisguisingAsList)
  * add(title, body) not add(s, t)
* Variable names:
  * {x, y, z} ∈ ℜ (Real)
  * {i, j, n} ∈ ℕ (Natural)
  * {a, b}    ∈ Polymorphic
  * {l, m}    ∈ List
  * {c}       ∈ Char
  * {s, t}    ∈ [Char] (= String)
*/
// id = x => x
Lead = (function() {
  // "use strict";

  var $modules = [ ]
    , $version = {major: 0, minor: 0, revision: 1}
    , $main    = [ ]
    , $p       = console.log
    , $error   = $p
    , $info    = $p
    , $warning = $p
    , $verbose = $p

  function $debug(args, name, prefix, depth) {
    var   args   = typeof args === 'object' ||
                   typeof args === 'array' ? args : [args]
      ,   depth  = depth || 0
      , $_caller = arguments.callee.caller || { }
      , $_name   = (name || $_caller.name) || '(anonymous)'
      , $_args   = [ ]
      , $_base   = [ ]

      if (typeof prefix !== 'undefined' && prefix) {
        $_base.push(prefix + ":")
      }

      for (var $_i in args) {
        if (args[$_i]) {
          $_args.push(
            args[$_i].toString === 'function' ? args[$_i].toString() : args[$_i]
          )
        }
      }

      $p.apply(this, $_base.concat([ $_name, "(", $_args.join(", "), ")"]))
    }

  function $import(module) {
    $debug(arguments)
    // $_imports.push(arguments)
  }

//   function $scope(map) {
//     $debug(arguments)

//     $debug(arguments)

//     var $_vars =
//           [ "var not = function(b) { return !b }"
//           , "var id  = function(a) { return a  }"
//           ]
//       , $_eval = " \
// ( \
//   function(__function) { \
//     var not = function(b) { return !b }; \
//     var id  = function(a) { return a  }; \
//     console.log('__function =', __function); \
//     return function() { \
//       console.log('called __function', __function, 'with', arguments); \
//       __function.apply(this, arguments); \
//     } \
//   } \
// )"

//     // $_eval = '(function(f) { return f })'

//     $debug(["eval", $_eval])

//     return eval($_eval)
//   }

  function $scoped(scope, f) {
    // $debug(arguments)

    $_vars = [ ]
    for (var k in scope) {
      $_vars.push("var "+k+" = "+scope[k])
    }
    var $_eval =
          [ "("
          , "(function() {"
          , "  "+$_vars.join("\n  "),
          , "  return ( "+f.toString()+" )"
          , "})()"
          , ")"
          ].join("\n")

    // $p('>> scope', scope)
    // $p('>> eval', $_eval)
    return eval($_eval)
  }

  function module(name, exports, imports, where) {
    $debug(arguments)

    var $_name      = name
      , $_exports   = [ ]
      , $_imports   = [ ]
      , $_defines   = [ ]
      , $_scope     = { }

    typeof exports !== 'undefined' && $_export(exports)
    typeof imports !== 'undefined' && $_import(imports)

    function $_export(f) { $debug(arguments, null, $_name)
      if (arguments.length > 1) {
        for (var i in arguments) {
          $_export(arguments[i])
        }
      }
      else {
        Array.isArray(f) ? $_exports = $_exports.concat(f)
                         : $_exports.push(f)
      }

      return this
    }

    function $_define(v, d) {
      if (typeof $_scope[v] !== 'undefined') {
        throw "cannot redeclare "+v
      }
      $_scope[v] = d
    }

    function $_import(name, alias, visibility, fs) { $debug(arguments, null, $_name)
      var $_def = {
        name       : name,
        alias      : alias,
        visibility : visibility,
        fs         : fs
      }

      $_imports.push($_def)

      return this
    }

    function $_where(defs) {
      $debug(arguments, null, $_name)
      delete this.import
      delete this.export
      delete this.where

      $_defines = Object.keys(defs)
      $debug($_defines, '$_defines =', $_name)

      $_imports.map(function(m) {
        // $p('__IMPORT', m)
        var name       = m.name
          , alias      = m.alias
          , visibility = m.visibility
          , fs         = m.fs || Object.keys($modules[name])

        if (typeof alias !== 'undefined' && alias) {
          $_define(alias, "$modules."+name)
        }
        else {
          for (var i in fs) {
            var f = fs[i]
            $_define(f, "$modules."+name+"."+f)
          }
        }
      }, this)

      $_defines.map(function(name) {
        $debug(name, '$_defines.map', $_name)
        $_define(name, defs[name])
      }, this)

      $debug($_scope)

      // $_scope = $scoped.bind(this, defs)

      $_exports.map(function(name) {
        $debug([name, defs[name]], '$_exports.map', $_name)
        this[name] = $scoped($_scope, defs[name])

        if (name === 'main') {
          $main.push(this[name])
        }
      }, this)

      $modules[$_name] = this
      return this
    }

    return {
      import : function(module, alias) {
        return $_import.apply(this, arguments)
      },

      export : function(f) {
        return $_export.apply(this, arguments)
      },

      where : function() {
        return $_where.apply(this, arguments)
      }
    }
  }

  module("Prelude")
  .export("not", "fst")
  .where ({
    not : function(b) { return !b },
    fst : function(l) { return l[0] }
  })

  module("App.Test", [
    "main"
  ])
  .import("Prelude")
  // .import("Prelude", "P", "hiding", ["fst"])
  .where({
    hidden : function(a) {
      return "hidden returns ["+a+"]"
    },

    main : function() {
      $debug(arguments, "main", "App.Test")

      $p("NOT TEST (true)",
          typeof not === 'function' ? not(false) : "not defined")
      $p("HIDDEN TEST (42)",
          typeof hidden === 'function' ? hidden(42) : "not defined")
      $p("FST TEST (1)",
          typeof fst === 'function' ? fst([1,2,3,4]) : "not defined")
    }
  })

  $main.map(function(main) {
    $p('call main:', main)
    main()
  })

  return {
    modules : $modules
  }
})()
exports = Lead

console.log('Lead:\n', Lead)
console.log("GLOBAL NOT TEST (true)",
              typeof not === 'function' ? not(false) : "not defined")
console.log("GLOBAL HIDDEN TEST (42)",
              typeof hidden === 'function' ? hidden(42) : "not defined")
console.log("GLOBAL FST TEST (1)",
              typeof fst === 'function' ? fst([1,2,3,4]) : "not defined")
