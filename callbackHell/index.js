// let's take an example of an e-commerce application
// here's the flow: add items to cart => proceed to checkout => show order summary => update user's wallet
// these are needed to be done one after the other and suppose there's an api for all of it.

// the code would look like this:

api.addToCart(cart, function () {
  api.proceedToPayment(order, function () {
    api.showOrderSummary(wallet, function () {
      api.updateUserWallet(wallet);
    });
  });
});

// as we can see that the callbacks are being passed one into the another and this makes the code unreadable and unmaintainable
// the structure is called Pyramid Of Doom

/* the above code also poses a problem of inversion of control where we give the control of one function to another callback
and so on and eventually losing control of the main function. */ 