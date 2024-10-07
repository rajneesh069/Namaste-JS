function x() {
  console.log("Rajneesh");
}

const radii = [3, 1, 2, 4];

function calculateArea(radii) {
  return radii.map((radius) => Math.PI * radius * radius);
}

console.log(calculateArea(radii));

const calculateCircumference = (radii) => {
  return radii.map((radius) => Math.PI * 2 * radius);
};

console.log(calculateCircumference(radii));

// Now the above way isn't the best way to write proper code and could be optimized to use higher order functions!
// We'll try to write modular code, and follow the DRY principle.

// We should write a generic function in which we can simply pass functions(logic) and then use it for various purposes.

function calculate(radii, logic) {
  // now this function does one job only: apply the logic to each element and then return an array
  const output = []; // output array which will be returned from this calculate higher order function
  for (let i = 0; i < radii.length; i++) {
    output.push(logic(radii[i])); // simply apply the logic and push into the output array
  }

  return output;
}
const area = (radius) => {
  return Math.PI * radius * radius;
};
const areas = calculate(radii, area);
console.log(areas);

// We can re-use the calculate function for various logics

const diameter = (radius) => {
  return 2 * radius;
};

const circumference = (radius) => {
  return 2 * Math.PI * radius;
};

console.log(calculate(radii, diameter));
console.log(calculate(radii, circumference));

// To use the function like this: radii.calculate(logic) => use Array.prototype.fn

Array.prototype.calculate = function (logic) {
  const output = [];
  for (let i = 0; i < this.length; i++) {
    output.push(logic(this[i]));
  }
  return output;
};

console.log(radii.calculate(area));
