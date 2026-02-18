
/*
// =============================== 1. Variables & Scope ===============================//

var, let, const
var: ไม่มี block scope({}) ทำให้เกิดปัญหาในการใช้งานในลูปหรือบล็อก
let:  have block scope and can be reassigned, but not redeclared in the same scope
const: have block scope and can't be reassigned after initialization, but can be mutated if it's an object or array
block scope: (อาณาเขตของตัวแปร) ภายในบล็อก {} 

Primitives & Reference Types
Primitives: string, number, boolean, null, undefined, symbol เวลา copy จะได้ค่าใหม่ แก้ไขค่าใหม่ไม่กระทบตัวเดิม
Reference Types: object, array, function เวลา copy จะได้ reference เดียวกัน แก้ไขค่าใหม่จะกระทบตัวเดิม
*/

function primitiveVsReference() {
    // กรณีที่ 1: Primitive
    let scoreA = 100;
    let scoreB = scoreA;
    scoreB = 50;

    // กรณีที่ 2: Reference
    const testCaseA = { id: 1, status: "Pending" };
    const testCaseB = testCaseA;
    testCaseB.status = "Failed";

    console.log(scoreA);     // 100
    console.log(testCaseA.status); // "Failed"
}

/**
// =============================== 2. Data Types ==================================//

  2.1) String, Number, Boolean, Null & Undefined, Object, Array
  2.2) การตรวจสอบชนิดของข้อมูล: 
        - typeof → เช็ค primitive (string, number, boolean, undefined, function)
        - instanceof → เช็คว่า object ถูกสร้างจาก class / constructor ที่กำหนดหรือไม่
*/

function dataTypes() {
    console.log(typeof "Hello"); // string
    console.log(Array.isArray([1, 2, 3])); // true
    function instanceOf() {
        class Car {
            constructor(brand) {
                this.brand = brand;
            }
        }
        const car1 = new Car("Toyota");
        const car2 = { ...car1 };
        console.log(car1 instanceof Car); // true
        console.log(car2 instanceof Car); // ❌ false
    }
    instanceOf()
}

/*  
// ================================ 3. Functions ==================================//

3.1) Function Declaration, Arrow Function
Default: function login() { ... }
Arrow: const login = () => { ... }

3.2) Return & Early Return
- Return: ฟังก์ชันจะหยุดทำงานและส่งค่ากลับเมื่อเจอคำสั่ง return
- Early Return: ใช้ return เพื่อจบฟังก์ชันก่อนที่จะทำงานส่วนที่เหลือ ถ้าเงื่อนไขไม่ตรงตามที่ต้องการ    

3.3) Pure Function
- ฟังก์ชันที่ "ใส่ Input เดิม ต้องได้ Output เดิมเสมอ" และ "ไม่ไปยุ่งกับโลกภายนอก" (ไม่ mutate ตัวแปรข้างนอก)

*/

// Arrow Function (AND) Return & Early Return
const returnEarly = () => {
    const checkStatus = (status) => {
        // Early Return: ถ้าไม่ใช่สิ่งที่ต้องการ ให้จบงานทันที
        if (status !== "Passed") {
            return "Test Failed";
        }
        return "Test Success";
    };
    console.log(checkStatus("Failed")); // Test Failed 
    console.log(checkStatus("Passed")); // Test Success 
}

/*
// ================================ Functions Example ===============================//

สมมติว่ากำลังเขียน Automation เช็กคะแนนสอบของ User โดยมีเงื่อนไขดังนี้:
รับคะแนน (score) เข้ามา
ถ้าคะแนน >= 50 ให้ return "Pass"
ถ้าคะแนน < 50 ให้ return "Fail"
เขียนเป็น Arrow Function

*/

function example1() {
    const calculator = (score) => {
        if (typeof score !== "number") {
            return "Invalid";
        }
        return score >= 50 ? "Pass" : "Fail";
    };

    [49, 50, 51, "sumo fat cat"].forEach(score => {
        console.log(`input: ${score} → ${calculator(score)}`);
    });

}

//================================ 4. Control Flow =================================//

/*
1) If-Else, Switch-Case
- If-Else: ใช้สำหรับตรวจสอบเงื่อนไขที่มีความซับซ้อนหรือหลายเงื่อนไข
- Switch-Case: ใช้เมื่อมี "ทางเลือกเยอะๆ" และเปรียบเทียบค่าตรงๆ (ตัวเลือกที่ชัดเจน⭐) เช่น การเช็ก Role ของ User ในระบบ

*/

