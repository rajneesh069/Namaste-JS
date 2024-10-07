// console.log(a); //gives Reference Error: Cannot access before initialization, because we're trying to access it before initialization
let a = 10; // declared and asssigned at the same time
let b; // b can be assigned a value later in the code
b = 20;

const c = 100; // declaration and assignment in the same line is a must!

/* 
During the memory creation phase these declarations exist in what's called a temporal
dead zone, it could be found under Script scope if checked in the browser.

During the time between the execution of code and them being actually assigned a value
they exist in the temporal dead zone with the placeholder undefined but aren't accessible yet.

Only once they are assigned a value during the code execution phase, which could be undefined for let
variables if the let variable wasn't assigned anything explicitly in the code, they become accessible.

If we try to access them before hand we get the Reference Error, i.e., they cannot be 
accessed before declaration.
*/

console.log(x); // Reference Error: x is not defined, because it doesn't exist, code execution will stop.

console.log(k); // k will be undefined and the code will proceed.
var k = 100; 

/* let d = 10;
let d= 20;
! cannot do this, it's a Syntax Error, the file won't even run!
*/

var kk = 100;
var kk = 1000; // totally okay to do it, kk will become 100 then 1000

/* const c; -> cannot be done, it's a Syntax error */

const dd = 1000; // totally okay.
dd = 10_000; // Gives TypeError, as assignment to a const variable isn't possible.


