setTimeout(() => {
    console.log("Timer");
}, 5000)

function x(y) {
    console.log("x");
    y();
}

x(function y() {
    console.log("y");
})

// so the above code outputs x y Timer(after 5 seconds ofc).
// The function taken as input(so that it could be called later) is known as callback function.

// Closures + event listeners to tell the number of count of button clicks
function showCount() {
    let count = 0;
    document.getElementById("clickMe").addEventListener("click", () => { // this inner callback function forms closure
        // with showCount and has the count variable available because of lexical scoping.
        console.log("Button Clicked", ++count);
    });
}
showCount();

// Since event listeners are heavy memory wise, one should remove them once they aren't in use.