function ifelse(loginStatus) {
    function navigate() {
        if (typeof loginStatus !== "boolean") {
            return "Invalid";
        }

        return loginStatus === true ? "ไปหน้า Dashboard" : "ระบบล่มหรือเน็ตหลุด";
    }
    [true, false, "string", null, undefined].forEach(status => console.log(`${status} → ${ifelse(status)}`));
}

function switchcase() {
    function checkRole(role) {
        const userRole = "Admin";
        switch (userRole) {
            case "Admin":
                console.log("มีสิทธิ์ ลบ/แก้ไข ข้อมูล");
                break; // ⚠️ ถ้าลืม break จะไหลไปทำเคสถัดไป
            case "Editor":
                console.log("มีสิทธิ์ แก้ไข ข้อมูล");
                break;
            case "Viewer":
                console.log("อ่านได้อย่างเดียว");
                break;
            default:
                console.log("Role ไม่ถูกต้อง");
        }
    }
}


// 2) For, For-Of, While, Break, Continue
// - For: ใช้เมื่อเรารู้ "จำนวนรอบ" ที่แน่นอน หรือต้องการเลข Index
// - For-Of: ใช้สำหรับ วนลูปอ่านค่าใน Array เช่น รายการชื่อสินค้าในหน้าเว็บ อ่านง่ายที่สุดและลด Error ได้ดี ⭐
// - While: ใช้เมื่อ "ไม่รู้ว่าจะจบเมื่อไหร่" แต่จะทำไปเรื่อยๆ จนกว่าเงื่อนไขจะเป็นเท็จ
// - Break: "หยุดทันที" (หยุดทั้งลูป)
// - Continue: ใช้เพื่อข้ามรอบนั้นๆ และไปทำงานรอบถัดไป

//  Loop & Control Flow

function loopControl() {
    // For Loop
    function forloop() {
        for (let i = 0; i < 3; i++) {
            console.log(`Iteration ${i}`);
        }
    }

    // For-Of Loop
    function forofloop() {
        const fruits = ["apple", "banana", "cherry"];
        for (const fruit of fruits) {
            console.log(fruit);
        }
    }

    // While Loop
    function whileloop() {
        let count = 0;
        while (count < 3) {
            console.log(`Count is ${count}`);
            count++;
        }
    }

    // Break and Continue
    function breakContinue() {
        for (let i = 0; i < 5; i++) {
            if (i === 2) {
                continue; // ข้ามรอบที่ i = 2
            }
            if (i === 4) {
                break; // หยุดลูปเมื่อ i = 4
            }
            console.log(`Current number: ${i}`);
        }
    }
}
loopControl()

/* 
โจทย (Control Flow Challenge)
เขียนสคริปต์ตรวจเช็กรายการสินค้าในตะกร้า (cart)

1) วนลูปเช็กสินค้าทุกชิ้นโดยใช้ for...of
2) ถ้าเจอสินค้าชื่อ "Out of Stock" ให้ใช้ continue เพื่อข้ามการเช็กชิ้นนั้นไป
3) ถ้าเจอสินค้าชื่อ "Broken Link" ให้ใช้ break เพื่อหยุดการทำงานทั้งหมดทันที (เพราะเว็บพังแล้ว)
4) สินค้าปกติ ให้ console.log ชื่อสินค้าออกมา

const cart = ["Keyboard", "Out of Stock", "Mouse", "Broken Link", "Monitor"];

*/

function controlFlowChallenge() {
    const cart = ["Keyboard", "Out of Stock", "Mouse", "Flash drive", "Broken Link", "Monitor"];
    function checkStock() {
        for (const [index, item] of cart.entries()) {
            if (item === "Out of Stock") continue;
            if (item === "Broken Link") break

            console.log(item)
        }
    }
    checkStock();
}


//============================== ⭐5. Data Handling⭐ ===============================//

/*
Key: avoid using forloop -> use array methods instead (map, filter, reduce) 
because they reduce errors and make the code more readable
Topics: map(), filter(), find(), some(), every(), reduce()

Topics: 
    1. Array Methods (map, filter, find, some, every, reduce)
    2. Destructuring & Spread Operator (ช่วยให้เขียนโค้ดได้กระชับและลดความซับซ้อน)
*/

//1) Array Methods 🎈

