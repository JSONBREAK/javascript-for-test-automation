// Callbacks 

/*
โลกในอดีต(ก่อน Promise)
JavaScript ออกแบบให้เป็น:
- Single-threaded: ทำงานทีละอย่าง
- Non-blocking: ไม่หยุดรอการทำงานที่ใช้เวลานาน เช่น การเรียก API
- Event-driven: ทำงานตามเหตุการณ์ที่เกิดขึ้น เช่น คลิก, โหลดเสร็จ, etc.

ปัญหาคือ:
- ถ้า JS เป็น single-threaded แล้วมันรอ network response ยังไง?
*/

// =============================== รูปแบบดั้งเดิม ===============================
// Mental Model:
// 1. Synchronous code เข้า Call Stack ทันที
// 2. setTimeout ถูกส่งไป Web API
// 3. เมื่อครบเวลา → เข้า Task Queue
// 4. Event Loop ดึงกลับเข้า Call Stack


function callbackExample() {
    console.log("Start");

    setTimeout(() => {
        console.log("Callback");
    }, 0);

    console.log("End");
}

callbackExample();
// Output:
// Start
// End
// Callback


// =============================== Callback Hell ===============================

function callbackHell() {
    console.log("Start");
    setTimeout(() => {
        console.log("Step 1");
        setTimeout(() => {
            console.log("Step 2");
            setTimeout(() => {
                console.log("Step 3");
            }, 1000);
        }, 1000);
    }, 1000);
}

// Callback Hell ส่งผล:
// - Flow control ซับซ้อน
// - Error handling ยาก
// - Code readability แย่
// - Maintenance ยาก
// - Debugging ยาก
// - Inversion of control (เราไม่ได้ควบคุม flow เอง)
