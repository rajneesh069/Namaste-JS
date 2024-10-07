# Deep Dive into the Browser Architecture for JS

1. The JS code goes through three phases of running:
   1. Parsing:
   - Lexical Analysis (Tokenization): JavaScript code is broken down into meaningful units called tokens (like keywords, variables, operators).
   - Syntax Analysis (Parsing): The syntax parser checks the arrangement of tokens and builds an Abstract Syntax Tree (AST), which represents the code structure. The AST is passed to the next phase.
   2. Compilation:
   - JavaScript uses Just-In-Time (JIT) compilation, a mix of compilation and interpretation.
   - Interpreter (Baseline Code Generation): Initially, the JavaScript engine (like V8, and Node.js is also based on V8) starts by interpreting the code, converting it into bytecode (intermediate representation), which is then executed by the JavaScript Virtual Machine.
   - JIT Compiler (Optimized Code): During execution, frequently used code ("hot" code) is identified and optimized by the JIT compiler into machine code. This makes subsequent executions of the same code faster.
   3. Execution:
   - The JavaScript engine executes the bytecode generated during interpretation or the optimized machine code produced by the JIT compiler.
   - Garbage Collection: Memory management takes place in the background to reclaim unused memory, which is crucial during execution.

- Summary:
  - Parsing creates the AST.
  - JIT Compilation is a dynamic mix of interpretation (bytecode generation) and machine code optimization.
  - Execution runs either bytecode or optimized machine code.

### Key point: The process switches between the interpreter and compiler based on the code's execution profile. The compiler produces machine code for better performance.

2. It has a CallBack Queue, MicroTask Queue, Event Loop, APIs for various things like timeouts, fetching data from servers, calling the DOM etc.
3. It has Garbage Collector which is a program and frees memory after it's not in use. Uses Mark and Sweep Algorithm.
4. Compiler uses the following techniques: Inlining, Copy Elision, Inline Caching etc, to optimize the code.