function dataHandling() {
    // map() - "loop" element ของ Array และสร้าง Array ใหม่
    function mapHandling() {
        function Primitives() {
            const arr = [1, 2, 3, 4, 5]
            const arrCopy = arr.map(x => x);

            arrCopy[2] = 99; // 
            console.log(arr) // [1, 2, 3, 4, 5]
            console.log(arrCopy) //=> [1, 2, 99, 4, 5]
        }
        function Reference() {
            const arr = [{ a: 1 }, { a: 2 }, { a: 3 }];
            const arrCopy = arr.map(x => x);

            arrCopy[2].a = 99;
            console.log(arr[2].a); // 99 
            console.log(arrCopy[2].a); // 99
        }
        Primitives();
        Reference();
    }

    // filter() - กรองข้อมูลที่ตรงเงื่อนไข
    function filterHandling() {
        const arr = [1, 2, 3, 4, 5]
        const filtered = arr.filter(x => x % 2 === 0);
        console.log(filtered); // [2, 4]
    }

    // find() - หาข้อมูลตัวแรกที่ตรงเงื่อนไข
    function findHandling() {
        const arr = [1, 2, 3, 4, 5]
        const found = arr.find(x => x > 3);
        console.log(found); // 4    
    }

    // some() - เช็กว่ามีข้อมูลตัวไหนตรงเงื่อนไขบ้าง (return boolean)
    function someHandling() {
        const arr = [1, 2, 3, 4, 5]
        const hasEven = arr.some(x => x % 2 === 0);
        console.log(hasEven); // true
    }
    // every() - เช็กว่าข้อมูลทุกตัวตรงเงื่อนไขหรือไม่ (return boolean)
    function everyHandling() {
        const arr = [1, 2, 3, 4, 5]
        const allEven = arr.every(x => x % 2 === 0);
        console.log(allEven); // false
    }

    // reduce() - ลด array ลงเป็นค่าเดียว หรือแปลง array เป็น object lookup เพื่อเพิ่มประสิทธิภาพการค้นหา
    function reduceHandling() {
        const arr = [1, 2, 3, 4, 5]
        const sum = arr.reduce((acc, x) => acc + x, 0);
        console.log(sum); // 15     
        const users = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' }
        ]
    }
}
/*
โจทย์ (Data Handling Challenge)
สมมติว่าดึงข้อมูลสินค้าจาก API มาได้ดังนี้:
const apiResponse = [
    { id: 101, title: "iPhone", price: 30000, available: true },
    { id: 102, title: "Samsung", price: 25000, available: false },
    { id: 103, title: "Oppo", price: 15000, available: true }
];

ลองเขียนโค้ด (แนะนำให้ใช้ท่าต่อกันหรือ Chain Method):
1. Filter: เลือกเฉพาะสินค้าที่ available: true
2. Map: จากสินค้าที่ผ่านการกรองแล้ว ให้ดึงออกมาแค่ title เท่านั้น
3.Result: เก็บผลลัพธ์ไว้ในตัวแปร availableProductNames แล้ว console.log ออกมา
*/

function dataHandlingChallenge() {
    const apiResponse = [
        { id: 101, title: "iPhone", price: 30000, available: true },
        { id: 102, title: "Samsung", price: 25000, available: false },
        { id: 103, title: "Oppo", price: 15000, available: true }
    ];
    const clone = [...apiResponse]
    const availableProductNames = clone.filter(item => item.available)
        .map(item => item.title);

    console.log(availableProductNames) // ["iPhone", "Oppo"]
}

// =============================== 6. Destructuring & Spread Operator ===============================//
/*
- Destructuring: ช่วยให้ดึงข้อมูลจาก Array หรือ Object มาใช้ได้ง่ายขึ้น
- Spread Operator: ช่วยให้ "คัดลอก" หรือ "รวม" Array และ Object ได้ง่ายขึ้น
- JSON.stringify() & JSON.parse() 
     - JSON.stringify() แปลง Object หรือ Array เป็น String (เหมาะสำหรับการส่งข้อมูลผ่าน API หรือเก็บใน Local Storage)
     - JSON.parse() แปลง String ที่เป็น JSON กลับมาเป็น Object หรือ Array (เหมาะสำหรับการรับข้อมูลจาก API หรืออ่านจาก Local Storage)
 */

function destructuringSpreadJsonHandling() {
    // Descructuring
    function destructuringHandling() {
        const user = { id: 1, name: "Somchai", role: "QA" };

        // แทนที่จะเขียน user.id, user.name
        const { id, name } = user;
        console.log(name); // "Somchai"
    }

    // Spread Operator
    function spreadHandling() {
        const baseConfig = { browser: "chrome", headless: true };
        // ก๊อปอันเก่ามา แล้วขอทับแค่ headless เป็น false
        const devConfig = { ...baseConfig, headless: false };
        console.log(baseConfig); // { browser: "chrome", headless: true }
        console.log(devConfig); // { browser: "chrome", headless: false }
    }
    // JSON.stringify & JSON.parse
    function jsonHandling() {
        const user = { id: 1, name: "Somchai", role: "QA" };
        const jsonString = JSON.stringify(user);
        const jsonObject = JSON.parse(jsonString);
        console.log("Object/Array to JSON", jsonString); // '{"id":1,"name":"Somchai","role":"QA"}' ==> String
        console.log("JSON to Object/Array", jsonObject); // { id: 1, name: "Somchai", role: "QA" } ==> Object
    }
    jsonHandling()
}

