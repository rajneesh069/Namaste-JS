# JavaScript Basics and Essentials

## Everything in JS happens inside an `Execution Context`

- Assume it to be a box of two columns namely, Memory and Code.
  | Memory | Code |
  |--------|------|
  |key : value| Code Line 1|
  |key1 : value1| Code Line 2|

So, in the memory component, all the variables and functions are stored like key-value pairs. Memory component is also called Variable Environment.

In the code component, the code is executed one line at a time one by one, which is also known as thread of execution.

## JS is a synchronous single threaded language.

- Single Threaded and synchronous: It can execute only one command at a time(single threaded), in a specific order, i.e, after the line is done executing(synchronous) then only it moves onto the next one.

## How JS code is executed?

- We have a Global Execution Context, and for each function call its own execution context is created.

- Consider this code snippet, let us run the code as JS would.

```js
1. var n = 2;
2. function square(num) {
3.      var ans = num * num;
4.      return ans;
5. }
6. var square2 = square(n);
7. var square4 = square(4);
```

- The Global Execution Context(GEC) is created in two phases.

  1. Memory Creation Phase
  2. Code Execution Phase

- Phase 1: Memory Creation

| Memory                            | Code |
| --------------------------------- | ---- |
| n : undefined                     |      |
| square : {...whole function body} |      |
| square2 : undefined               |      |
| sqaure4 : undefined               |      |

- Phase 2: Code Execution

1. Line 1 runs and assigns n = 2.
2. Line 2 to 5 is skipped as there's nothing to execute.
3. Line 6 runs and creates a Execution Context as there's a function call. Let's have a look at the call stack right now.

- Phase 1: Memory creation for the function's context
  | Memory | Code |
  | --------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
  | n : 2 | <table><tr><th>Memory</th><th>Code</th></tr><tr><td>num: undefined</td><tr><td>ans: undefined</td></tr></tr></table> |
  | square : {...whole function body} | |
  | square2 : undefined | |
  | sqaure4 : undefined | |

4. After this same thing happens as it happened in the code execution phase for GEC, i.e, `the value num is assigned to be n from GEC as the function parameter takes n`, then `n becomes 2` in code execution phase and then, ans is assigned to be 4.

- Phase 2: Code Execution in the function's context
  | Memory | Code |
  | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
  | n : 2 | <table><tr><th>Memory</th><th>Code</th></tr><tr><td>num: 2</td><td>num\*num &larr; executes</td><tr><td>ans: undefined</td></tr></tr></table> |
  | square : {...whole function body} | |
  | square2 : undefined | |
  | sqaure4 : undefined | |
- Ongoing Phase 2:
  | Memory | Code |
  | --------------------------------- | ---------------------------------------------------------------------------------------------------- |
  | n : 2 | <table><tr><th>Memory</th><th>Code</th></tr><tr><td>num: 2</td><tr><td>ans: 4</td></tr></tr></table> |
  | square : {...whole function body} | |
  | square2 : undefined | |
  | sqaure4 : undefined | |

      When the `return statement` is encountered the return value is returned ofcourse along with it the control is also returned back to the line in GEC wherever it was called from, i.e, line 6 in this case and sqaure2 is assigned to be 4.

- Ongoing Phase 2:
  | Memory | Code |
  | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
  | n : 2 | <table><tr><th>Memory</th><th>Code</th></tr><tr><td>num: 2</td><td>return ans &larr; executes</td><tr><td>ans: 4</td></tr></tr></table> |
  | square : {...whole function body} | |
  | square2 : undefined | |
  | sqaure4 : undefined | |

      Then that local execution context is deleted as the function execution was eventually complete.

- Execution Context for the function got deleted:
  | Memory | Code |
  | --------------------------------- | ---- |
  | n : 2 | |
  | square : {...whole function body} | |
  | square2 : 4 | |
  | sqaure4 : undefined | |

5. Same thing happens for sqaure(4) function call, this time instead of n, in the code execution phase, 4 is directly assigned.

## Call Stack maintains the order of execution of execution Contexts.

- `It stores GEC at its bottom, then the EC for square(n) function call, after that's done, it pops it off once its returned and then again puts in the EC of the second function call, i.e., sqaure(4) and pops it off once its done executing and finally pops off GEC from the stack.`

