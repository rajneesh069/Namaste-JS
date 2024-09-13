# JavaScript Basics and Essentials

## Everyhting in JS happens inside an `Execution Context`

- Assume it to be a box of two columns namely, Memory and Code.
  | Memory | Code |
  |--------|------|
  |key : value| Code Line 1|
  |key1 : value1| Code Line 2|

So, in the memory component, all the variables and functions are stored like key-value pairs. Memory component is also called Variable Environment.

In the code component, the code is executed one line at a time one by one, which is also known as thread of execution.

## JS is a synchronous single threaded language.
- Single Threaded and synchronous: It can execute only one command at a time(single threaded), in a specific order, i.e, after the line is done executing(synchronous) then only it moves onto the next one. 
