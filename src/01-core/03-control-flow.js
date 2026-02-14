//-------------------- Control Flow --------------------//

// Topics: if/else, switch, for, for-of, while, break, continue

function controlFlow() {
    // If/Else Statement
    function ifelse() {
        const age = 20
        if (age < 18) {
            console.log("Minor")
        }
        else if (age >= 18 && age < 65) {
            console.log("Adult")
        }
        else {
            console.log("Senior")
        }
    }

    // Switch Statement
    function switchstatement() {
        const day = 3
        switch (day) {
            case 1:
                console.log("Monday")
                break
            case 2:
                console.log("Tuesday")
                break
            case 3:
                console.log("Wednesday")
                break
            default:
                console.log("Another day")
        }
    }

    // For Loop
    function forloop() {
        for (let i = 0; i < 3; i++) {
            console.log(`Iteration ${i}`)
        }

        // For-Of Loop
        const fruits = ["apple", "banana", "cherry"]
        for (const fruit of fruits) {
            console.log(fruit)
        }
    }

    // While Loop
    function whileloop() {
        let count = 0
        while (count < 3) {
            console.log(`Count is ${count}`)
            count++
        }
    }

    // Break and Continue (คือการควบคุมการทำงานของลูปให้หยุดหรือละเว้นบางรอบ)
    function breakcontinue() {
        for (let i = 0; i < 5; i++) {
            if (i === 2) {
                continue // skip iteration when i is 2
            }
            if (i === 4) {
                break // exit loop when i is 4
            }
            console.log(i)
        }
    }

    // Execute all control flow examples
    ifelse()
    switchstatement()
    forloop()
    whileloop()
    breakcontinue()
}

controlFlow()
