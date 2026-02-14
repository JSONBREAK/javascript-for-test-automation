//-------------------- Variable and Scope --------------------//

function variableScope() {
 
    // redeclared คือการประกาศตัวแปรซ้ำในขอบเขตเดียวกัน 
    // assigned คือการกำหนดค่าหรือตัวแปรใหม่ให้กับตัวแปรที่มีอยู่แล้ว

    var varVariable = 'I am var'
    console.log(varVariable)
    var varVariable = 'I am var again'
    console.log(varVariable)

    // scope with let
    let letVariable = 'I am let'
    console.log(letVariable)
    // let letVariable = 'I am let again' // cannot be redeclared in the same scope

    // scope with const
    const constVariable = 'I am const'
    console.log(constVariable)
    // const constVariable = 'I am const again' // cannot be redeclared in the same scope

    // issue of var (function scope)
    function varFunctionScope() {
        var functionVar = 'I am function var'
        console.log(functionVar) // accessible
    }
    varFunctionScope()
    // console.log(functionVar) // not accessible, will throw an error 

    // issue of var (block scope)
    for (var i = 0; i < 3; i++) {
        setTimeout(() => {
            console.log(i)
        }, 1000)
    }
    // ปัญหาคือ var ไม่มี block scope ทำให้ตัวแปร i ถูกแชร์ข้ามบล็อก ทำให้เมื่อ setTimeout ทำงาน i มีค่าเป็น 3 ทั้งหมด
    // correct way with let (block scope)   
    for (let j = 0; j < 3; j++) {
        setTimeout(() => {
            console.log(j)
        }, 1000)
    }

    // block scope คือ ขอบเขตของตัวแปรที่ถูกกำหนดภายในบล็อก (ภายในเครื่องหมายปีกกา {}) 
    {
        var varBlock = 'var in block'
        let letBlock = 'let in block'
        const constBlock = 'const in block'
        console.log(varBlock)   // accessible
        console.log(letBlock)   // accessible
        console.log(constBlock) // accessible
    }
    console.log(varBlock)   // accessible
    // console.log(letBlock)   // not accessible, will throw an error
    // console.log(constBlock) // not accessible, will throw an error           

    // primitive vs object (พื้นฐาน)
    // primitive: string, number, boolean, null, undefined, symbol
    // object: object, array, function
}

variableScope()


