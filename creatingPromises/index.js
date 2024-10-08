const cart = ["shoes", "pants", "kurta"];

const promise = createOrder(cart); //orderId
console.log(promise); // prints the pending promise object
// consumer part of a promise
promise.then((orderId) => {
  console.log(orderId); // logs the orderId upon successful resolution
  //   proceedToPayment(orderId);
});

// let's implement of createOrder function

// producer part of the promise, i.e., creation of a promise
function createOrder(cart) {
  const pr = new Promise((resolve, reject) => {
    // logic for creating an order
    // validate cart
    // make an API call and get the order Id
    if (validateCart(cart)) {
      const error = new Error("Couldn't Validate Cart.");
      return reject(error); // no need to put the return statement.
    }

    // logic to createOrder
    const orderId = "12345";
    if (orderId) {
      // let's simulate a fake time lapse to show how async operations work
      setTimeout(() => {
        resolve(orderId);
      }, 5000);
    }
  });

  return pr;
}

function validateCart(cart) {
  return cart.length === 0; // we can invalidate the cart just to see rejection of the promise
  // by inverting the condition
}

function proceedToPayment(orderId) {
  return new Promise((res, rej) => {
    if (Math.random() > 0.5) {
      res({ message: "Payment Successful", orderId });
    } else {
      rej({ message: "Payment Unsuccessful", orderId });
    }
  });
}

// let's chain promises
createOrder(cart)
  .then((orderId) => {
    // whatever is returned in one .then() is passed onto the following .then() methods
    return proceedToPayment(orderId); // return the promise so that it is passed in the following then methods
  })
  .then((status) => {
    console.log(status);
  })
  .catch((error) => {
    console.log(error);
  })
  .then(() => console.log("This will run no matter what!"));

// Now the above code demonstrates promise chaining and how one can handle errors using catch

// We can also put .catch() in between the .then() methods to handle individual promise errors

/* Although, one shouldn't always put .catch() in between everywhere, 
it depends on the situation. */

/* If there was only one .catch() in the end of the promise chain, then if any of the promises
got rejected, it will simply catch error and throw it and no further promises would run */

/* So, if we want that even if one or more promises fail in between, then we handle their errors
and move forward with others we can put the .catch() methods for those. */

// Promise Hell
createOrder(cart)
  .then((orderId) => {
    // we can do this as well, but this will lead to promise hell!
    proceedToPayment(orderId)
      .then((status) => console.log(status))
      .catch((error) => console.log(error));
  })
  .catch((error) => {
    console.log(error);
  })
  .then(() => console.log("This will run no matter what!"));
