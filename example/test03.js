// "use strict";

var p=console.log;

var space = {c : function() { return 'we'; }};

var a = (function(){
  p('a constructor', this);
  that = this;

  return {
    fn1 : function(){
      p('in fn1()', this);
      p('that.c()', that.c());
      return 'afn1';
    }
  }
}).call(space);

var b = {
  bn1 : function() {
    return 'bn1>'+this.bn2();
  },
  bn2 : function() {
    return 'bn2';
  }
};

a.fn2 = function() {
  p('in fn2()', this);
  return 'afn2;'
}


p("a.fn1()", a.fn1());
p("a.fn2()", a.fn2());
