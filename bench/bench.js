exports.execute = function(fn, amount) {
  var start = (new Date()).getTime(),
      amount = amount||100000;

  // console.log('do it', amount, 'times');

  for (var i=0; i<amount; i++) {
    fn();
  }

  var elapsed = ((new Date()).getTime() - start);

  return elapsed;
}
