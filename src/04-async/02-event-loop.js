// Event Loop


// JavaScript single-threaded แล้ว async ทำงานได้ยังไง?

/*
Event Loop Model:
1. Call Stack → โค้ด synchronous จะถูกใส่ในนี้และทำงานทีละอย่าง
2. Web APIs → setTimeout, fetch, DOM events (จะถูกส่งไปที่นี่เพื่อรอการทำงานเสร็จ)
3. Macrotask Queue → setTimeout, setInterval, DOM events
4. Microtask Queue → Promise callbacks, async/await
5. Event Loop → ตรวจสอบ Call Stack และจัดลำดับการทำงาน
*/

// Step 1: What is Call Stack?

function callStack() {
    function first() {
        console.log("First");
    }
    function second() {
        first();
        console.log("Second");
    }
    second();
    // Output:
    // First
    // Second
}

// Step 2: add setTimeout (Macro Task)

function macroTaskExample() {
    console.log("Start");
    setTimeout(() => {
        console.log("Timeout");
    }, 0);
    console.log("End");

    // Output:
    // Start
    // End
    // Timeout
}
// Important Rule:
// Event Loop จะ clear Microtask Queue ทั้งหมดก่อนจะไปทำ Macrotask
// Step 3: add Promise (Micro Task)

function microTaskWithPromise() {
    console.log("Start");

    setTimeout(() => {
        console.log("Timeout");
    }, 0);

    Promise.resolve().then(() => {
        console.log("Promise");
    });

    console.log("End");
    // Output:
    // Start
    // End
    // Promise
    // Timeout
}

// Step 4: ทำให้เห็น Loop จริง ๆ

function eventLoop() {
    console.log("Start");

    setTimeout(() => {
        console.log("Timeout 1");
    }, 0);

    Promise.resolve().then(() => {
        console.log("Promise 1");
    });

    setTimeout(() => {
        console.log("Timeout 2");
    }, 0);

    Promise.resolve().then(() => {
        console.log("Promise 2");
    });

    console.log("End");
    // Output:
    // Start
    // End
    // Promise 1
    // Promise 2
    // Timeout 1
    // Timeout 2
}

// Key for QA Automation:
// Promise = Microtask
// async/await = Microtask
// then() = Microtask
// setTimeout = Macrotask
// setInterval = Macrotask
// DOM events = Macrotask

/*
Key Takeaways:

- JavaScript เป็น single-threaded
- Async ไม่ได้ทำงาน parallel ใน Call Stack
- setTimeout → Macrotask
- Promise → Microtask
- Microtask มี priority สูงกว่า Macrotask
- Event Loop ควบคุม execution order
*/
