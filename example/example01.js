var ld=require('../lib/Lead.js');

console.log('Lead ld', ld)
for (var m in ld.modules) {
  console.log('module loaded:', m);
}

// print('ld.module', ld.module);

// ld.module('example01', [])
//   .where(function() {
//     importing('App.Test');

//     function example() {
//       console.log('example01 example');
//     };

//     function main() {
//       console.log("main");
//       console.log("testFunction", testFunction, testFunction());

//       arr = ['a', 'b', 'c'];
//       console.log(head(arr));
//     };
//   });
