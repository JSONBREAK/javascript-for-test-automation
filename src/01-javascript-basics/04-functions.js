/*
เป้าหมายไฟล์นี้
Function ต้อง predictable(ให้ผลลัพธ์เดียวกันเสมอเมื่อรับ input เดิม)
Function ต้อง isolated(ไม่พึ่งพา external state)
Function ต้องไม่พึ่ง hidden state(ไม่ใช้ closure เพื่อเก็บ state ที่ซ่อนอยู่)
Function ต้องไม่ mutate input(ไม่เปลี่ยนแปลงค่าที่รับเข้ามา)
*/

/*
1. Fuction Declaration vs Function Expression
2. Pure Functions
3. Hidden Dependency คือการที่ฟังก์ชันมีการพึ่งพา state ที่ซ่อนอยู่ ซึ่งอาจทำให้ฟังก์ชันไม่ predictable และมี side effects
4. Mutation inside Function > side effects and unpredictable behavior
5. Deterministic Design Guarantee 
6. Default & Rest Parameters > not syntax demo
*/

//=============================== Function Declaration vs Function Expression ===============================
// Function Declaration คือการประกาศฟังก์ชันด้วยคำสั่ง function ตามด้วยชื่อฟังก์ชัน และ body ของฟังก์ชัน
// Function Expression คือการสร้างฟังก์ชันเป็นค่าของตัวแปร โดยใช้คำสั่ง function หรือ arrow function
function functionDeclaration() {
    function greet() {
        return "Hello, World!";
    }
    console.log(greet()); // "Hello, World!"
    // Function Declaration จะถูก hoisted ขึ้นไปก่อนการรันโค้ด ทำให้สามารถเรียกใช้ฟังก์ชันได้ก่อนที่จะประกาศ

    const greetExpression = function () {
        return "Hello, Expression!";
    };
    console.log(greetExpression()); // "Hello, Expression!"
    // Function Expression จะไม่ถูก hoisted ทำให้ต้องประกาศก่อนถึงจะเรียกใช้ได้
}


// =============================== Primitives vs Reference Types ===============================
// Primitive types: number, string, boolean, null, undefined, symbol
// Reference types: object, array, function

function impure() {
    let count = 0; // hidden state
    function increment() {
        count++; // mutation of hidden state
        return count;
    }
    console.log(increment()); // 1
    console.log(increment()); // 2
    // ฟังก์ชัน increment มี hidden dependency กับตัวแปร count และมี side effect ที่เปลี่ยนแปลงค่า count ทำให้ฟังก์ชันนี้ไม่ predictable
}

function pure() {
    function increment(count) {
        return count + 1; // no mutation, no hidden state
    }
    console.log(increment(0)); // 1
    console.log(increment(0)); // 1
    // ฟังก์ชัน increment เป็น pure function เพราะไม่มี hidden dependency และไม่มี side effect ทำให้ predictable
}

// สรุป: ฟังก์ชันที่ดีควรเป็น pure function ที่ไม่มี hidden dependency และไม่มี side effect เพื่อให้ predictable และง่ายต่อการทดสอบและบำรุงรักษา


// ==================================== Hidden Dependency⭐ ====================================
// Hidden Dependency คือการที่ฟังก์ชันมีการพึ่งพา state ที่ซ่อนอยู่ ซึ่งอาจทำให้ฟังก์ชันไม่ predictable และมี side effects
function hiddenDependency() {
    const config = { apiUrl: "https://api.example.com" }; // hidden state
    function fetchData(endpoint) {
        return fetch(config.apiUrl + endpoint); // hidden dependency on config
    }
    console.log(fetchData("/data")); // ทำการเรียก API โดยใช้ config ที่ซ่อนอยู่

    // ควรเป็น
    function fetchDataPro(endpoint, apiUrl = "https://api.example.com") {
        return fetch(apiUrl + endpoint);
    }
    const result = fetchDataPro("/users", "https://staging-api.example.com");
    console.log(result);  // Promise {...} ต้องใช้ .then() หรือ async/await เพื่อดูผลลัพธ์จริง
}


// =============================== Mutation inside Function ===============================

function mutationDemo() {
    const userOriginal = { name: "Dave", age: 20, isActive: true };

    // ❌ Bad: ฟังก์ชันไปแอบแก้ค่าข้างใน Object ที่รับมา (Mutation)
    function badUpdateUser(user) {
        user.isActive = false; // 🚩 นี่คือ Mutation! แอบเปลี่ยนสถานะเขา
        console.log("Updated in bad function");
    }

    // ✅ Good: ไม่แก้ของเดิม แต่คืนค่าใหม่ (Immutability)
    function goodUpdateUser(user) {
        // สร้าง Object ใหม่ที่ก๊อปปี้ค่าเดิมมาแล้วแก้จุดที่ต้องการ
        const updatedUser = { ...user, isActive: false };
        console.log("Updated in good function");
        return updatedUser;
    }

    // --- ทดสอบผลกระทบ ---
    badUpdateUser(userOriginal);
    console.log(userOriginal.isActive); // ผลลัพธ์: false (ค่าเดิมพังไปแล้ว!)

    // รีเซ็ตค่ากลับมาเพื่อเทสต์ใหม่
    userOriginal.isActive = true;

    goodUpdateUser(userOriginal);
    console.log(userOriginal.isActive); // ผลลัพธ์: true (ค่าเดิมปลอดภัย!)
}

// =============================== Deterministic Design Pattern ===============================

// validation user in the good way

function validateUser(user) {
    if (!user) return "No user data provided.";
    if (!user.isActive) return "User is not active.";
    if (user.age >= 18) return "User is an active adult.";
    return "User is an active minor.";
}

function testValidateUser() {
    // สร้างชุดข้อมูลทดสอบ (Test Cases)
    const testCases = [
        { input: null, expected: "No user data provided.", desc: "Null User" },
        { input: { age: 25, isActive: false }, expected: "User is not active.", desc: "Inactive User" },
        { input: { age: 30, isActive: true }, expected: "User is an active adult.", desc: "Adult User" },
        { input: { age: 17, isActive: true }, expected: "User is an active minor.", desc: "Minor User" }
    ];

    console.log("--- 🧪 Running Unit Tests ---");

    testCases.forEach(({ input, expected, desc }, index) => {
        const result = validateUser(input);
        const isPass = result === expected;
        
        console.log(`${index + 1}. ${desc}: ${isPass ? "✅ PASS" : "❌ FAIL"}`);
        if (!isPass) {
            console.log(`   Expect: "${expected}"`);
            console.log(`   Actual: "${result}"`);
        }
    });
}

// =============================== Default & Rest Parameters ===============================

// Default Parameters คือการกำหนดค่าเริ่มต้นให้กับพารามิเตอร์ในกรณีที่ไม่ได้รับค่าเข้ามา

function createUser(name, role = "user") {
    return { name, role };
}
function createUser2(name, role || "user") {
    return { name, role };
}
console.log(createUser("Eve"));
console.log(createUser("Frank", "admin"));


