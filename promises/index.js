const cart = ["Shoes", "Pants", "Shirts"];

createOrder(cart); // generates Order Id

proceedToPayment(orderId); // shows the payment page

// design of APIs before promises
createOrder(cart, function () {
  proceedToPayment(orderId, function (paymentInfo) {
    updateWalletBalance();
  });
});

// suppose the function was written like this
function createOrder(cart, proceedToPaymentCallback) {
  // make a server call with the given cart to update the cart, which returns an orderId upon checkout
  proceedToPaymentCallback(orderId); // pass the control to another function => inversion of control!
}

// if the code is buggy in the proceedToPaymentCallback(orderId) then the whole logic would be jeopardised leading to errors!
// also, it's very hard to keep track of callback functions passed into one another and the callback logics can't be trusted blindly

// that's why we will use promised based callback handling

const promise = createOrder(cart); // it will take some time

//{data : undefined} // promise is an object and while it's not finished until then the data object will be undefined
// and once it has finished executing it will simply have the data returned by the createOrder(cart) function in this case.

// after it's done executing it will have {data: orderDetails} in it.

promise
  .then(function (orderId) {
    // here we are attaching a cb function and now promise will call it for sure.
    return proceedToPayment(orderId); // to chain promises we must return them, make sure it's there
  })
  .then((paymentInfo) => {
    showOrderSummary(paymentInfo);
  });

// let's write the actual promise now and see how things work

const GITHUB_API = "https://api.github.com/users/rajneesh069";

const user = fetch(GITHUB_API);

// till the promise is pending, i.e., neither fulfilled nor rejected the user object would be in pending state, with result
// as undefined.

// Once it is fulfilled, the user will have the response
