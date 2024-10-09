const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    return rej("p1 rejected");
    // return res("p1 resolved");
  }, 3000);
});

const p2 = new Promise((res, rej) => {
  setTimeout(() => {
    // return res("p2 resolved");
    return rej("p2 rejected");
  }, 1000);
});

const p3 = new Promise((res, rej) => {
  setTimeout(() => {
    return rej("p3 rejected");
    // return res("p3 resolved");
  }, 2000);
});

/* Promise.all() API is a fail fast API, and if any one of the promises get rejected it gives an error 
and stops the execution or else it will wait for all the promises to get resolved and output an array of results 
which could be processed through the .then() method */

Promise.all([p1, p2, p3])
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

/* 
Promise.allSettled() waits for all promises to settle(resolve/reject) and returns an array of the results 
whether it is resolved or rejected.
*/

Promise.allSettled([p1, p2, p3])
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

/* 
Promises.race() waits until the first promise settles(either resolves or gets rejected) and returns its output.
*/

Promise.race([p1, p2, p3])
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

/* 
Promises.any() waits until any one of the promises gets resolved and then it returns its output, if none of the promises resolve, 
it simply returns an array of errors known as Aggregated error.
*/
Promise.any([p1, p2, p3])
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
