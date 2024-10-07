a();
b(); // throws type error as b is undefined initially until the RHS executes

// Function Statement aka Function Declaration
function a() {
    console.log("a called!")
}

// function expression: function acts like a value

var b = function () {
    console.log("b called");
}

// Anonymous function: They are used where we need them as values.
/* function (){
    console.log("This will result in a syntax error because functions must have a name!");
} */

// Named function Expression
const c = function xyz() { // xyz is not created in the global scope. 
    console.log(xyz); // it can be accessed here!
    console.log("Hello from xyz!");
}
// we cannot call it using xyz though.


// Difference between parameters and arguments
function someFn(param1, param2) { // param1 and param2 are parameters
    console.log(param1, param2);
}

someFn(1,2); // 1 and 2 are arguments

// First Class functions: The ability of functions to be used as values, returned as values or be passed as an argument into another function
// is known as first class functions in JS.

// First class citizens = First Class Functions

// Arrow Functions: They come as a part of ES6.