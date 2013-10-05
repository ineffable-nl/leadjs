console.log("Lead", Lead)

for (var m in Lead.modules) {
  console.log("module loaded:", m)
}

var m = Lead
  .module("example01", [
    "main"
  ])
  .where({
    main : function() {
      console.log("main called")
    }
  })

console.log("module", m)
