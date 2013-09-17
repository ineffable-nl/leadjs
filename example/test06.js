p=console.log;

var a = {
  aFn : function() {
    p('aFnTwo from aFn:', this.aFnTwo());
    return 'aFn function';
  },

  aFnTwo : function() {
    return 'aFnTwo function';
  }
};

var b = {
  bFn : function() {
    p('bFnTwo from bFn:', this.bFnTwo());
    return 'bFn function';
  },

  bFnTwo : function() {
    p('aFn from bFnTwo:', aFn());
    return 'bFnTwo function';
  }
};

var c = function(){

};

(function(){
  var c = {};
  for (var ia in a) {
    p('a function:', ia);
    c[ia]=a[ia];
    // eval('var '+ia+' = '+a[ia].toString());
  }
  for (var ib in b) {
    p('b function:', ib);
    c[ib]=b[ib];
    // eval('var '+ib+' = '+b[ib].toString());
  }

  with(c) {
    p(typeof aFn, typeof aFnTwo, typeof bFn, typeof bFnTwo);
    p(aFn(), aFnTwo(), bFn(), bFnTwo());
  }
})();


p(typeof aFn, typeof aFnTwo, typeof bFn, typeof bFnTwo);
