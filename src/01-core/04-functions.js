//-------------------- Functions --------------------//

// Topics: function declarations, arrow functions, parameters, return, pure functions

function functions() {
    // Function Declaration
    function add(a, b) {
        return a + b
    }
    console.log(add(2, 3)) // Output: 5

    // Arrow Function
    const multiply = (a, b) => {
        return a * b
    }
    console.log(multiply(2, 3)) // Output: 6

    // Pure Function
    function pureSubtract(a, b) {
        return a - b
    }
    console.log(pureSubtract(5, 3)) // Output: 2

    // Impure Function
    let counter = 0
    function impureIncrement() {
        counter += 1
        return counter
    }
    console.log(impureIncrement()) // Output: 1
    console.log(impureIncrement()) // Output: 2 (different output each time)

    // Function with Default Parameter
    function greet(name = "Guest") {
        return `Hello, ${name}!`
    }
    console.log(greet()) // Output: Hello, Guest!
    console.log(greet("Alice")) // Output: Hello, Alice!

    // Function with Rest Parameter
    function sumAll(...numbers) {
        return numbers.reduce((acc, curr) => acc + curr, 0)
    }
    console.log(sumAll(1, 2, 3, 4)) // Output: 10

    // Immediately Invoked Function Expression (IIFE)
    (function () {
        console.log("This function runs immediately upon definition!")
    })() // define then calls the function immediately

    // Function Expression
    const divide = function (a, b) {
        return a / b
    }
    console.log(divide(6, 3)) // Output: 2

    // Higher-Order Function
    function applyOperation(a, b, operation) {
        return operation(a, b)
    }
    console.log(applyOperation(4, 2, multiply)) // Output: 8
    console.log(applyOperation(4, 2, add)) // Output: 6

    // Recursive Function
    function factorial(n) {
        if (n === 0) {
            return 1
        }
        return n * factorial(n - 1)
    }
    console.log(factorial(5)) // Output: 120
    console.log(factorial(0)) // Output: 1

    // Function Scope
    function functionScopeExample() {
        let localVar = "I'm local"
        console.log(localVar) // Output: I'm local
    }
    functionScopeExample()
    // console.log(localVar) // Uncaught ReferenceError: localVar is not defined

    // Closure
    function outerFunction(outerVar) {
        return function innerFunction(innerVar) {
            return `Outer: ${outerVar}, Inner: ${innerVar}`
        }
    }
    const newFunction = outerFunction("outside")
    console.log(newFunction("inside")) // Output: Outer: outside, Inner: inside

    // Callback Function
    function fetchData(callback) {
        setTimeout(() => {
            const data = "Sample Data"
            callback(data)
        }, 1000)
    }
    fetchData((data) => {
        console.log("Received:", data) // Output (after 1 second): Received: Sample Data
    })

    // Function Hoisting
    hoistedFunction() // Output: This function has been hoisted!
    function hoistedFunction() {
        console.log("This function has been hoisted!")
    }
}

functions()
