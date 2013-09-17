
var p=console.log
p((new Array(20)).join("\n"))
var k = 'value'

// function test(a,b) {
//   p('this in test scope', this)
//   p('>>>> value in test scope:')
//   p('>>>>>::::>>>>>', value)

//   return a*b*value
// }

var testModule = function() {
  value = 123
  test = function(a,b) {
    r = 'a = '+a+', b = '+b
    p("test called:",r)
    return r
  }

  callTest = function() {
    // eval('value=512')
    // var r = eval.call(this, '(function(){ with({value:512, test: this.test}) {
    // console.log("value", value); return test.call(this, 3,4) } } ).call(this)')

    p('callTest returns:', test(3, 9))
    return r
  }


  return {
    callTest : function() {
      return callTest.apply(this, arguments)
    }
  }
}

// value = 1346172
// p('value before eval', value)

var scp = new testModule()
p('scp', scp)
// scp.prototype.callTest = function() {
//   return callTest.apply(this, arguments)
// }
scp.callTest()

// p('value after eval', value)
