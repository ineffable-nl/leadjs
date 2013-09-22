console.log('Lead', Lead)

for (var m in Lead.modules) {
  console.log('module loaded:', m)
}

var m = Lead
  .module('example01', [])
  .import('Prelude')
  .where(function() {
    function example() {
      console.log('example01 example')
    }

    function main() {
      console.log("main")
      console.log("testFunction", testFunction, testFunction())

      arr = ['a', 'b', 'c']
      console.log(head(arr))
    }
  })

console.log('module', m)

for (var m in Lead.modules) {
  console.log('module loaded:', m)
}

