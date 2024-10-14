/* const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve("Initial promise resolved!");
    } else {
      reject("Initial promise rejected!");
    }
  }, 1000);
});

promise1
  .then((result) => {
    console.log(result); // Will log if resolved
  })
  .catch((error) => {
    console.error(error); // Will log if rejected
    // Returning a new promise from .catch()
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("Promise from catch resolved!");
        } else {
          reject("Promise from catch rejected!");
        }
      }, 1000);
    });
  })
  .then((result) => {
    console.log("Here");
    console.log(result); // Will log if the promise from catch resolves
  })
  .catch((error) => {
    console.error(error); // Will log if the promise from catch rejects
  });
 */

/* const firstPromise = new Promise((res, rej) => {
  const value = Math.random();
  if (value > 0.5) {
    res({ message: "First Promise Resolved.", value });
  } else {
    rej({ message: "First Promise Rejected", value });
  }
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      res("Second Promise resolved after 2s.");
    } else {
      rej("Second Promise rejected after 2s.");
    }
  }, 2000);
});

const thirdPromise = new Promise((res, rej) => {
  res("Too lazy to reject, sorry guys, third promise resolved!");
});

firstPromise
  .then((firstPromiseResult) => {
    console.log("does this run?");
    console.log(firstPromiseResult);
    return secondPromise;
  })
  .catch((firstPromiseError) => console.log(firstPromiseError))

  .then((secondPromiseResult) => {
    console.log("hello:", secondPromiseResult);
    return thirdPromise;
  })
  .catch((secondPromiseError) => {
    console.error(secondPromiseError);
    return 22;
  })

  .then((thirdPromiseResult) => {
    console.log("thirdPromiseResult:", thirdPromiseResult);
  })
  .catch((thirdPromiseError) => console.error(thirdPromiseError));

 */
Function.prototype.myBind = function (...args1) {
  return (...args2) => {
    console.log(this)
    return this.apply(args1[0], [...args1.slice(1), ...args2]);
  }
};

function printName(hometown, state, country) {
  console.log(this.firstName + " " + this.lastName + " is from " + hometown + ", " + state + ", " + country);
}

const obj = {
  firstName: "Rajneesh",
  lastName: "Mishra"
}

const print = printName.myBind(obj, "Gonda", "Uttar Pradesh");
print("India");