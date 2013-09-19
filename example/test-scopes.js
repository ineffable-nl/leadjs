(function() {

  p=console.log

  function inner() {
    globalVar /= 2
    localVarA *= 16
    p("    inner()")
    p("    - globalVar", globalVar)
    p("    - localVarA", localVarA)
    p("    - localVarB", localVarB)
  }

  function outer() {
    var localVarA = 42
    var localVarB = 84
    globalVar = 24

    p("  outer()")
    p("  - globalVar", globalVar)
    p("  - localVarA", localVarA)
    p("  - localVarB", localVarB)

    inner()
  }

  var o = outer()

  p("private global")
  p("- globalVar", globalVar)
  p("- localVarA", localVarA)
  p("- localVarB", localVarB)

})()
