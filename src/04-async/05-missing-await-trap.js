/*
⚠️ The Missing Await Trap
เมื่อเราเรียกฟังก์ชัน async แต่ลืมใส่ 'await' ข้างหน้า:
1. JavaScript จะไม่หยุดรอ (Non-blocking) และข้ามไปทำบรรทัดถัดไปทันที
2. ค่าที่ส่งกลับมาจะไม่ใช่ "ข้อมูลจริง" แต่จะเป็น "Promise Object (ที่ยังทำงานไม่เสร็จ)"
3. นำไปสู่การเปรียบเทียบค่า (Assertion) ที่ผิดพลาดเสมอ
*/

const mockApi = () => new Promise(res => setTimeout(() => res("PASS"), 1000));

// ❌ 1. กับดัก: ลืมรอ ผลลัพธ์กลายเป็น Promise Object
async function missingAwaitDemo() {
    console.log("--- Missing Await Case ---");
    
    const status = mockApi(); // 🚩 ลืม await!
    
    console.log("Status is:", status); 
    // ผลลัพธ์: Status is: Promise { <pending> }
    
    if (status === "PASS") {
        console.log("✅ Test Passed");
    } else {
        console.log("❌ Test Failed (เพราะ status คือ Object ไม่ใช่ String 'PASS')");
    }
}

// ❌ 2. กับดัก: สคริปต์รันจบก่อนงานเสร็จ (Race Condition)
async function raceConditionDemo() {
    console.log("\n--- Race Condition Case ---");
    
    let dbValue = "Old Data";

    // สั่งอัปเดตแต่ไม่รอ
    const updateTask = new Promise(res => setTimeout(() => {
        dbValue = "Updated Data";
        res();
    }, 1000));

    // 🚩 ไม่ได้ await updateTask
    
    console.log("Checking DB Value:", dbValue); 
    // ผลลัพธ์: "Old Data" (เพราะบรรทัดบนยังทำงานไม่เสร็จ มันยังไม่อัปเดตค่า dbValue) 
}