// The .call(), .bind(), and .apply() methods are used to control the context of this, i.e., the value of `this` inside a function.
// They are useful in borrowing/sharing functions.

const obj = {
    firstName: "Rajneesh",
    lastName: "Mishra",
};


const obj2 = {
    firstName: "Sachin",
    lastName: "Mishra"
};

function printFullName() {
    console.log(this.firstName + " " + this.lastName);
}

printFullName.call(obj); // Rajneesh Mishra
printFullName.call(obj2); // Sachin Mishra

/* 
    The call method is used to call a function with a particular `this` value. And then the function could be called for any object.
*/

// If a function takes arguments, it can be passed after the this argument like this:

function printEverything(hometown, state, country) {
    console.log(this.firstName + " " + this.lastName + " is from " + hometown + ", " + state + ", " + country + ".");
}

printEverything.call(obj, "Gonda", "Uttar Pradesh", "India"); // Rajneesh Mishra is from Gonda, Uttar Pradesh, India.

// Like that, any number of arguments can be passed in the functions.

printEverything.apply(obj, ["Gonda", "Uttar Pradesh", "India"]);

/* 
    The only difference between call and apply is that, we pass the other arguments in an array and they are processed like call. Function is
    called here as well.
*/

const printName = printFullName.bind(obj); // Returns a copy of the function which has `this` context set to the object, basically binds this printName with `obj`.

printName(); // Rajneesh Mishra

/*  
    Bind function binds a function with an object and sets the this context permanently for that function which is returned. 
    Just like .call() and .apply() we can pass multiple arguments to the function, as follows:
*/

const printEverythingForObj = printEverything.bind(obj, "Gonda"); // Gonda is set as the first argument.
printEverythingForObj("Uttar Pradesh", "India"); // Rest of the arguments are set here, we could have set it before as well.


// Currying using Bind and Closures

/* 
    Currying in JavaScript is a technique where a function is transformed into a series of nested functions, each of which takes a single argument. Instead of passing all arguments at once, you pass them one at a time. The function keeps returning new functions until all arguments have been provided, at which point the final result is computed.
*/

function multiply(x, y) {
    console.log(x * y);
}

const multiplyBy2 = multiply.bind(this, 2); // we don't care about the `this` value passed here.
multiplyBy2(3); // Since the first argument is set before hence whatever is passed here will be taken as y.
multiplyBy2(3, 4); // 4 is ignored, as the first value has been preset using the .bind() method.

const multiplyBy3 = multiply.bind(this, 3);
multiplyBy3(6); // 18

const someConstant = multiply.bind(this, 2, 43);
someConstant(21, 432); // the arguments are ignored and we always get 2*43 = 86, because they have been preset using the .bind() method.


// Currying using Closures

function multiplyAgain(x) {
    return function (y) {
        console.log(x * y);
    }
}

const multiplyByTwo = multiplyAgain(2); // this returns the inner function, which has 'y' as argument hence when we call the multiplyBy2 function
// we can pass any number and that would be multiply by 2 due to the structure.

multiplyByTwo(33); // 66

function addThreeNumbers(x) {
    return function (y) {
        return function (z) {
            console.log(x + y + z);
            return x + y + z;
        }
    }
}

const sum = addThreeNumbers(1)(2)(3);
console.log(sum); // 6