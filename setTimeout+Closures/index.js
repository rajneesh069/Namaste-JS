function x() {
    var i = 1;
    setTimeout(function () {
        console.log(i);
    }, 1000);
}
x(); // prints 1 after 1 second

function y() {
    var i = 1;
    setTimeout(function () {
        console.log(i);
    }, 1000);
    console.log("Hello World")
}
y(); // prints Hello World first while waiting for timeout to finish
// and then prints 1.

// If we were to print 1 to 5 after each second, i.e., 1 after 1 sec.
// 2 after 2 seconds and so on, how can we do it?
function z() {
    for (var i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, i * 1000);
    }
}
z(); // this actually outputs 6 -> 5 times with the desired intervals of time
// But why?
// Because of closures, as the function in setTimeout remembers the reference of 'i'
// which results in i being printed 6 -> 5 times, as the loop broke at i = 6.

// How to fix that?
// We need to pass in a new copy of 'i' in the lexical environment of
//the function, one way to do that, is by setting 'var' to 'let'. Since 'let' is
// block scoped each time new 'i' will be created altogether in between the iterations.

// The other way is enclosing the setTimeout in  function which takes a parameter x,
// and eventually we call it and that makes a new 'i' every time as such:

function d() {
    for (var i = 1; i <= 5; i++) {
        function closure(x) {
            setTimeout(function () {
                console.log(x);
            }, x * 1000);
        }
        closure(i);
    }
}
d(); // Now we get 1 -> 2 -> 3 -> 4 -> 5

/* 
OR
function d() {
    for (let i = 1; i <= 5; i++) {
            setTimeout(function () {
                console.log(x);
            }, x * 1000);
    }
}
d();
*/