// Destructuring with nested object
function destructuringNested() {
    const response = {
        data: {
            user: {
                profile: {
                    name: "Somchai"
                }
            }
        }
    }
    const { data: { user: { profile: { name } } } } = response;
    console.log(response)
}

/*
 const apiResponse = [
    { id: 101, title: "iPhone", price: 30000, available: true },
    { id: 102, title: "Samsung", price: 25000, available: false },
    { id: 103, title: "Oppo", price: 15000, available: true }
];
ลองเขียนโค้ด (แนะนำให้ใช้ท่าต่อกันหรือ Chain Method):
1. Filter: เลือกเฉพาะสินค้าที่ available: true
2. Map: จากสินค้าที่ผ่านการกรองแล้ว ให้ดึงออกมาแค่ title เท่านั้น
3. Result: เก็บผลลัพธ์ไว้ในตัวแปร availableProductNames แล้ว console.log ออกมา
*/

function chainMethod() {
    const apiResponse = [
        { id: 101, title: "iPhone", price: 30000, available: true },
        { id: 102, title: "Samsung", price: 25000, available: false },
        { id: 103, title: "Oppo", price: 15000, available: true }

    ];
    const availableProductNames = apiResponse.filter(item => item.available) // ไม่ต้อง === true เพราะมันจะเช็กค่า truthy/falsy ให้อัตโนมัติ
        .map(item => item.title);
    const expensiveProducts = apiResponse
        .filter(item => item.price > 20000)
        .map(item => ({
            title: item.title,
            price: item.price
        }));
    console.log(availableProductNames) // ["iPhone", "Oppo"]
    console.log(expensiveProducts) // ["iPhone", "Samsung"]
}


// ====================================== 7. Error Handling ======================================//

/* 
Error Handling: Try, Catch, Finally ⭐ 
- Try: โค้ดที่อาจเกิด error
- Catch: ทำงานเมื่อเกิด error
- Finally: ทำงานเสมอ ไม่ว่าจะ error หรือไม่

🚨 Error Type
- ReferenceError: เรียกใช้ตัวแปรที่ไม่ได้ประกาศไว้
- TypeError: ใช้ method ผิดชนิด
- SyntaxError: 
- Error: custom error
*/

function errorHandling() {
    try {
        const user = undefined;
        console.log(user.name); // TypeError
    } catch (error) {
        console.log(error.name); // "TypeError"
        console.log(error.message); // "Cannot read properties of undefined (reading 'name')"
        console.log(error.stack); // 'TypeError: Cannot read properties of undefined (reading \'name\')\n    at ...
    }
}

/*
1. คุณมี Object ต้นฉบับชื่อ defaultUser = { name: "Admin", config: { theme: "dark" } };
2. ให้สร้าง userForTest โดยการ Deep Copy จาก defaultUser (เพื่อไม่ให้กระทบต้นฉบับ) 
3. ใช้ try/catch หุ้มคำสั่งที่พยายามจะเข้าถึง userForTest.profile.email (ซึ่งไม่มีอยู่จริง และจะพ่น Error แน่นอน)
4. ใน catch ให้ console.log ข้อความ Error ออกมา
*/

function errorHandlingChallenge() {
    const defaultUser = { name: "Admin", config: { theme: "dark" } };
    const deepClone = structuredClone(defaultUser)

    try {
        console.log(deepClone.profile.email); // ReferenceError: profile is not defined
    }
    catch (error) {
        console.log(error.name); // "TypeError"
        console.log(error.message); // "profile is not defined"
    }
}

/*
1. Sync try/catch: จับได้แค่ Error ที่เกิดขึ้น "เดี๋ยวนี้"
2. Async try/catch: จับได้แค่ Error ที่เกิดขึ้น "ตอนนี้" แต่จับไม่ได้ถ้า Error เกิดขึ้น "ทีหลัง" (เช่น ใน setTimeout หรือ Promise)
3. The Bridge: Promise คือสะพานที่เชื่อมระหว่าง "การรอ" กับ "การจัดการ Error"
*/

