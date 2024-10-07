# Types Of Queues, Execution of Async Tasks and Deep dive into Fetch API

In JavaScript, the Event Loop model is built around different types of queues that manage tasks based on their priority. The two most important types of queues are:

## 1. Callback (Task) Queue (also called Macro Task Queue)

- What it is: This is the queue where standard tasks (or macro tasks) are pushed, such as:
  - I/O operations (like `setTimeout`, `setInterval`, `DOM events`).
  - User interactions (e.g., `click` event listeners).
  - Network requests (e.g., `fetch`, `XMLHttpRequest`).
- When it's used: Tasks in the callback queue are processed once the call stack is empty.
- Priority: Lower priority compared to the microtask queue. The event loop will only pick tasks from the callback queue once the microtask queue is empty.

Examples:

- `setTimeout`, `setInterval`.
- DOM events like `click`, `keydown`.
- HTTP requests or file read operations.

## 2. Microtask Queue (or Job Queue)

- What it is: This is a high-priority queue used to execute smaller, immediate tasks that need to happen before the event loop processes the next task from the callback queue.
- When it's used: After each task (or macro task) finishes, before the event loop picks up another task from the task queue, it first checks the microtask queue and processes all tasks in it.
- Priority: Higher priority. Before the event loop can proceed to process the next macro task, all microtasks must be executed.

Examples of tasks that go into the microtask queue:

- Promises (resolved or rejected Promise callbacks).
- Mutation Observer (which observes changes to the DOM).
- process.nextTick() in Node.js (this is given even higher priority than Promises).

## Other Components in the Event Loop Model:

1. Rendering Queue: This is specific to the browser environment. After each event loop cycle, the browser performs the rendering step, where it paints any updates to the user interface (UI). This happens after all microtasks are completed.
2. Request Animation Frame Queue: Tasks added via requestAnimationFrame() are queued here. These callbacks are scheduled to run before the next repaint, allowing smooth animations.

## Callback Functions and Queues

Different types of callback functions go into different queues based on how they are triggered:

- Microtask Queue:
  - Promise callbacks: then, catch, and finally callbacks go here.
  - Mutation Observer: A specialized callback function that reacts to DOM mutations.
  - Async/await: Once an async function encounters an await, the rest of the function is treated as a promise, and the code after the await goes into the microtask queue.
- Callback (Task) Queue:
  - setTimeout and setInterval callbacks.
  - Event listeners (e.g., click, keydown).

## Task Priority in the Event Loop

1. The microtask queue is processed before the callback queue after each event loop iteration.
2. Promises and other microtasks (like MutationObserver callbacks) take precedence over macro tasks (like setTimeout, event listeners).
3. After all microtasks are processed, the event loop moves on to the macro task from the callback queue.

# Diving Deep into Fetch

`fetch` itself involves multiple phases.

1. Network Request (fetch):

- When you call fetch, it initiates an asynchronous HTTP request.
- Once the network request completes (either successfully or with an error), the response is passed to the callback functions (then, catch, and finally). These callbacks are placed in the Micro Task Queue because they are attached to promises.

2. then, catch, finally (Promise Callbacks):

- The callback functions in then, catch, and finally are treated as microtasks. These microtasks are executed once the call stack is empty and before the event loop picks up any macro tasks from the Macro Task Queue.

## Why is fetch in the Macro Task Queue?

- The network request itself (the part of fetch that sends and waits for the response) is a macro task(but nothing gets placed in the CallBack Queue, it just falls under this category, its callbacks do go into the microtask queue as they are promises).
- However, the resolution of the returned promise and its associated callback functions (then, catch, finally) are handled in the Micro Task Queue.

```js
console.log("Start"); // Step 1: Logs to the console, pushed to the call stack, then popped out.

setTimeout(() => {
  console.log("Timeout callback executed"); // Step 7: Macro task executed
}, 0); // This goes into the Macro Task Queue.

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((data) => {
    console.log("Fetched data:", data); // Step 6: Microtask executed
  })
  .catch((error) => {
    console.log("Fetch error:", error); // If an error occurs (not in this case)
  })
  .finally(() => {
    console.log("Fetch completed"); // Step 6: Microtask executed after `then`
  });

console.log("End"); // Step 2: Logs to the console, pushed to the call stack, then popped out.
```

### Step-by-Step Execution:

1. `console.log("Start")`:

   - This is a synchronous operation. It is pushed to the call stack and executed immediately.
   - Output: Start.

2. `setTimeout`:

   - setTimeout is called with a delay of 0ms. This schedules the callback function into the Macro Task Queue after the specified delay. The actual callback will execute in the next cycle of the event loop, after the microtasks have been completed.
   - The setTimeout itself is non-blocking and is pushed to the call stack, then removed after scheduling the callback.

