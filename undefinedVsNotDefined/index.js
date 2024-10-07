console.log(a); // undefined, because of mempry creation phase
var a = 10; // during code execution, a is assigned to be 10.
console.log(a);// 10

// console.log(x); // not defined, because x doesn't even exist in the memory!

a = "hello world";// loosely typed language hence types could be changed later.
console.log(a);// hello world


// bad practice, one shouldn't do it
a = undefined; // it'll work sure, but its not a good practice to do it.
// undefined is more of a placeholder till a variable is assigned some value. 
console.log(a); //undefined
