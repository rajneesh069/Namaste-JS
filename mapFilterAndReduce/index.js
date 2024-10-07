// map, filter and reduce

const arr = [5, 1, 3, 2, 6];

// Double => [10, 2, 6, 4, 12]

// Triple => [15, 3, 9, 6, 18]

// Binary => ["101", "1" , "11", "10", "110"]

// map
console.log(arr.map((el) => el * 2));
console.log(arr.map((el) => el * 3));
console.log(
  arr.map((el) => {
    let str = new String("");
    while (el !== 0) {
      const rem = el % 2;
      str += rem;
      el = parseInt(el / 2);
    }
    return str.split("").reverse().join("");
  })
);

// filter: To filter out values in an array based on some logic which returns true or false. Truthy values will be added
// to the new array which is returned by the filter function

console.log(
  "Odd Values:",
  arr.filter((el) => el % 2 !== 0) // write the logic for which you wanna filter out the values
);

console.log(
  "Even Values:",
  arr.filter((el) => el % 2 === 0)
);

console.log(
  "Values greater than 4:",
  arr.filter((el) => el > 4)
);

function sum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

console.log("sum:", sum(arr));

// we can use array.reduce() here because we need to iterate over the array and find a single value based on some logic(addition).

const arraySum = arr.reduce((acc, el) => acc + el, 0); // whatever is returned in the callback function is updated in the accumulator parameter
console.log("array sum:", arraySum);

const max = arr.reduce((acc, el) => {
  if (acc < el) {
    // return the element if it's greater than the current accumulator, and update it, else keep the accumulator same
    return el;
  }
  return acc;
}, arr[0]);
console.log("max value:", max);

const users = [
  { firstName: "akshay", lastName: "saini", age: 26 },
  { firstName: "rajneesh", lastName: "mishra", age: 22 },
  { firstName: "sachin", lastName: "mishra", age: 22 },
  { firstName: "akshita", lastName: "joshi", age: 22 },
  { firstName: "johnny", lastName: "depp", age: 57 },
];

// print list of full names
console.log(users.map((user) => user.firstName + " " + user.lastName));

// find the number of users with a particular age => use reduce! because we need to find one value for each age
// {26 : 1, 22 : 3, 57:1}
const mapOfAges = users.reduce((acc, curr) => {
  if (acc[curr.age]) {
    acc[curr.age]++;
  } else {
    acc[curr.age] = 1;
  }
  return acc;
}, {});

console.log(mapOfAges);

// find first name of all people whose ages are less than 30
const output = users
  .filter((user) => user.age < 30)
  .map((user) => user.firstName);
console.log(output);

// we can reduce for the same thing as well

const output2 = users.reduce((acc, curr) => {
  if (curr.age < 30) {
    acc.push(curr.firstName);
  }
  return acc;
}, []);
console.log(output2);
