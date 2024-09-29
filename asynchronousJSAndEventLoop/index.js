console.log("start"); //console WEB API called
// it is plugged through window in our code. 

setTimeout(() => {
    console.log("Hello");
}, 5000); // window calls the setTimeout API, puts the callback function in memory and the timer starts
// in the browser and the code starts running forward

console.log("End"); // console API prints End

// GEC is popped off the stack
/* after this, when 5 seconds are complete the callback fn in
set timeout is pushed in the call back queue and then that
function is pushed onto the call stack(provided its empty)
and an execution context of the callback(cb) function is created
and the function is executed */


// GEC is pushed onto the stack

console.log("start"); // console API is called to print 'start'

document.getElementById("btn").addEventListener("click", () => {
    console.log("clicked")
}); // window object calls the DOM API and registers its callback in the memory and attaches the click event to it,
// and this callback waits for its execution to be pushed into the callback queue
// and then to the call stack by the event loop when the user clicks, until then,
//it's in the memory

console.log("end"); // console API is called and 'end' is printed

// GEC is popped off the stack


// GEC is pushed onto the stack
console.log("start"); // console API is called and 'start' is printed

setTimeout(() => { // the callback is registered in the memory and Timer is started
    console.log("setTimeout callback!")
}, 2000);

fetch("https://api.netflix.com") // fetch API is called and the Browser waits for the response
    .then((result) => { // the callback is placed in memory until the response is received
        console.log("Fetch API:", result)
    })
    .catch((error) => { // this callback is also there in the memory
        console.error(error);
    })
// the correct callback will be placed in microtask queue depending on the resolution/rejection of the promise.
console.log("end") // console API is called and 'end' is printed

// GEC is popped off the stack

//Let's suppose the request took 50ms to complete
/* 
Now what'll happen is that the callback in the .then() method would be
placed in the microtask queue and will execute before the tasks in Callback queue.

When the timer finishes, the callback in setTimeout will be placed in the Callback queue 
instead of the microtask queue and will be processed once the Micro Task queue is empty.

If there are a lot of tasks in Micro Task Queue then tasks in Callback Queue won't be executed until the microtask queue
finishes, which leads to the 'Starvation' of Macro Task(Callback) Queue'.

What kind of callbacks go into which queue?
1. Promises(then, catch and finally callbacks), Mutation Observer, process.nextTick(in Node.js) -> Microtask Queue
2. setTimeout, setInterval, DOM APIs -> MacroTask or CallBack queue

Event loop in each iteration firstly checks for the Microtask queue, if its empty then it moves onto the MacroTask Queue.
*/