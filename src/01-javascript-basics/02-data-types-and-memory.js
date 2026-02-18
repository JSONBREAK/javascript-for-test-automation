//-------------------- Data Types --------------------//

// Topics: string, number, boolean, null, undefined, object, array, typeof

function dataTypes() {
    // String
    let stringType = "Hello, World!" 
    console.log(typeof stringType) // Output: string
    
    // Number
    let numberType = 42
    console.log(typeof numberType) // Output: number  

    // Boolean
    let booleanType = true
    console.log(typeof booleanType) // Output: boolean 

    // Null
    let nullType = null
    console.log(typeof nullType) // Output: object 

    // Undefined
    let undefinedType
    console.log(typeof undefinedType) // Output: undefined

    // Object
    let objectType = { key: "value" } 
    console.log(typeof objectType) // Output: object
    
    // Array
    let arrayType = [1, 2, 3] 
    console.log(typeof arrayType) // Output: object (arrays are a type of object in JavaScript)
}

dataTypes()
