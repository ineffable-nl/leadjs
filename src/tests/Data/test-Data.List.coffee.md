# Test: Data.List

    require("../../lib/Lead")
    .module("Test.Data.List")
    .exports(
      "main"
    )
    .imports("Data.List")
    .where
      
      main : ->
        a = [1,2,3,4,5]
        
        console.log "Run main Test.Data.List"
        console.log "a        = #{a}"
        console.log "head a   = #{head   a}"
        console.log "last a   = #{last   a}"
        console.log "tail a   = #{tail   a}"
        console.log "init a   = #{init   a}"
        console.log "nil a    = #{nil    a}"
        console.log "length a = #{length a}"
        
        b = []
        console.log "b        = #{b}"
        console.log "head b   = #{head   b}"
        console.log "last b   = #{last   b}"
        console.log "tail b   = #{tail   b}"
        console.log "init b   = #{init   b}"
        console.log "nil b    = #{nil    b}"
        console.log "length b = #{length b}"
