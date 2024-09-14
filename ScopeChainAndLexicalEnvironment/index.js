function a() {
    var b = 10;
    c();
    function c() { // c's lexical parent is a
        console.log(b);// 10
        console.log(x);// 20
    }
}
var x = 20;
a();// a's lexical parent is global execution context
console.log(b); // b is not defined