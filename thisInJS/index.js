"use strict";

console.log(this); // it represents the global object which depends on the runtime environment JS is being run on. For browsers it is window,
//for Node.js it is an empty object


function someFn() {
    console.log(this); // in strict mode it is `undefined`, in non-strict mode a phenomenon called this substitution happens which substitutes
    // this with the global object if it is 'undefined' or 'null'
}

someFn();

window.someFn(); // now this points to the window object, so 'this' also depends on the reference with which the function has been called with

const obj = {
    a: 10,
    x: function () {
        console.log(this);
    }
}

obj.x(); // here the 'this' keyword represents the whole object itself.

const obj2 = {
    a: 20,
    x: () => {
        console.log(this);
    }
}

obj2.x(); // here `this` is the window object because arrow functions don't have their own this, rather they retain the value of `this` from 'enclosing lexical environment' which in this case is global hence window object. 

const obj3 = {
    a: 30,
    x: function () {
        (() => {
            console.log(this);
        })();
    }
}

obj3.x(); // now it represents the obj3 because it retains it's enclosing lexical environment which in this case is the object itself!
