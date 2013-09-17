var bench=require('./bench');

var fn1 = function() {
  return Math.sin(Math.random());
}
console.log('no eval', bench.execute(fn1));

console.log('yes eval, recreate function', bench.execute(function() {
  var rnd = Math.random();
  eval('function fn2() { return Math.sin('+rnd+'); }');
  fn2();
}));

console.log('yes eval, reuse function', bench.execute(function() {
  eval('function fn3() { return Math.sin(Math.random()); }');
  tmr = bench.execute(fn3);
}, 1));
console.log('- of which execution cost:', tmr);
