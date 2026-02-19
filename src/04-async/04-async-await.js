/*
Concept:
- 'async' keyword: วางหน้า function เพื่อบอกว่าฟังก์ชันนี้จะทำงานแบบ Asynchronous และจะคืนค่าเป็น Promise เสมอ
- 'await' keyword: วางหน้า Promise เพื่อสั่งให้ JavaScript "หยุดรอ" จนกว่างานนั้นจะเสร็จ (resolve) ถึงจะไปบรรทัดถัดไป
*/

// 🧠 Step 1: เปลี่ยนจาก .then() เป็น await
// ช่วยให้เขียนโค้ดเรียงจากบนลงล่าง ไม่ต้องมีปีกกาซ้อนกันเยอะๆ

async function basicAsync() {
    console.log("1. เริ่มดึงข้อมูล");
    
    // แทนที่จะใช้ .then() เราใช้ await วางหน้า Promise
    const data = await Promise.resolve({ id: 101, status: "Active" });
    
    console.log("2. ข้อมูลที่ได้:", data.status); // บรรทัดนี้จะรอจนกว่าข้อมูลบรรทัดบนจะมา
    console.log("3. ทำงานอื่นต่อ");
}

// 🧠 Step 2: การจัดการ Error (Try-Catch)
// ใน async/await เราจะไม่ใช้ .catch() ต่อท้าย แต่จะใช้บล็อก try-catch มาตรฐานแทน

async function handleApiError() {
    try {
        console.log("--- เริ่มการทดสอบ API ---");
        const response = await Promise.reject("API Connection Failed!"); // จำลอง Error
        console.log(response); // บรรทัดนี้จะไม่ถูกรันถ้าบรรทัดบนพัง
    } catch (error) {
        // Error Propagation (Step 5 เดิม) จะไหลมาตกที่นี่ทันที
        console.error("🚩 ตรวจพบข้อผิดพลาด:", error);
    } finally {
        console.log("🧹 Finally: ปิด Browser ไม่ว่าเทสต์จะผ่านหรือพัง");
    }
}

// 🧠 Step 3: การ Return ค่าจาก Async Function
// สำคัญ: ฟังก์ชัน async จะ return ออกมาเป็น "Promise" เสมอ!

async function getAdminName() {
    return "Jet Admin"; // ถึงแม้จะ return string เฉยๆ แต่มันจะถูกห่อเป็น Promise อัตโนมัติ
}

// วิธีเรียกใช้ค่าที่ return จาก async:
// 1. ใช้ .then() 
// 2. หรือใช้ await (ต้องอยู่ภายใต้ฟังก์ชัน async อื่น)
async function runDemo() {
    const name = await getAdminName();
    console.log("Admin is:", name);
}