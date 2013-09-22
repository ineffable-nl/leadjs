# bench

    exports.execute = (fn, amount) ->
      start = (new Date()).getTime()
      amount = amount or 100000
      
      # console.log('do it', amount, 'times');
      i = 0

      while i < amount
        fn()
        i++
      elapsed = ((new Date()).getTime() - start)
      elapsed