// =============================== 8. Test Isolation ===============================//
/*
1) Test Isolation: การทำให้แต่ละ test ทำงานแยกจากกัน ไม่กระทบกัน
    - ทำให้ test มีความน่าเชื่อถือมากขึ้น เพราะไม่ต้องกังวลว่า state หรือข้อมูลจาก test อื่นจะมารบกวน
    - ช่วยให้ debug ง่ายขึ้น เพราะรู้ว่าปัญหาเกิดจาก test ไหน
    - ลด flakiness (test ผ่านบ้างไม่ผ่านบ้าง) เพราะไม่มี shared state ที่อาจถูกเปลี่ยนโดย test อื่น
2) Shared State: Shared Mutable Data ระหว่าง Test Case
    - ❌ สร้างตัวแปรไว้ด้านบนสุด (Global) เพื่อความสะดวก เพราะทุก test เข้าถึงได้ แต่เสี่ยงต่อการถูกแก้ไขโดย test อื่น
*/

// ตัวอย่างของ Shared Mutable Data ที่ไม่ดี❌
function sharedMutableData() {
    let testUser = { name: "Jet Surachokchai", role: "QA", point: 100 }; // Shared Mutable Data ที่ทุก test case เข้าถึงได้

    function testCase1() {
        testUser.point = 0;
        console.log("Test 1: ล้างคะแนนสำเร็จ", testUser); // Test Case 1: { name: "Jet Surachokchai", role: "QA", point: 0 }

    }
    function testCase2() {
        if (testUser.points === 100) {
            console.log("Test 2: ผ่าน", testUser);
        } else {
            console.log("Test 2: พัง!", testUser);
        }
    }
    testCase1(); // Test Case 1: { name: "Jet Surachokchai", role: "QA", point: 0 }
    testCase2(); // Test Case 2: { name: "Jet Surachokchai", role: "QA", point: 0 } <-- ควรจะเป็น { name: "Jet Surachokchai", role: "QA", point: 100 }
}

// ตัวอย่างของ Test Isolation ที่ดี✅
function testIsolation() {

    function createTestUser() {
        return { name: "Jet Surachokchai", role: "QA", point: 100 };
    }

    function testCase1() {
        const testUser = createTestUser();
        testUser.point = 0;
        console.log("Test 1: ล้างคะแนนสำเร็จ", testUser);
    }

    function testCase2() {
        const testUser = createTestUser();
        if (testUser.point === 100) {
            console.log("Test 2: ผ่าน", testUser);
        } else {
            console.log("Test 2: พัง!", testUser);
        }
    }

    testCase1();
    testCase2();
}

// Recreate data in Automation Test will use hooks like beforeEach() or beforeAll() to setup data before test case run
function testIsolationWithHooks() {
    let testUser;

    function beforeEachHook() {
        testUser = { name: "Jet Surachokchai", role: "QA", point: 100 };
    }

    function testCase1() {
        testUser.point = 0;
        console.log("Test 1:", testUser);
    }

    function testCase2() {
        if (testUser.point === 100) {
            console.log("Test 2: ผ่าน", testUser);
        } else {
            console.log("Test 2: พัง!", testUser);
        }
    }

    // จำลอง framework behavior
    beforeEachHook();
    testCase1();

    beforeEachHook();
    testCase2();
}

testIsolationWithHooks();


//============================== 9. beforeEach & beforeAll ===============================//
/* Jest มีฟังก์ชัน beforeEach() และ beforeAll() ที่ใช้สำหรับการเตรียมข้อมูลหรือสภาพแวดล้อมก่อนการทดสอบ
beforeEach() คือฟังก์ชันที่รันก่อนทุก test case ใน test suite นั้นๆ 
ใช้สำหรับการเตรียมข้อมูลหรือสภาพแวดล้อมให้พร้อมสำหรับการทดสอบ เช่น การสร้าง instance ใหม่ของ object, การรีเซ็ตค่าตัวแปร, หรือการ mock API เป็นต้น

beforeEach(() => {
    // รันก่อนทุก test case
    test1
    test2
    test3
    
})
👉 ใช้สำหรับ “สร้าง data ใหม่ทุกครั้ง”
*/


/*
beforeAll() คือฟังก์ชันที่รันก่อนการทดสอบทั้งหมดใน test suite นั้นๆ
ถ้ามี 3 test → มันจะรันแค่ครั้งเดียว

beforeAll(() => {
    // รันก่อนการทดสอบทั้งหมด
    test1
    test2
    test3
})
👉 เหมาะกับ setup ที่แพง เช่น connect database
👉 แต่เสี่ยงเรื่อง shared state
*/

