
getName(); // this prints Hello ofcourse
console.log(x); // this prints undefined

console.log(getName)
/* 
    Output of above statement: Even before we define the function we get the body, why?
    ƒ getName() {
    console.log("Hello");

    Because of the memory creation phase.
}
*/


var x = 7;
function getName() {
    console.log("Hello");
}

getName(); // this prints Hello
console.log(x); // this prints 7

// but if we remove the statement var x = 7, then we'll see an error in the console saying that
// x is not defined, which is NOT THE SAME AS undefined.

console.log(getName)
/* 
    Output of above statement:
    ƒ getName() {
    console.log("Hello");
}
*/

someFn(); // gives error that someFn is not a function
/* 
Because during the memory creation phase it was treated as avariable because of var
and was assigned the value undefined.
*/

var someFn = () => {
    console.log("Just some fun!")
}

