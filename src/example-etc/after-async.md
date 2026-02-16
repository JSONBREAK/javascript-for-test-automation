# Async-Ready Engineering Checklist & Practice (QA Automation)

## 1. Variables & Scope
- เข้าใจความต่าง var, let, const และ block scope
- แยก primitive (copy by value) กับ reference type (copy by reference)
- รู้ว่า const กัน re-assign แต่ไม่กัน mutation

**โจทย์/คำถาม**
- อธิบายผลลัพธ์ของโค้ดนี้:
	```js
	let a = 1; let b = a; b = 2; // a = ?
	const obj1 = { x: 1 }; const obj2 = obj1; obj2.x = 99; // obj1.x = ?
	```

---
## 2. Data Types
- รู้จัก string, number, boolean, null, undefined, object, array
- ใช้ typeof, instanceof, Array.isArray ตรวจสอบชนิดข้อมูล

**โจทย์/คำถาม**
- typeof null ได้อะไร?  
- Array.isArray({}) vs Array.isArray([]) ต่างกันอย่างไร?
- `instanceof` ใช้กับอะไร?

---
## 3. Functions
- เขียน function declaration, arrow function ได้
- เข้าใจ return/early return
- เขียน pure function ได้ (input เดิม → output เดิม, ไม่ยุ่งกับภายนอก)

**โจทย์/คำถาม**
- เขียนฟังก์ชัน calculator(score) คืนค่า "Pass" ถ้า >= 50, "Fail" ถ้า < 50, "Invalid" ถ้าไม่ใช่ number
- อธิบายความต่าง pure/impure function พร้อมตัวอย่าง

---
## 4. Control Flow
- ใช้ if/else, switch, for, for-of, while, break, continue ได้

**โจทย์/คำถาม**
- เขียนฟังก์ชันวนลูปเช็กสินค้าใน cart:
	- ข้าม “Out of Stock” (continue)
	- เจอ “Broken Link” ให้หยุด (break)
	- ปกติให้ console.log ชื่อสินค้า

---
## 5. Data Handling (Array/Object)
- ใช้ map, filter, find, some, every, reduce ได้
- ใช้ destructuring, spread operator, JSON.parse/stringify

**โจทย์/คำถาม**
- ดึงชื่อสินค้าที่ available: true จาก array ของสินค้า (filter + map)
- อธิบายความต่าง map กับ forEach
- ยกตัวอย่างการใช้ spread operator กับ object

---
## 6. Immutability & Memory
- เข้าใจ shallow copy ({...obj}) vs deep copy (structuredClone)
- อธิบาย { id: 1 } === { id: 1 } เป็น false เพราะ reference ต่างกัน

**โจทย์/คำถาม**
- ยกตัวอย่าง mutation ที่เกิดกับ array/object
- เขียนโค้ด clone object แล้วแก้ไขโดยไม่กระทบต้นฉบับ

---
## 7. Debug & Error Handling
- ใช้ try/catch, อ่าน error.name, error.message, error.stack
- แยกแยะ ReferenceError, TypeError, SyntaxError ได้

**โจทย์/คำถาม**
- เขียนโค้ดที่พยายามเข้าถึง property ที่ไม่มีใน object แล้วจับ error ด้วย try/catch
- อธิบายความต่าง error sync/async

---
## 8. Test Isolation
- เข้าใจ test isolation, shared state, beforeEach/beforeAll
- รู้วิธี reset/recreate data ก่อนแต่ละ test

**โจทย์/คำถาม**
- อธิบายปัญหาของ shared mutable data ระหว่าง test case
- ยกตัวอย่างการใช้ beforeEach เพื่อสร้าง data ใหม่ทุกครั้ง

---
## Why This Checklist Matters for Async

> **Reference:** ถ้าไม่เข้าใจ reference เวลา async คืนค่ามา อาจงงว่าทำไมค่าที่ถือไว้ไม่อัปเดต
>
> **Scope:** ถ้าไม่เข้าใจ scope เวลาใช้ await ใน loop อาจเจอปัญหาตัวแปรถูกเขียนทับ
>
> **Safe Access:** ถ้าไม่ใช้ safe access เวลา test รันเร็วเกินไป ข้อมูลยังไม่มา อาจเจอ error undefined

---
