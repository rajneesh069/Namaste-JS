/* 
In the context of JavaScript (JS), polyfilling means adding code that implements modern JavaScript features in environments (usually older browsers) where those features are not natively supported. A polyfill is typically a script that "fills in" the gaps in functionality that a browser or environment lacks.
*/

// Example of polyfilling:
// Polyfill for Array.prototype.includes
if (!Array.prototype.includes) {
    Array.prototype.includes = function (element) {
        return this.indexOf(element) !== -1;
    };
}
// Basically adding our own custom implementation of features if not given by JS version one is using.

// Let's implement .map(), .filter(), .reduce() and .bind() polyfills

Function.prototype.myBind = function (...args1) {
    // Here `this` points to the function which calls the .myBind() function
    const originalFunc = this; // Save reference to the original function
    return function (...args2) {
        //  this.apply(args1[0], [...args1.slice(1), ...args2]); => this here is global object because it's in a function
        // and isn't being called using some kind of object.

        // or we can use arrow function instead of a regular anonymous function which will take this from the enclosing lexical scope
        return originalFunc.apply(args1[0], [...args1.slice(1), ...args2]);
    }
}

Array.prototype.myMap = function (cb) {
    let output = [];
    // here this points to the array which calls the .myMap() function on itself.
    for (let i = 0; i < this.length; i++) {
        output.push(cb(this[i], i, this));
    }

    return output;
}

Array.prototype.myFilter = function (cb) {
    let output = [];

    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) output.push(this[i]);
    }

    return output;
}

Array.prototype.myReduce = function (cb, initialAccValue) {
    let output = initialAccValue === undefined ? this[0] : initialAccValue;

    for (let i = 0; i < this.length; i++) {
        output = cb(output, this[i]);
    }

    return output;
}
