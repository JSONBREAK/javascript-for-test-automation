// JSON handling

// คือการจัดการ JSON = Sting => Object
// ตอนเราได้รับ JSON จาก API จะเป็น String เราต้องแปลงมันเป็น Object 

// ================================= JSON.parse() =================================
// แปลง JSON string เป็น object

function parseJson() {
    const jsonString = '{"name": "Alice", "age": 30, "isActive": true}'

    const user = JSON.parse(jsonString)
    console.log("Parsed object:", user) // Output: { name: 'Alice', age: 30, isActive: true }
}

// ================================= JSON.stringify() =================================
// แปลง object เป็น JSON string

function stringifyJson() {
    const user = { name: "Bob", age: 25, isActive: false }
    const jsonString = JSON.stringify(user)
    console.log("Stringified JSON:", jsonString) // Output: '{"name":"Bob","age":25,"isActive":false}'
}

// ============================== Automation (Advanced Tip) ==============================
// A. การทำ Pretty Print (ทำให้อ่านง่าย)

// JSON.stringify(Object,Replacer,Space) 
function prettyPrintJson() {
    const playload = {
        name: "Charlie",
        age: 28,
        isActive: true,
        hobbies: ["reading", "gaming", "hiking"]
    }
    const prettyJson = JSON.stringify(playload, null, 2) // ใช้ 2 ช่องว่างในการเยื้อง
    console.log(prettyJson)
}

// B. JSON Handling Strategy: Try-Catch
// การใช้ try-catch เพื่อจัดการกับข้อผิดพลาดที่อาจเกิดขึ้นจาก JSON.parse() เช่น ถ้า JSON ไม่ถูกต้อง

function safeParseJson() {
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("Parsing Error: ข้อมูลที่ได้มาไม่ใช่ JSON ที่ถูกต้อง");
        return null; // หรือจัดการตาม Logic ของเทสต์
    }
}
//console.log(safeParseJson('{"name": "Dave", "age": 22}')) // { name: 'Dave', age: 22 }
//console.log(safeParseJson('Invalid JSON')) // Parsing Error: ข้อมูลที่ได้มาไม่ใช่ JSON ที่ถูกต้อง


// =============================== Tip ===============================
// 1. this is String or Object?
// 2. is trusted source?
// 3. is it stable structure?
// 4. what if JSON missing fields? => จัดการ Fail ยังไง
// 5. shoud compair entire JSON or specific fields? 

function validateUserSchema(user) {
    if (!user) throw new Error("User is null")

    if (typeof user.name !== "string") {
        throw new Error("Invalid name type")
    }

    if (typeof user.age !== "number") {
        throw new Error("Invalid age type")
    }

    if (typeof user.isActive !== "boolean") {
        throw new Error("Invalid isActive type")
    }

    return true
}

// =============================== JSON Handling IRL ===============================
// Think: 
// 1. ข้อมูลที่ได้มาเป็น JSON string หรือ Object?
// 2. prase หรือยัง
// 3. framework มีเครื่องมือช่วยจัดการ JSON ไหม // เช่น Playwright มี JSON.parse() ในตัวอยู่แล้ว

// Why we need to "Think"
// 1. string access property ไม่ได้ => ต้อง parse ก่อน
// 2. object access property ได้เลย => ไม่ต้อง parse
// 3. parse ซ้ำจะ error หรือ เสีย performance => ต้องเช็คก่อนว่า parse หรือยัง

// Step 1: String or Object?
// Step 2: this JSON is Trusted Source? 
//  - Api production มักจะมี schema ที่ค่อนข้าง stable และเชื่อถือได้
//  - form mock => อาจจะมีโอกาสเจอ JSON ที่ไม่ถูกต้องหรือไม่ครบถ้วนมากกว่า ต้องระวังและจัดการให้ดี
//  - HTML element => อาจจะมีโอกาสเจอ JSON ที่ไม่ถูกต้องหรือไม่ครบถ้วนมากกว่า ต้องระวังและจัดการให้ดี
//  - empty string => JSON.parse("") จะ error ต้องจัดการกรณีนี้ด้วย
// Step 3: Structure stable?

/*
`response.user.profile.name` 
ถ้า user, profile, email = null หรือ undefined จะ error เพราะพยายามเข้าถึง property ของ null หรือ undefined
*/

// Step 4: Correctly Type? => age = number? / isActive = boolean? / name = string?
// Step 5: Is business rule valid? => age > 0? / name not empty? / isActive = true?

