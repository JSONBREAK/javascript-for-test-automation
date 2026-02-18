
# จะรู้ได้ไงว่าโดน Mutation?

> **QA Automation** มักต้องรับ Data จากที่อื่น (API, Config ฯลฯ) แล้วจะรู้ได้ยังไงว่า Data ที่ได้มา "โดนเปลี่ยน" (Mutated) หรือเปล่า?

ใน JavaScript ไม่มีฟังก์ชันสำเร็จรูปที่บอกว่า "ตัวแปรนี้เคยถูกเปลี่ยนค่ามาก่อน" เพราะเราจะเห็นแค่สถานะปัจจุบันเท่านั้น

---

## 3 กลยุทธ์ตรวจสอบและป้องกัน Mutation


### 1. ตรวจสอบสายสัมพันธ์ (Reference Equality)

```js
function checkMutation(original, input) {
    // เช็กว่าชี้ไปที่ Memory Heap เดียวกันไหม
    if (original === input) {
        console.log("⚠️ ปลอดภัยระดับ 0: สองตัวนี้คืออันเดียวกัน (Shared State)");
    } else {
        console.log("✅ ปลอดภัยระดับ 1: สองตัวนี้เป็นคนละ Object กัน (Shallow Copy แล้ว)");
    }
}
```


### 2. ตรวจสอบระดับ Nested (Deep Check)

ถ้า `copy !== original` แต่ `copy.nested === original.nested` แสดงว่าเกิด Mutation กับไส้ในได้:

```js
const isShallow = (obj1, obj2) => {
    return obj1 !== obj2 && obj1.nested === obj2.nested;
};
```

// ถ้าผลเป็น true แสดงว่า "เปลือกนอกแยกกัน แต่ไส้ในยังแชร์กันอยู่"

### 3. การป้องกันเชิงรุก (Proactive Defense)

ถ้าไม่มั่นใจว่า Input ที่ได้มาปลอดภัยไหม หรือกลัวจะเผลอ Mutate ของคนอื่น มี 2 วิธีป้องกัน:

#### A. ตรวจสอบสถานะการล็อค (Object.isFrozen)

```js
console.log(Object.isFrozen(original)); // true/false
```

#### B. บังคับ Deep Copy ทันที (The Safest Way)

หากได้รับ Input มาแล้วไม่มั่นใจ "ห้ามใช้ของเดิม" ให้ Deep Copy ใหม่ตั้งแต่ต้น:

```js
function processData(input) {
    // ไม่ต้องสืบว่า mutate ไหม... ก๊อปใหม่ตัดขาดทันที!
    const safeData = structuredClone(input); 
    // ทำงานกับ safeData ได้เต็มที่ ไม่กระทบต้นฉบับแน่นอน
    safeData.status = 'Processing'; 
}
```
