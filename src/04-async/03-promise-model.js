// promise model

/*
Problem: Callback hell ทำให้ control flow ซับซ้อน, error handling ยาก, code readability แย่, maintenance ยาก, debugging ยาก, inversion of control

Solution: 
Promise คือ object ที่แทนค่าของการทำงานที่ยังไม่เสร็จสมบูรณ์ (pending) และจะถูก resolve หรือ reject ในอนาคต
ส่งผลให้ จัดการลำดับการทำงานได้ง่ายขึ้น
*/

/*
Promise มี 3 states:
1. Pending: รอการทำงานเสร็จสมบูรณ์
2. Fulfilled: สำเร็จ (resolve)
3. Rejected: ล้มเหลว (reject)

Important Methods:
- Promise เปลี่ยน state ได้แค่ครั้งเดียว
- .then() ใช้จัดการกับผลลัพธ์เมื่อ Promise ถูก resolve
- .catch() ใช้จัดการกับข้อผิดพลาดเมื่อ Promise ถูก reject
- .finally() ใช้จัดการกับโค้ดที่ต้องทำไม่ว่าจะสำเร็จหรือไม่ เช่น การปิด loading spinner

สรุป: Promise เปลี่ยนจาก pending → fulfilled/rejected ครั้งเดียวเท่านั้น
*/

// 🧠 Step 1 — สร้าง Promise

function createPromise() {
    // ตัวอย่างการสร้าง Promise ที่ resolve สำเร็จ
    const promise = new Promise((resolve, reject) => {
        const success = true;
        if (success) {
            resolve("Promise resolved successfully!");
        } else {
            reject("Promise rejected!");
        }
    });

    // การใช้งาน Promise
    promise
        .then((data) => {
            console.log("success:", data); // "Promise resolved successfully!"
        })
        .catch((error) => {
            console.log("error:", error); // "Promise rejected!"
        })
        .finally(() => {
            console.log("Promise settled"); // ไม่ว่าจะสำเร็จหรือไม่
        });
}
// Need to understand:
// - resolve(value) → เปลี่ยน state เป็น fulfilled และส่ง value ไปยัง .then()
// - reject(reason) → เปลี่ยน state เป็น rejected และส่ง reason ไปยัง .catch()
// - .then() และ .catch() ถูกใส่ใน Microtask Queue

// 🧠 Step 2 — Promise = Control Flow Tool
// Callback Hell

function callbackHell() {
    setTimeout(() => {
        console.log("Step 1");
        setTimeout(() => {
            console.log("Step 2");
        }, 1000);
    }, 1000);
}

// 🧠 Step 3 — Promise Chaining
function promiseChaining() {
    Promise.resolve("Step 1")
        .then((result) => {
            console.log(result); // "Step 1"   
            return "Step 2";
        })
        .then((result) => {
            console.log(result); // "Step 2"
            return "Step 3";
        })
        .then((result) => {
            console.log(result); // "Step 3"
        })
        .catch((error) => {
            console.error("Error:", error);
        });

        // Readability จากบนลงล่าง → ง่ายต่อการเข้าใจ flow มากขึ้น
        // Error handling ง่ายขึ้น → .catch() จัดการกับข้อผิดพลาดทั้งหมดใน chain
}

// 🧠 Step 4 — Error Propagation
// Error Propagation คือ การที่ข้อผิดพลาดที่เกิดขึ้นใน Promise chain จะถูกส่งต่อไปยัง .catch() ที่อยู่ท้ายสุดของ chain นั้น

function promiseErrorHandling() {
    Promise.resolve()
    .then(() => {
        throw new Error("Something went wrong!");
    })
    .then(() => {
        console.log("This will not run");
    })
    .catch((error) => {
        console.error("Caught error:", error.message); // "Caught error: Something went wrong!"
    });

    // Important:
    // - Error จะ bubble ลงมา .catch() ตัวเดียวได้
    // - ไม่ต้องจัดการ error หลายชั้นเหมือน callback hell
}



