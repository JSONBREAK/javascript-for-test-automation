# JavaScript Automation QA: สรุปเนื้อหาแบบละเอียด

---

## 1. เป้าหมายของ Automation QA ด้วย JavaScript
- สร้าง automation ที่เสถียร, ทดสอบซ้ำได้, และดูแลรักษาง่าย
- ลดปัญหาจาก mutation, async, และ shared state
- เข้าใจ data transformation, error handling, และ test isolation

---

## 2. ข้อมูลพื้นฐานที่ต้องรู้

### 2.1 Variables & Scope
- `let`/`const` ต่างจาก `var` (block scope vs function scope)
- `const` ไม่ได้แปลว่า immutable (object/array ยังเปลี่ยน property/element ได้)
- Primitive (string, number, boolean, null, undefined, symbol, bigint) vs Reference (object, array, function)
- การ assign primitive จะ copy ค่า, assign object/array จะ copy reference

### 2.2 Data Types
- typeof ใช้เช็คชนิดข้อมูล
- null กับ undefined ต่างกัน (null = ตั้งใจว่าง, undefined = ยังไม่ได้กำหนด)
- Array, Object, Function เป็น reference type

### 2.3 Functions
- Function declaration vs arrow function
- Default parameters
- Pure function: ไม่เปลี่ยนแปลงค่าภายนอก, ผลลัพธ์ขึ้นกับ input เท่านั้น

### 2.4 Control Flow
- if/else, switch, for, for-of, while, break, continue
- ใช้ for-of กับ array, for-in กับ object (แต่ควรระวัง property ที่มาจาก prototype)

---

## 3. Data Handling (ใช้บ่อยใน Automation)

### 3.1 Array Methods
- map: แปลงค่าทุก element
- filter: คัดเลือก element ตามเงื่อนไข
- find: หา element แรกที่ตรงเงื่อนไข
- some/every: เช็คว่ามี/ทุก element ตรงเงื่อนไข
- reduce: สะสมค่าจาก array

### 3.2 Object Handling
- Dot/bracket notation (`obj.key` vs `obj['key']`)
- Destructuring: ดึงค่าจาก object/array
- Spread operator (`...`): clone/merge object, array
- Optional chaining (`?.`): เข้าถึง property ที่อาจไม่มีโดยไม่ error
- Object.keys/values/entries: แปลง object เป็น array

### 3.3 JSON
- JSON.parse(): แปลง string → object
- JSON.stringify(): แปลง object → string

---

## 4. Immutability Patterns
- หลีกเลี่ยง mutation (เปลี่ยนแปลงค่าของ object/array เดิม)
- ใช้ spread (`{...obj}` หรือ `[...arr]`) เพื่อ clone
- StructuredClone (Node 18+): deep clone object/array
- หลีกเลี่ยง shared state ระหว่าง test
- ทุก test case ควรเริ่มจาก data ใหม่เสมอ

---

## 5. Test Isolation
- หลีกเลี่ยงการใช้ข้อมูลร่วมกันระหว่าง test
- ไม่ควร reuse state หรือ object เดิม
- reset/recreate data ทุกครั้งก่อน run test

---

## 6. Debug & Error Handling
- Error types: ReferenceError, TypeError, SyntaxError
- try/catch, throw new Error()
- อ่าน stack trace เพื่อ debug
- Logging ที่ดีช่วยหาสาเหตุ bug ได้เร็ว

---

## 7. Async & Timing
- Promise, async/await
- Promise.all สำหรับรัน async หลายตัวพร้อมกัน
- เข้าใจ event loop (callback, microtask, macrotask)
- ระวัง race condition และ timing issue ใน automation

---

## 8. Node.js Basics
- เข้าใจ module system (require, import/export)
- npm/yarn สำหรับจัดการ dependency
- ใช้ environment variables (.env) สำหรับ config

---

## 9. Automation Best Practices
- เขียน test ที่ deterministic (ผลลัพธ์เหมือนเดิมทุกครั้ง)
- หลีกเลี่ยง flaky test (test ที่บางครั้งผ่าน บางครั้งล้มเหลว)
- ใช้ assertion library (เช่น expect, assert, chai)
- เปรียบเทียบ object ด้วย deep equality (ไม่ใช้ === กับ object)
- Mock/stub external dependency เพื่อควบคุมผลลัพธ์

---

## 10. Mindset
- Programmer: Make it work.
- Automation Engineer: Make it work, maintainable, and resistant to failure.
- ถามตัวเองเสมอ: มี mutation ไหม, deterministic ไหม, test contaminate กันไหม, ถ้า async มา test จะพังไหม

---

เนื้อหานี้คือแกนหลักที่ Automation QA ต้องเข้าใจและใช้ได้จริงกับ JavaScript เพื่อให้ automation มีคุณภาพสูงและดูแลรักษาง่ายในระยะยาว
