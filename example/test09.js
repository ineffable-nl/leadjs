var p = console.log
p()
p("---")
p("test09")
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
    , _body = null
    ;

  return {
    where : function(body) {
      delete this.where;
      for (k in _defines) {
        _scope[k] = body[k];

        this[k] = (function(n) {
          p('name', n)
          return body[k].apply(this, arguments);
          // return eval(k+'.apply(this, arguments);');
        })(k);
        if (k==='main') {
          p('main =', this[k])
          main = this[k];
        }
      }

      return this;
    }
  }
}

var a = module('App.Test',
  { main : []
  , fn : []
  , test : []
  }
)
.where({
  main : function() {
    p('called main entry point')
    p('call local fn')
    p('this =',this)
    p('fn', fn)
    p(fn())
    return 'main returns';
  },

  fn : function() {
    p('fn called')
    p('calling test', p(this.test()))
    return 'fn returns';
  },

  test : function() {
    p('test called')
    return 'test returns';
  }
});

p('main')
// p('as function:', main)
// p('executed:', main())
p(main())
