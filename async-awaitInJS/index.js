async function getData() {
    return "Namaste";
}

const dataPromise = getData();
dataPromise.then((res) => console.log(res));

const p = new Promise((res, rej) => {
    res("Promise Resolved")
});

async function getData2() {
    return p; // a new promise won't be returned the promise would be returned as it is
}

const dp = getData2();

dp.then((res) => console.log(res));

function getTheData() {
    p.then((res) => console.log(res))
}

getTheData(); // Promise Resolved

async function getTheDataUsingAwait() {
    const val = await p;
    return val;
}

console.log(getTheDataUsingAwait());


const p1 = new Promise((res, rej) => {
    setTimeout(() => {
        res("Promise resolved after 10 seconds.")
    }, 10000)
})

function resolvePromiseTheTraditionalWay() {
    // JS engine will not wait for the promise to be resolved
    p.then((res) => console.log(res));
    console.log("Rajneesh");
}

resolvePromiseTheTraditionalWay();
/* 
    Rajneesh
    Promise Resolved after 10 seconds
*/

async function resolvePromiseUsingAsyncAwait() {
    console.log("Hello World")
    const val = await p1;
    console.log("Hello Rajneesh");
    console.log(val)
    return val;
}

resolvePromiseUsingAsyncAwait();
/* 
        Hello World
After 10 seconds,
        Hello Rajneesh 
        Promise Resolved Value
*/

async function resolvePromiseUsingAsyncAwait2() {
    console.log("Hello World")
    const val = await p1;
    console.log("Hello Rajneesh");
    console.log(val)
    return val;
}


const p3 = new Promise((res, rej) => {
    console.log("Inside executor function, it runs synchronously right at the moment this line runs in the Code Execution Phase!");
    setTimeout(() => {
        res("Promise Resolved after 20 seconds.")
    }, 20_000)
    console.log("setTimeout has been sent to Web APIs and now the timer of 20s has started.\n")
});

const p4 = new Promise((res, rej) => {
    console.log("Inside executor function, it runs synchronously right at the moment this line runs in the Code Execution Phase!");
    setTimeout(() => {
        res("Promise Resolved after 10 seconds.")
    }, 10_000)
    console.log("setTimeout has been sent to Web APIs and now the timer of 10s has started.\n")
});

async function handlePromise() {
    console.log("This line will run the moment this function is called.\n")

    const result1 = await p3; // here the function execution will be suspended
    console.log("This line will only run once the result has been assigned to the resul1 variable, till then the function execution is suspended.")
    console.log("result1:", result1);

    const result2 = await p4;
    console.log("This line will only run once the result from p4 has been assigned to result2 variable, till then the function is again suspened");
    console.log("result2:", result2);

    console.log("This line will run once, all the promise results have been logged and in this case both would have been logged simultaneously because in 20s both promises got resolved/fulfilled.\n")

}

handlePromise();

console.log("Till handlePromise() function is suspended this line will run in Call Stack.\n")

async function handlePromise2() {
    console.log("This line will run the moment this function is called.\n")

    const result2 = await p4;
    console.log("This line will only run once the result from p4 has been assigned to result2 variable, till then the function is again suspened");
    console.log("result2:", result2, "\n");

    const result1 = await p3; // here the function execution will be suspended
    console.log("This line will only run once the result has been assigned to the resul1 variable, till then the function execution is suspended.")
    console.log("result1:", result1, "\n");



    console.log("This line will run once, all the promise results have been logged but in this case result2 would have been logged after 10s and then after 10s again the result1 was logged. Because in the first 10s only p4 got resolved but p3 needed 10 more seconds to resolve\n")

}

handlePromise2();

console.log("Till handlePromise2() function is suspended this line will run in Call Stack.\n")