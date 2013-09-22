# Test: Prelude

    require("../lib/Lead")
    
    .module("Test.Prelude")
    .exports([
      "main"
      "damn"
    ])
    .where
      main: ->
        console.log "Run main Test.Prelude"
        console.log "fst( [1,2] )", fst([1,2])
        damn()
      
      damn: ->
        console.log "damn! this shit is whack"
