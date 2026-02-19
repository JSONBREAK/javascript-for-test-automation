# JavaScript Basics for QA Automation

## 1️⃣ Variables & Scope

- **var / let / const**
  - `var`: Function scope (ไม่ควรใช้ใน modern code)
  - `let`: Block scope, ใช้เมื่อค่าจะเปลี่ยนได้
  - `const`: Block scope, ใช้เมื่อไม่ต้องการ reassign ตัวแปร

- **Hoisting**
  - `var` ถูก hoist และมีค่าเริ่มต้นเป็น `undefined`
  - `let` / `const` ถูก hoist แต่จะอยู่ใน **Temporal Dead Zone (TDZ)**
  - การเข้าถึงตัวแปรก่อนประกาศด้วย `let` / `const` จะเกิด `ReferenceError`

- **Block vs Function Scope**
  - `let` / `const` มีขอบเขตใน `{ ... }`
  - `var` มีขอบเขตใน function เท่านั้น

- **Reassignment**
  - `let` สามารถเปลี่ยนค่าได้
  - `const` ไม่สามารถ reassign ได้  
  - หมายเหตุ: `const` ไม่ทำให้ object หรือ array กลายเป็น immutable

---

## 2️⃣ Data Types

### Primitive Types
- `string`
- `number`
- `boolean`
- `null`
- `undefined`
- `symbol`
- `bigint`

### Reference Types
- **Object**: โครงสร้างข้อมูลแบบ key-value
- **Array**: ลิสต์ของข้อมูล

---

### typeof

```js
typeof 123        // "number"
typeof "hello"    // "string"
typeof undefined  // "undefined"
```

---

null vs undefined

- null: ตั้งใจให้ว่าง
- undefined: ยังไม่ได้กำหนดค่า

---
### NaN

```js
typeof NaN       // "number"
NaN === NaN      // false
```

---

### Truthy / Falsy

- Falsy values:
  - false
  - 0
  - ''
  - null
  - undefined
  - NaN
- ค่าที่ไม่อยู่ในกลุ่มนี้ถือว่าเป็น Truthy

---