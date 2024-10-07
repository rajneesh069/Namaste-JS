var x = 1;
/* we can invoke/call the following functions before even defining the because of memory creation
phase in the GEC, i.e., hoisting. */
a(); // outputs 1
b(); // outputs 100
console.log(x); // outputs 1
function a() {
    var x = 10;
    console.log(x);
}

function b() {
    var x = 100;
    console.log(x);
}

