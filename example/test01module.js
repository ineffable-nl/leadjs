if (typeof print==='undefined') { print = console.log; }
if (typeof assert==='undefined') {
  assert = function(vars, condition, args) {
    var args = !Array.isArray(args) ? [args] : args,
        fn = new Function(vars, 'return '+condition),
        test = fn.apply(this, args);

    print((test?'   success':'!! FAILED!')+' : '+condition);
  }
}

print('testing bind behaviour');
(function() {
  var base = {
    one : function() { return 1; }
  };

  //   print('---');
  //   print('base constructor')
  //   assert('one', 'one == "function"',  typeof one);
  //   assert('two', 'two == "undefined"', typeof two);
  //   assert('fun', 'fun == "undefined"', typeof fun);
  //   assert('id',  'id  == "function"',  typeof id );
  // };

  var some = function() {
    function fun() {
      return 'funcky funcky';
    };

    print('---');
    print('some constructor')
    assert('one', 'one == "undefined"', typeof one);
    assert('two', 'two == "undefined"', typeof two);
    assert('fun', 'fun == "function"',  typeof fun);
    assert('id',  'id  == "undefined"', typeof id );
  };

  var test01 = function() {
    function two() {
      return 2;
    };
    eval('var one = '+base.one.toString());

    print('---');
    print('test01 constructor');
    assert('one', 'one == "function"', typeof one);
    assert('two', 'two == "function"', typeof two);
    assert('fun', 'fun == "function"', typeof fun);
    assert('id',  'id  == "function"', typeof id );
  };

  // base();
  // some();
  test01();
})();



print('---');
print('global scope');
assert('one', 'one == "undefined"', typeof one);
assert('two', 'two == "undefined"', typeof two);
assert('fun', 'fun == "undefined"', typeof fun);
assert('id',  'id  == "undefined"', typeof id );


// function arr() {
//   return 'arrgh';
// }
