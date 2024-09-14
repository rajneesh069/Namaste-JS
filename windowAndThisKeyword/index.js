/* even in this empty JS file, the JS engine still creates GEC and does a lot of things, let's talk about them. */
/* 
1. A global window object is created with a lot of properties inside along with the ones that are defined in the global
scope.
2. What is global scope?
Ans. If a function/variable is defined outside any function's scope it is considered to be global and is attached
to the window object.
3. This keyword is intialized with the global window object and points to it. 
4. Obviously, in an empty JS file there's just the  Memory Creation Phase and GEC is popped off in the Code Execution
Phase as there's no code to run!
*/

var a = 10; // global variable, attached to the window object

function a() {
    var x = 10; // variable local to this function and isn't attached to the window object created when GEC is created
}

/* Both of them print the same thing because a is attached to the window object and if nothing is written infront
of a then it is assumed to be in global scope. */
console.log(window.a);
console.log(a);
console.log(this === window); //this points to the global window object by default if the JS file is empty, hence prints true.
