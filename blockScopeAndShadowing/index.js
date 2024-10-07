if (true) {
    // Compound statement
    let k = 10;
    console.log(k);
}
/* Every time a block scope is defined then JS makes a new block scope each time and variables are defined for each block
therefore we can say that JS runs block by block */

/* 
These let variables will be defined into what's called a Block Scope and not the Script scope. If we define a let
or const variable outside(globally) it would be defined in the Script Scope.
*/
let a = 20; // this is in Script scope
const b = 69; // this is in Script scope
{
    var l = 100;
    let a = 10; // this is in Block scope
    const b = 20; // this is in Block scope
    console.log(a); // 10
    console.log(b); // 20
}
/* Because of block scoping we get two values of a and b
in different scopes. */
console.log(l); // 100
console.log(a); // 20
console.log(b); // 69


// let x = 10; //not allowed, program won't even execute
// {
//     var x = 100;
// }
let x = 10;
function someFn() {
    var x = 100;
}
/* 
allowed as x is now in the scope of a function and not global 
It will be initialized as var when the memory creation phase
of someFn() comes!
*/

{
    const a = 100;
    console.log(a); // 100
    {
        const a = 200;
        console.log(a); // 200
        {
            const a = 400;
            console.log(a); // 400
            {
                console.log(a);
                /*  takes the nearest parent lexical
                 environment and prints 400. */
            }
        }
    }
}

let ddk = 100;
{
    const ddk = 100;
}