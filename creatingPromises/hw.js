const cart = ["shoes", "pant", "kurta"];

function createOrder(cart) {
  return new Promise((res, rej) => {
    if (!validateCart(cart)) {
      return rej("Error validating the cart, please add an item.");
    }

    const orderId = parseInt(Math.random() * 50000);
    return res({
      message: "Cart is valid, user can proceed to payment!",
      orderId,
    });
  });
}

function proceedToPayment(orderId) {
  return new Promise((res, rej) => {
    if (orderId) {
      setTimeout(() => {
        res({
          message: "Payment successful",
          orderId,
          paymentInfo: {
            Amount: Math.random() * 20000,
            Bank: "State Bank of India",
            IFSC: "SBIN011232",
            Mode: "Online",
            Gateway: "Razorpay",
          },
        });
      }, 3000);
    } else {
      rej({
        message: "Couldn't proceed to payment",
        paymentInfo: {
          Amount: Math.random() * 20000,
          Bank: "State Bank of India",
          IFSC: "SBIN011232",
          Mode: "Online",
          Gateway: "Razorpay",
        },
      });
    }
  });
}

function showOrderSummary(orderSummary) {
  return new Promise((res, rej) => {
    return res(orderSummary);
  });
}

function updateWallet(orderSummary) {
  return new Promise((res, rej) => {
    if (orderSummary.paymentInfo.Amount !== 0) {
      setTimeout(() => {
        res({ message: "Wallet Updated", balance: 50000 });
      }, 5000);
    } else {
      rej("No money was deducted");
    }
  });
}

function validateCart(cart) {
  return cart.length !== 0;
}

createOrder(cart)
  .then((orderId) => {
    return proceedToPayment(orderId);
  })
  .catch((error) => console.error(error)) // even if the payment isn't successful we need to show the order summary
  .then((orderSummary) => showOrderSummary(orderSummary))
  .then((orderSummary) => updateWallet(orderSummary))
  .catch((error) => console.error(error))
  .finally(() => console.log("Process complete."));