- This is how JS Engine manages the creation and deletion of Execution Contexts efficiently and keeps track of the order of the execution contexts.
- Also known as Execution Context Stack, Program Stack, Control Stack, Runtime Stack and Machine Stack, all of the same are the same thing- THE CALL STACK.

## [Hoisting in JS](/hoistingInJS/index.js)

- Formal Definition: In JavaScript, hoisting is a mechanism where variable and function declarations are moved to the top of their scope (either global or function scope) during the compilation phase, before the code is executed. This means you can use variables and functions before they are declared in the code.

```js
getName(); // this prints Hello ofcourse
console.log(x); // this prints undefined

console.log(getName);
/* 
    Output of above statement: Even before we define the function we get the body, why?
    ƒ getName() {
    console.log("Hello");

    Because of the memory creation phase.
}
*/

var x = 7;
function getName() {
  console.log("Hello");
}

getName(); // this prints Hello
console.log(x); // this prints 7

// but if we remove the statement var x = 7, then we'll see an error in the console saying that
// x is not defined, which is NOT THE SAME AS undefined.

console.log(getName);
/* 
    Output of above statement:
    ƒ getName() {
    console.log("Hello");
}
*/

someFn(); // gives error that someFn is not a function
/* 
Because during the memory creation phase it was treated as avariable because of var
and was assigned the value undefined.
*/

var someFn = () => {
  console.log("Just some fun!");
};
```

1. Firstly, the GEC comes into the picture then the memory creation phase starts.

2. What really happens is that during the memory creation phase all the variables and functions are assigned/allocated memory, where the variables of type var are set as undefined and the function body is moved in the GEC.

3. Then, when the code is executed, and if we try to access the variable even before the definition/declaration, we get undefined because it was assigned undefined in the memory creation phase, and the functions work properly as they were put in the GEC before in the memory creation phase only.

4. However, if we declare arrow functions using the var keyword, the function will be assinged undefined in the memory as it is treated as a variable and not a function, even if we use the anonymous function and assign it to a var, it will be treated as a variable only, that's why if we try to call that function it'll give us an error that getName is not a function as it is being treated as a variable and NOT a function.

### Call Stack in this scenario

1. The GEC will be loaded as the name (anonymous).
2. Then when the Execution Context of getName() is creates upon its function call, it's pushed into the stack and is popped off once the function execution completes.

## [Functions in JS](functions/index.js)

![Example](functions/main.png)

Let's dive deep into the outputs and how is the code working!

Phase 1: Memory Creation - In the memory block

    x : undefined
    a : {... function code}
    b : {... function code}

Call Stack:
| |
|-|
|GEC|

Phase 2: Code Execution

Memory Block:

    x:1
    a:{...}
    b:{...}

Code Block:

    var x = 1; <- assigns 1 to x in GEC
    a(); -> function 'a' is invoked which creates another EC, with the parameters(none in this case) and the variables inside the function. This EC is independent of everything.
    And also, it will be pushed onto the call stack.

Call Stack:
| |
|-|
|a|
|GEC|

Phase 1: Memory creation

    x : undefined

Phase 2: Code Execution

    var x = 10 runs and x is assgined 10 in memory.
    console.log(x) runs and prints 10.
    Function execution completes.
    Control is returned to line 2, i.e., GEC, then a's EC is popped off the stack and the EC is deleted.
    Call Stack:
        |GEC|

Same happens with b() and then when the program is finished executing the GEC is popped off the stack and the GEC is deleted.

## [Global Scope, This Keyword and Window Object](windowAndThisKeyword/index.js)

![Example for the Global Scope and stuff](windowAndThisKeyword/image.png)

1. A global window object is created with a lot of properties inside along with the ones that are defined in the global
   scope.
   ![window object](windowAndThisKeyword/Window-Object.png)
2. What is global scope?

   Ans. If a function/variable is defined outside any function's scope it is considered to be global and is attached
   to the window object.

3. `This` keyword is intialized with the global window object and points to it.
4. Obviously, in an empty JS file there's just the Memory Creation Phase and GEC is popped off in the Code Execution
   Phase as there's no code to run!
