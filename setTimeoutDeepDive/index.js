// Remember: GEC get's popped off when the callback functions of Web APIs run as they run only after synchronous functions finish
// execution
console.log("start");

setTimeout(() => {
  // setTimeout guarantees atleast 5 seconds of the callback function running
  console.log("Callback, runs in atleast 10 seconds.");
}, 5000);

const startDate = new Date().getTime();
let endDate = startDate + 10_000;
while (new Date().getTime() < endDate); // runs for 10 seconds

console.log("End");

// so now the setTimeout will take atleast 15 seconds(5 seconds of the timer + 10 seconds of the while loop) and then will run
// after the console.log("End");

setTimeout(() => {
  console.log("Runs in atleast 0 seconds.");
}, 0);

// setTimeout will always be sent to the Web APIs then the timer of even 0s will be set and it'll go to the callback queue and then
// it comes to the call stack