3. `fetch`:

   - The fetch call starts an asynchronous operation to make an HTTP request. This is an I/O operation that involves the Macro Task Queue(not directly though, nothing gets placed in the CallBack Queue, it just falls under the category of MacroTask as it is an I/O operaton).
   - The request is sent over the network, and the JavaScript engine doesn’t block for it. The promise returned by fetch is still pending at this point.
   - The fetch call is non-blocking, so it is pushed to the call stack, and then popped off.

### Callback Registration in Browser’s Memory:

1. `setTimeout`:
   - The callback `(() => console.log("Timeout callback executed"))` is registered in the Timer Web API and held in the browser’s memory.
   - The timer starts counting down (0ms in this case). When the timer completes, the callback is placed in the Macro Task Queue.
2. `fetch`:

   - When `fetch` is called, the browser registers the request in the Fetch API or XHR Web API. The fetch request is sent over the network.
   - The response will trigger a promise resolution/rejection, but the callbacks (`then`, `catch`, and `finally`) are stored in the browser’s memory until the network request completes.
   - Once the response arrives, the promise is resolved or rejected, and the callbacks are placed in the Micro Task Queue.

3. `console.log("End")`:

   - This is a synchronous operation that is pushed to the call stack and executed immediately.
   - Output: End.

4. Waiting for the HTTP response (Fetch completes):

   - The fetch network request is handled by the browser. When the network request completes (success or error), the associated promise resolves, and the callbacks (then, catch, finally) are scheduled in the Micro Task Queue.

5. Processing Microtasks (Promise callbacks):

   - After the synchronous code completes (i.e., the call stack is empty), the event loop first checks the Micro Task Queue.

   - The promise-related callbacks (then, catch, finally) are placed in the Micro Task Queue.

   - The first `then` callback is executed:

     - console.log("Fetched data:", data) is pushed to the call stack.
     - Output: Fetched data: {id: 1, title: "sample data", ...}.

   - The finally callback is executed next:

     - console.log("Fetch completed") is pushed to the call stack.
     - Output: Fetch completed.

6. Processing Macro Tasks (setTimeout callback):

   - After all microtasks are processed, the event loop goes to the Macro Task Queue.
   - The setTimeout callback is picked up from the macro task queue and pushed to the call stack.
   - The setTimeout callback is executed:
     - console.log("Timeout callback executed") is pushed to the call stack.
     - Output: Timeout callback executed.

### Final Output Order:

1. Start
2. End
3. Fetched data: {id: 1, title: "sample data", ...}
4. Fetch completed
5. Timeout callback executed

### Key Points:

1. The promise returned by fetch is resolved or rejected after the network request completes, and its callbacks (then, catch, finally) are added to the Micro Task Queue.
2. Microtasks have higher priority than macro tasks, so they are processed first.
3. The setTimeout callback is a macro task, so it is processed after all microtasks have been executed.

# What is I/O? Why is Fetch an I/O?

## What is I/O?

I/O stands for Input/Output. In programming, an I/O operation involves interaction with external sources that might not be immediate, and often requires waiting for some external resource or process to complete. This can include:

- File I/O (reading/writing files to disk).
- Network I/O (sending/receiving data over a network).
- Device I/O (interaction with hardware like printers, sensors, etc.).

I/O operations typically involve waiting for a response from an external source. Because of this, they are often handled asynchronously to prevent blocking the main thread.

## How is `fetch` an I/O Operation?

`fetch` is an I/O operation because it interacts with an external network resource—it sends an HTTP request to a server and waits for a response (which could be data, an error, or something else).

Here’s why:

1. Input:
   - When you use fetch, the browser sends a request to a remote server (this is the "output" part).
2. Output:
   - The server processes the request and responds with data or an error (this is the "input" part).

This entire process involves the browser communicating over the network, which means it must wait for a response. Since the wait time can be unpredictable (e.g., slow network, server delays), fetch handles this operation asynchronously.

## Why is fetch Considered an I/O Operation?

The fetch request operates outside the JavaScript engine, and the JavaScript code doesn’t wait for the result of the request to continue executing. Instead, the browser handles this interaction with the network (sending the request and waiting for the response) using the Fetch API, which is part of the browser’s environment (not JavaScript itself).

When the request completes, the response (or error) is returned to the JavaScript code via a promise, and the callbacks (`then`, `catch`, `finally`) are queued up for execution.

## Why is fetch I/O and asynchronous?

The reason fetch is treated as an I/O operation is because network interactions are inherently slow and unpredictable. Instead of making JavaScript wait (which would block the main thread and freeze the UI), the browser handles this I/O operation asynchronously.

## Summary

- `fetch` is an I/O operation because it involves network communication—sending data to a server and receiving a response, which requires waiting.
- JavaScript doesn’t block waiting for this operation to complete. Instead, the fetch request is handled asynchronously by the browser.
- After the I/O operation (network request) completes, the associated promise is resolved, and the callbacks are handled by the Micro Task Queue.
