function x() {
    var a = 7;
    function y() {
        function z() {
            console.log(a);
        }
        return z;
        // or 
        /*  return function z() {
             console.log(a);
         }; */
    }
    return y();
}
var xz = x();
xz(); // 7, it remembers the lexical(in hierarchy) scope around it.
console.log("Hello")

/* 
You can think of it like this: When you call that inner function, you just simply go to that actual place of declaration
and execute the function as if it was called from it's place of declaration only.
*/

function l() {
    var a = 7;
    function m() {
        console.log(a);
    }
    a = 100;
    return m;
}

var s = x();
console.log(s);
s(); // it keeps the variables' references in memory
// and it isn't garbage collected when a closure is returned