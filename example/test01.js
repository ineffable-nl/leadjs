if (typeof print==='undefined') { print = console.log; }
var m=require('./test01module.js');

print('---');
print('global scope outside module');
assert('one', 'one == "undefined"', typeof one);
assert('two', 'two == "undefined"', typeof two);
assert('fun', 'fun == "undefined"', typeof fun);
assert('id',  'id  == "undefined"', typeof id );

print('---');
// print(one(), two(), fun(), id(fun()), arr());
//