/*
Concept:
- Promise.all([p1, p2, p3]): รับ Array ของ Promise และรอให้ทุกตัว "สำเร็จ" ทั้งหมด
- หากมีตัวใดตัวหนึ่ง "พัง" (Reject) ทุกตัวจะพังทันที (All or Nothing)
- เหมาะสำหรับงานที่งานแต่ละชิ้นไม่ต้องการผลลัพธ์จากชิ้นก่อนหน้า
*/

const fetchData = (source, delay) => {
    return new Promise(res => setTimeout(() => {
        console.log(`✅ โหลดข้อมูลจาก ${source} เสร็จสิ้น`);
        res(`Data from ${source}`);
    }, delay));
};

// ❌ 1. แบบช้า (Sequential): รอทีละตัว
async function slowTest() {
    console.time("SlowTest");
    await fetchData("Users", 2000); // รอ 2 วิ
    await fetchData("Products", 2000); // รออีก 2 วิ
    await fetchData("Settings", 2000); // รออีก 2 วิ
    console.timeEnd("SlowTest"); // ใช้เวลาทั้งหมด ~6 วินาที
}

// ✅ 2. แบบเร็ว (Parallel): ใช้ Promise.all
async function fastTest() {
    console.time("FastTest");
    
    // เริ่มทำงานพร้อมกันทั้ง 3 อย่าง
    const results = await Promise.all([
        fetchData("Users", 2000),
        fetchData("Products", 2000),
        fetchData("Settings", 2000)
    ]);
    
    // results จะเป็น Array ตามลำดับที่เราใส่เข้าไป [res1, res2, res3]
    console.log("Results:", results);
    
    console.timeEnd("FastTest"); // ใช้เวลาทั้งหมดแค่ ~2 วินาที!
}

// ⚠️ 3. การจัดการ Error ใน Promise.all
async function errorHandlingAll() {
    try {
        await Promise.all([
            Promise.resolve("Success 1"),
            Promise.reject("💥 มีบางอย่างพัง!"), // ตัวนี้จะทำให้ทั้งกลุ่มพังทันที
            Promise.resolve("Success 2")
        ]);
    } catch (error) {
        console.error("🚩 ใน Promise.all ถ้าตัวหนึ่งพัง ที่เหลือจะถูกยกเลิกผลลัพธ์ทันที:", error);
    }
}