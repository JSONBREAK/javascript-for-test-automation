# Core JavaScript

> **เป้าหมาย:** เข้าใจพื้นฐาน JavaScript ที่จำเป็นสำหรับการเขียน Test Automation ที่มั่นคง ปลอดภัย และทำนายผลได้

---

## 📌 Table of Contents

- [[#Variables & Scope|Variables & Scope]]
- [[#Data Types|Data Types]]  
- [[#Functions|Functions]]
- [[#Control Flow|Control Flow]]

---

## Variables & Scope

### 🎯 สิ่งที่ต้องเข้าใจ

ตัวแปรคือ "กล่องเก็บข้อมูล" และ Scope คือ "ขอบเขตที่เราเห็นกล่องนั้นได้"

---

### `var` vs `let` vs `const`

#### ❌ `var` (อย่าใช้ใน Code สมัยใหม่)

**ปัญหา:** มี **Function Scope** ไม่ใช่ Block Scope

```javascript
// ปัญหาของ var กับ loop
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
}
// Output: 3, 3, 3 ❌ (ไม่ใช่ 0, 1, 2)

// ทำไม? เพราะ var มี function scope ทำให้ i ตัวเดียวกันถูกแชร์
// เมื่อ setTimeout ทำงาน loop ทำงานจบแล้ว i = 3 ทั้งหมด
```

**แก้ปัญหา:** ใช้ `let` แทน

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
}
// Output: 0, 1, 2 ✅
```

---

#### ✅ `let` - สำหรับตัวแปรที่ต้องการเปลี่ยนค่า

**คุณสมบัติ:**
- **Block Scope** - อยู่ภายใน `{}` เท่านั้น
- **Reassign ได้** - เปลี่ยนค่าใหม่ได้
- **Redeclare ไม่ได้** - ประกาศซ้ำในขอบเขตเดียวกันไม่ได้

```javascript
let age = 25
age = 26  // ✅ reassign ได้

{
  let age = 30  // ✅ ต่างขอบเขต ทำได้
  console.log(age)  // 30
}

console.log(age)  // 26
```

---

#### ✅ `const` - สำหรับตัวแปรที่ไม่เปลี่ยนค่า (แนะนำให้ใช้เป็นค่าเริ่มต้น)

**คุณสมบัติ:**
- **Block Scope** - อยู่ภายใน `{}` เท่านั้น
- **Reassign ไม่ได้** - เปลี่ยนตัวแปรชี้ไปที่อื่นไม่ได้
- **แต่ Mutate ภายในได้** (ถ้าเป็น object/array)

```javascript
const PI = 3.14
// PI = 3.15  // ❌ Error: Assignment to constant variable

const user = { name: 'Alice' }
user.name = 'Bob'  // ✅ ทำได้! (mutation ของ object ภายใน)
// user = {}  // ❌ Error: ชี้ไปที่ object ใหม่ไม่ได้
```

---

### Block Scope คืออะไร?

**Block** = โค้ดที่อยู่ภายในเครื่องหมายปีกกา `{}`

```javascript
{
  var varBlock = 'I am var'
  let letBlock = 'I am let'
  const constBlock = 'I am const'
}

console.log(varBlock)    // ✅ 'I am var' (ไม่สนใจ block)
console.log(letBlock)    // ❌ ReferenceError (อยู่ใน block)
console.log(constBlock)  // ❌ ReferenceError (อยู่ใน block)
```

**การมองเห็นภาพ:**

```
┌─────────────────────── Function Scope (var) ──────────────────────┐
│                                                                   │
│  function example() {                                             │
│    var x = 1                                                      │
│                                                                   │
│    ┌──────────────── Block Scope (let/const) ─────────────────┐   │
│    │  {                                                       │   │
│    │    let y = 2                                             │   │
│    │    const z = 3                                           │   │
│    │    console.log(x, y, z)  // ✅ เห็นทั้งหมด                 │   │
│    │  }                                                       │   │
│    └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│    console.log(x)  // ✅ เห็น x                                    │
│    console.log(y)  // ❌ ไม่เห็น y (อยู่ใน block)                     │
│  }                                                                 │
└────────────────────────────────────────────────────────────────────┘
```

---

### Primitive vs Reference Types

นี่คือหัวใจสำคัญที่ต้องเข้าใจสำหรับการเขียน Automation!

#### 🔵 Primitive Types (เก็บค่าโดยตรง)

**ชนิด:** `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint`

**วิธีทำงาน:** Copy by Value (คัดลอกค่า)

```javascript
let a = 10
let b = a  // คัดลอกค่า 10 ไปให้ b
b = 20     // เปลี่ยนแค่ b

console.log(a)  // 10 (ไม่เปลี่ยน)
console.log(b)  // 20
```

**การมองเห็นภาพ:**

```
Memory:
┌─────┬─────┐
│  a  │ 10  │  ← a เก็บค่า 10
├─────┼─────┤
│  b  │ 20  │  ← b เก็บค่า 20 (คนละตัว)
└─────┴─────┘
```

---

#### 🔴 Reference Types (เก็บที่อยู่)

**ชนิด:** `object`, `array`, `function`

**วิธีทำงาน:** Copy by Reference (คัดลอกที่อยู่)

```javascript
let obj1 = { x: 1 }
let obj2 = obj1  // คัดลอก "ที่อยู่" ไม่ใช่ค่า
obj2.x = 2       // แก้ไขข้อมูลที่ "ที่อยู่" นั้น

console.log(obj1.x)  // 2 ⚠️ (เปลี่ยนด้วย!)
console.log(obj2.x)  // 2
```

**การมองเห็นภาพ:**

```
Memory:
┌─────┬──────────┐              ┌──────────┐
│ obj1│ 0x1234  ─┼─────────────→│  { x: 2 }│
├─────┼──────────┤              └──────────┘
│ obj2│ 0x1234  ─┼─────────────→    ↑
└─────┴──────────┘        (ชี้ที่เดียวกัน!)
```

**ทั้งคู่ชี้ไปที่ object ตัวเดียวกัน → แก้ไขตัวใด ตัวอื่นเปลี่ยนด้วย**

---

### ⚠️ อันตรายใน Test Automation

```javascript
// ❌ อันตราย: Test data ถูก mutate
const testUser = { name: 'John', age: 30 }

function test1() {
  testUser.age = 25  // แก้ไข shared data
}

function test2() {
  console.log(testUser.age)  // 25 ❌ (ไม่ใช่ 30 แล้ว!)
}

test1()
test2()
```

**วิธีแก้:** Clone ก่อนใช้

```javascript
// ✅ ปลอดภัย: Clone ก่อนใช้
const testUser = { name: 'John', age: 30 }

function test1() {
  const user = { ...testUser }  // Shallow copy
  user.age = 25
}

function test2() {
  console.log(testUser.age)  // 30 ✅
}
```

---

### Mutation vs Reassignment

#### Mutation = แก้ไขข้อมูลภายใน (ไม่เปลี่ยน reference)

```javascript
const arr = [1, 2, 3]
arr.push(4)  // 🔴 Mutation
console.log(arr)  // [1, 2, 3, 4]

const obj = { x: 1 }
obj.x = 2  // 🔴 Mutation
console.log(obj)  // { x: 2 }
```

#### Reassignment = เปลี่ยนตัวแปรชี้ไปที่ใหม่

```javascript
let arr = [1, 2, 3]
arr = [1, 2, 3, 4]  // 🔵 Reassignment (ชี้ไปที่ array ใหม่)

let obj = { x: 1 }
obj = { x: 2 }  // 🔵 Reassignment (ชี้ไปที่ object ใหม่)
```

**เปรียบเทียบ:**

```javascript
const data = { value: 1 }
data.value = 2     // ✅ Mutation ทำได้
// data = { value: 2 }  // ❌ Reassignment ทำไม่ได้ (เพราะใช้ const)
```

---

### 🎯 Best Practices สำหรับ Automation

1. **ใช้ `const` เป็นค่าเริ่มต้น** - ถ้าไม่จำเป็นต้องเปลี่ยน
2. **ใช้ `let` เมื่อต้องการ reassign** - เช่น counter, loop variable
3. **อย่าใช้ `var`** - มีปัญหา scope
4. **ระวัง mutation ของ object/array** - clone ก่อนใช้ใน test

---

## Data Types

JavaScript มี **10 ชนิดข้อมูล** แบ่งเป็น 2 กลุ่ม:

### 🔵 Primitive Types (7 ชนิด)

#### 1. `String` - ข้อความ

```javascript
const name = "Alice"
const message = 'Hello'
const template = `Hello, ${name}`  // Template string

console.log(typeof name)  // "string"
```

#### 2. `Number` - ตัวเลข

```javascript
const age = 25
const price = 99.99
const negative = -10
const infinity = Infinity
const notANumber = NaN

console.log(typeof age)  // "number"
console.log(typeof NaN)  // "number" (แม้จะเป็น Not-a-Number)
```

#### 3. `Boolean` - จริง/เท็จ

```javascript
const isActive = true
const isDeleted = false

console.log(typeof isActive)  // "boolean"
```

#### 4. `Null` - ค่าว่างที่ตั้งใจให้ว่าง

```javascript
let user = null  // ตั้งใจให้ไม่มีค่า

console.log(typeof null)  // "object" ⚠️ (bug ของ JavaScript)
```

#### 5. `Undefined` - ค่าว่างที่ยังไม่ได้กำหนด

```javascript
let x  // ประกาศแต่ไม่กำหนดค่า
console.log(x)  // undefined

console.log(typeof undefined)  // "undefined"
```

#### 6. `Symbol` - ค่าที่ไม่ซ้ำใคร (ไม่ค่อยใช้)

```javascript
const sym1 = Symbol('id')
const sym2 = Symbol('id')

console.log(sym1 === sym2)  // false (ไม่เท่ากัน)
```

#### 7. `BigInt` - ตัวเลขใหญ่มากๆ (ไม่ค่อยใช้)

```javascript
const bigNumber = 1234567890123456789012345678901234567890n
console.log(typeof bigNumber)  // "bigint"
```

---

### 🔴 Reference Types (3 ชนิด)

#### 8. `Object` - กล่องเก็บข้อมูลแบบ key-value

```javascript
const user = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com'
}

console.log(typeof user)  // "object"
```

#### 9. `Array` - ลิสต์ของข้อมูล

```javascript
const fruits = ['apple', 'banana', 'orange']

console.log(typeof fruits)  // "object" ⚠️
console.log(Array.isArray(fruits))  // true ✅ (วิธีเช็คที่ถูกต้อง)
```

#### 10. `Function` - ชุดคำสั่ง

```javascript
function greet() {
  return 'Hello'
}

console.log(typeof greet)  // "function"
```

---

### 🔍 typeof Operator

ใช้เช็คชนิดข้อมูล

```javascript
typeof "hello"        // "string"
typeof 42             // "number"
typeof true           // "boolean"
typeof undefined      // "undefined"
typeof { a: 1 }       // "object"
typeof [1, 2]         // "object" ⚠️
typeof null           // "object" ⚠️ (bug เก่าแก่ของ JavaScript)
typeof function() {}  // "function"
```

---

### ⚠️ จุดที่ต้องระวัง

#### 1. `null` vs `undefined`

```javascript
let x = null       // "ฉันตั้งใจให้มันว่าง"
let y              // "ฉันยังไม่ได้กำหนดค่า"

// เช็คแบบถูกต้อง
if (x === null) {
  console.log("x is null")
}

if (y === undefined) {
  console.log("y is undefined")
}
```

#### 2. `typeof null` → `"object"` (Bug!)

```javascript
// ❌ วิธีผิด
if (typeof value === "object") {
  // อาจเป็น null ได้!
}

// ✅ วิธีถูก
if (value !== null && typeof value === "object") {
  // ตอนนี้แน่ใจว่าเป็น object จริงๆ
}
```

#### 3. `typeof array` → `"object"`

```javascript
const arr = [1, 2, 3]

// ❌ วิธีผิด
if (typeof arr === "object") {
  // อาจเป็นแค่ object ธรรมดาก็ได้
}

// ✅ วิธีถูก
if (Array.isArray(arr)) {
  // แน่ใจว่าเป็น array
}
```

---

### 🎯 สรุป Data Types

| Type | Example | typeof | Notes |
|------|---------|--------|-------|
| String | `"hello"` | `"string"` | ✅ |
| Number | `42` | `"number"` | ✅ |
| Boolean | `true` | `"boolean"` | ✅ |
| Null | `null` | `"object"` | ⚠️ Bug! ใช้ `=== null` |
| Undefined | `undefined` | `"undefined"` | ✅ |
| Object | `{}` | `"object"` | ✅ |
| Array | `[]` | `"object"` | ⚠️ ใช้ `Array.isArray()` |
| Function | `function() {}` | `"function"` | ✅ |

---

## Functions

Function คือ "ชุดคำสั่งที่ทำงานซ้ำๆ ได้" และเป็นหัวใจสำคัญของการเขียน Test Automation

---

### Function Declaration

```javascript
function greet(name) {
  return `Hello, ${name}!`
}

console.log(greet("Alice"))  // "Hello, Alice!"
```

**คุณสมบัติ:**
- **Hoisting** - ใช้ได้ก่อนประกาศ

```javascript
sayHi()  // ✅ "Hi!" (ใช้ได้ก่อนประกาศ)

function sayHi() {
  return "Hi!"
}
```

---

### Arrow Function

```javascript
// แบบบรรทัดเดียว (มี implicit return)
const add = (a, b) => a + b

// แบบหลายบรรทัด (ต้อง return เอง)
const multiply = (a, b) => {
  return a * b
}

console.log(add(2, 3))      // 5
console.log(multiply(2, 3)) // 6
```

**ข้อแตกต่าง:**
- ไม่มี Hoisting (ใช้ก่อนประกาศไม่ได้)
- เหมาะกับ callback และ array methods

```javascript
// ❌ Error
sayHello()

const sayHello = () => "Hello"
```

---

### Parameters

#### Default Parameter

```javascript
function greet(name = "Guest") {
  return `Hello, ${name}!`
}

console.log(greet())         // "Hello, Guest!"
console.log(greet("Alice"))  // "Hello, Alice!"
```

#### Rest Parameter

```javascript
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0)
}

console.log(sum(1, 2, 3, 4))  // 10
```

---

### Return

```javascript
function checkAge(age) {
  if (age < 18) {
    return "Minor"  // Early return
  }
  
  if (age < 65) {
    return "Adult"
  }
  
  return "Senior"
}
```

**ถ้าไม่มี `return`:**

```javascript
function doSomething() {
  console.log("Doing...")
  // ไม่มี return
}

const result = doSomething()  // undefined
```

---

### 🌟 Pure Functions (สำคัญมาก!)

**คำนิยาม:**
1. Input เดียวกัน → Output เดียวกันเสมอ
2. ไม่มี Side Effects (ไม่แก้ไขตัวแปรภายนอก)

#### ✅ Pure Function

```javascript
function add(a, b) {
  return a + b
}

add(2, 3)  // 5 เสมอ
add(2, 3)  // 5 เสมอ
```

#### ❌ Impure Function

```javascript
let count = 0

function increment() {
  count += 1  // แก้ไขตัวแปรภายนอก
  return count
}

increment()  // 1
increment()  // 2 (ผลลัพธ์ไม่เหมือนเดิม!)
```

**ทำไม Pure Functions สำคัญ?**
- ทดสอบง่าย
- ทำนายผลได้
- ไม่มี bugs จาก shared state

---

### Higher-Order Function

Function ที่รับ function เป็น parameter หรือ return function

```javascript
function applyOperation(a, b, operation) {
  return operation(a, b)
}

const multiply = (x, y) => x * y

console.log(applyOperation(4, 2, multiply))  // 8
```

---

### Closure

Function ที่จำตัวแปรจาก outer scope ได้

```javascript
function createCounter() {
  let count = 0  // Private variable
  
  return function() {
    count += 1
    return count
  }
}

const counter = createCounter()
console.log(counter())  // 1
console.log(counter())  // 2
```

**การมองเห็นภาพ:**

```
createCounter() ─────────┐
                         │
  ┌──────────────────────┴─────────┐
  │  count = 0  (จำค่าไว้)         │
  │                                 │
  │  return function() {           │
  │    count += 1  ← เข้าถึงได้!  │
  │  }                              │
  └─────────────────────────────────┘
```

---

### Callback Function

Function ที่ส่งไปให้ function อื่นเรียกใช้

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = "Sample Data"
    callback(data)
  }, 1000)
}

fetchData((data) => {
  console.log("Received:", data)
})
// Output (หลัง 1 วินาที): "Received: Sample Data"
```

---

### IIFE (Immediately Invoked Function Expression)

Function ที่ทำงานทันทีเมื่อประกาศ

```javascript
(function() {
  console.log("This runs immediately!")
})()

// ใช้เมื่อต้องการ private scope
```

---

### 🎯 Best Practices

1. **ใช้ Pure Functions** - ทดสอบง่าย ทำนายผลได้
2. **ใช้ Arrow Functions** - สำหรับ callback สั้นๆ
3. **ใช้ Function Declarations** - สำหรับ helper functions หลักๆ
4. **Early Return** - ทำให้โค้ดอ่านง่าย
5. **ห้าม Mutate Parameters** - ป้องกัน side effects

---

## Control Flow

การควบคุมการทำงานของโปรแกรม

---

### if / else

```javascript
const age = 20

if (age < 18) {
  console.log("Minor")
} else if (age < 65) {
  console.log("Adult")
} else {
  console.log("Senior")
}
```

---

### switch

ใช้เมื่อต้องเลือกจากหลายกรณี

```javascript
const day = 3

switch (day) {
  case 1:
    console.log("Monday")
    break
  case 2:
    console.log("Tuesday")
    break
  case 3:
    console.log("Wednesday")
    break
  default:
    console.log("Another day")
}
```

⚠️ **อย่าลืม `break`!** ไม่งั้นจะทำต่อไปเรื่อยๆ

---

### for Loop

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i)  // 0, 1, 2, 3, 4
}
```

---

### for-of Loop (แนะนำ)

```javascript
const fruits = ["apple", "banana", "cherry"]

for (const fruit of fruits) {
  console.log(fruit)
}
// Output:
// apple
// banana
// cherry
```

---

### while Loop

```javascript
let count = 0

while (count < 3) {
  console.log(`Count: ${count}`)
  count++
}
// Output:
// Count: 0
// Count: 1
// Count: 2
```

⚠️ **ระวัง Infinite Loop!**

```javascript
// ❌ อันตราย
let x = 0
while (x < 10) {
  console.log(x)
  // ลืม x++  (วนไม่หยุด!)
}
```

---

### break - หยุดลูปทันที

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break  // หยุดที่ 5
  }
  console.log(i)  // 0, 1, 2, 3, 4
}
```

---

### continue - ข้ามรอบปัจจุบัน

```javascript
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue  // ข้าม 2
  }
  console.log(i)  // 0, 1, 3, 4
}
```

---

### 🎯 Best Practices

1. **ใช้ for-of** - แทน for ธรรมดา (อ่านง่ายกว่า)
2. **ใช้ Array Methods** - แทน loop (map, filter, find)
3. **Early Return** - แทน nested if
4. **หลีกเลี่ยง break/continue** - ทำให้โค้ดอ่านยาก

---

## 🎯 สรุปสำหรับ Test Automation

### ✅ ต้องทำ

1. ใช้ `const` เป็นค่าเริ่มต้น
2. Clone data ก่อนใช้ใน test
3. เขียน Pure Functions
4. ใช้ for-of แทน for ธรรมดา
5. เข้าใจ primitive vs reference

### ❌ ห้ามทำ

1. ใช้ `var`
2. Mutate shared data
3. เขียน Impure Functions
4. ใช้ `typeof` เช็ค Array (ใช้ `Array.isArray()`)
5. ลืม `break` ใน switch

---

## 📚 แหล่งเรียนรู้เพิ่มเติม

- [[02 - Data Handling|Data Handling]] - Array Methods, Object Handling
- [[03 - Immutability|Immutability Patterns]] - Copy patterns, Pure Functions
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

**Last Updated:** 2026-02-14
