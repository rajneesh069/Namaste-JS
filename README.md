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
