# 01eval

    bench = require("./bench")
    fn1 = ->
      Math.sin Math.random()

    console.log "no eval", bench.execute(fn1)
    console.log "yes eval, recreate function", bench.execute(->
      rnd = Math.random()
      eval_ "function fn2() { return Math.sin(" + rnd + "); }"
      fn2()
    )
    console.log "yes eval, reuse function", bench.execute(->
      eval_ "function fn3() { return Math.sin(Math.random()); }"
      tmr = bench.execute(fn3)
    , 1)
    console.log "- of which execution cost:", tmr
