// "use strict";

var p=console.log
// p('\033[2J')
p((new Array(50)).join("\n"))

p("--")
p("test14")
p("--")
p()

var __modules = { }
 ,    modules = { }
 ,     __main = [ ]
 ,       Lead = { }
 ,          L = Lead
 // ,          λ = L

function __launch() {
  for (var name in __modules) {
    var __m = __modules[name]
      ,   t = __m.body
      ,   e = __m.exports
      ,   m =   t(e)

    modules[name] = m
    Lead[name] = m

    // p('MODULAH')
    // p("- __m", __m)
    // p("- t", t)
    // p("- e", e)
    // p("- m", m)

    for (var key in m) {
      var variable = m[key]
      // p("VARIABLE", key, variable)

      if (key==='main') {
        p(" >>> MAIN FOUND <<<")
        __main.push(m[key])
      }
    }

    // p()
    // p("______")
    // p()
  }

  // p(" __main =",__main.call())
  __main.map(function(f) {
    f.call(this)
  }, this)
}

function module(_name, _exports, _body) {
  __modules[_name] =
          { exports : _body||undefined ? _exports : undefined
          , body    : _body||_exports
          }

  // p("__modules -- body", __modules[_name].body)
  // p("          -- exports",__modules[_name].exports)
}

// function exports(variables) {
//   fns = { }

//   for (var i=0; i<variables.length; i++) {
//     var variable = variables[i]

//     if (variable==='main') {
//       p(" >>> MAIN FOUND <<<")
//       __main = fns["main"]
//     }

//     p("variable [", variable, "]", fns[variable])
//   }

//   return fns
// }

module(
  'Prelude'
, function() {
    var main  = function()  { return tst("test")   }
      , fst   = function(l) { return l[0]          }
      , snd   = function(l) { return l[1]          }
      , not   = function(b) { return !b            }
      , tst   = function(t) { return tstH(t)       }
      , tstH  = function(t) { return 'tstH('+t+')' }

    return {
        main : main
      , fst  : fst
      , snd  : snd
      , not  : not
      , tst  : tst
    }
  }
)

module(
  'Data.List'
, [ "Prelude" ]
, function() {
    // Prelude.exports()
    p("Prelude from List", Lead.Prelude)
    // with (Lead.Prelude) {
    eval('var not = Lead.Prelude.not')

    var head    = function(l) { return l[0]                 }
      , last    = function(l) { return l[l.length-1]        }
      , tail    = function(l) { return l.slice(1)           }
      , init    = function(l) { return l.slice(0, -1)       }
      , nil     = function(l) { return length(l)===0        }
      , some    = function(l) { return not(nil(l))          }
      , length  = function(l) { return l.length             }
      , map     = function(f, l) { return l.map(f)          }
      , reverse = function(l) { return l.slice(0).reverse() }
      , id      = function(l) { return l                    }
      , main    = function() {
        var a = [1,2,3,4,5]
        p('Data.List', a)
        p('- head   ', head(a))
        p('- last   ', last(a))
        p('- tail   ', tail(a))
        p('- init   ', init(a))
        p('- nil    ', nil(a))
        p('- some   ', some(a))
        p('- length ', length(a))
        p('- map    ', map(function(x) { return x*2 }, a))
        p('- reverse', reverse(a))
        p('- id     ', id(a))
      }
    return { main : main,
        head    : head
      , last    : last
      , tail    : tail
      , init    : init
      , nil     : nil
      , length  : length
      , map     : map
      , reverse : reverse
    }
})

__launch()
// p()
// p(' __modules =', __modules)
// p('   modules =',   modules)
