//-------------------- Variable and Scope --------------------//
// primitive => string, number, boolean, null, undefined, symbol 
// object => object, array, function
// redeclared คือการประกาศตัวแปรซ้ำในขอบเขตเดียวกัน 


function bindingvsValue() {

    function primitive() {
        const a = 10
        let b = a
        b = 20
        console.log(a) // 10
        console.log(b) // 20
        // primitive → copy value
        // ไม่มี shared state
    }
    primitive()

    function object() {
        const user = { name: 'John' }
        const userCopy = user
        // object → copy reference
        // มี shared state
        userCopy.name = 'Jane'
        console.log(user.name, userCopy.name)

        // การ clone object เพื่อไม่ให้มี shared state
        const clone = { ...user } // Jane
        clone.name = 'Jack'
        console.log(user.name, clone.name) // Jane Jack
    }
    object()
}


// const != object immutable  
// const ห้าม reassignment ไม่ได้ห้าม mutation
// assigned คือการกำหนดค่าหรือตัวแปรใหม่ให้กับตัวแปรที่มีอยู่แล้ว

// =================================== Block Scope ===================================
// var => function scope
// let, const => block scope
function blockScope() {
    if (true) {
        var x = 10
        let y = 20
        const z = 30
    }
    console.log(x) // 10
    // console.log(y) // ReferenceError: y is not defined
    // console.log(z) // ReferenceError: z is not defined
}


// ======================== Function Scope (ขอบเขตภายในฟังก์ชัน) ========================
// var => function scope
// let, const => block scope
function functionScope() {
    function foo() {
        var a = 10
        let b = 20
        const c = 30
    }
    foo()
    // console.log(a) // ReferenceError: a is not defined
    // console.log(b) // ReferenceError: b is not defined
    // console.log(c) // ReferenceError: c is not defined
}

// =================================== Global Scope ===================================
// var, let, const => global scope
function globalScope() {
    var a = 10
    let b = 20
    const c = 30
    console.log(a, b, c) // 10 20 30
}

// =================================== Closure ===================================
// ฟังก์ชันสร้าง Counter สำหรับนับจำนวน Retry ในแต่ละ Test Case

function closure() {
    function createRetryManager(testName) {
        let count = 0; // ตัวแปรนี้ถูก "ขัง" ไว้ใน Scope (คนนอกแก้ไม่ได้)

        return {
            increment: function () {
                count++;
                console.log(`[${testName}] Retryครั้งที่: ${count}`);
            },
            getCount: function () {
                return count;
            }
        };
    }

    // Test Case 1 มีตัวนับของตัวเอง
    const test1Retry = createRetryManager("Login Test");
    test1Retry.increment(); // 1
    test1Retry.increment(); // 2

    // Test Case 2 ก็มีตัวนับของตัวเองแยกขาดกัน (Isolation!)
    const test2Retry = createRetryManager("Payment Test");
    test2Retry.increment(); // 1

    console.log(test1Retry.getCount()); // ยังคงเป็น 2 (Closure จำค่าไว้)
    console.log(test2Retry.getCount()); // เป็น 1 (แยกกันอย่างสมบูรณ์)
}

// =============================== Loop + Scope Trap ===============================
function scopeTrapVar() {
    console.log("Using var (function scope ):"); // เพราะ var ไม่มี block => ทุก callback ใช้ i ตัวเดียวกัน
    for (var i = 0; i < 3; i++) {
        setTimeout(() => {
            console.log(i); // จะพิมพ์ 3 ทั้งหมด เพราะ i เป็นตัวแปรเดียวกันใน function scope
        }, 100);
    }
}
//scopeTrapVar() // 3 3 3

function scopeTrapLet() {
    console.log("Using let (block scope ):"); // เพราะ let มี block => แต่ละ callback ใช้ตัวแปรใหม่
    for (let i = 0; i < 3; i++) {
        setTimeout(() => console.log(i), 0)
    }
}
//scopeTrapLet() // 0 1 2

// =============================== Self-Check ===============================

/*
- Variable เก็บอะไร? => value หรือ reference
- const ป้องกันอะไร? => การ reassignment ไม่ได้ป้องกันการ mutation
- let ต่างจาก const ยังไง? => let สามารถ reassignment ได้ แต่ const ไม่ได้
- object mutation เกิดที่ไหน? => เกิดที่ reference ไม่ใช่ตัวแปร
- scope ทำให้ debug ยากได้ยังไง? => ถ้าไม่เข้าใจ scope อาจจะทำให้เกิดปัญหาเช่น variable shadowing หรือการเข้าถึงตัวแปรที่ไม่ถูกต้อง
*/


