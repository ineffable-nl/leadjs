(function() {

var p = console.log
var debug = function() {
  p(arguments.callee.caller.toString())
}


var module = function(name) {
  debug("module", arguments)

  return {
    where : function() {
      debug("module.where", arguments)
    }
  }
}


module("Prelude")
.where ({
  not : function(b) { return !b }
})

})()
