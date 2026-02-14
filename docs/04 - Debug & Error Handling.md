# Debug & Error Handling

> **เป้าหมาย:** ระบุและแก้ไข errors อย่างมีระบบใน Test Automation

---

## 📌 Table of Contents

- [[#Error Types|Error Types]]
- [[#Error Handling|Error Handling]]
- [[#Reading Stack Traces|Reading Stack Traces]]
- [[#Debugging Strategies|Debugging Strategies]]

---

## Error Types

JavaScript มี Error Types หลักที่ต้องรู้จัก

---

### ReferenceError

**เกิดเมื่อ:** อ้างถึงตัวแปรที่ไม่มีอยู่

```javascript
// ❌ ReferenceError
console.log(x)
// ReferenceError: x is not defined

function test() {
  console.log(y)
}
test()
// ReferenceError: y is not defined
```

#### สาเหตุทั่วไป

**1. ตัวแปรไม่ถูก declare**

```javascript
// ❌
if (user.isActive) {
  console.log(userName)  // ReferenceError: userName is not defined
}

// ✅
const userName = user.name
if (user.isActive) {
  console.log(userName)
}
```

**2. Typo ในชื่อตัวแปร**

```javascript
const userEmail = 'test@example.com'

// ❌ Typo
console.log(userEmial)  // ReferenceError: userEmial is not defined

// ✅
console.log(userEmail)
```

**3. Accessing before declaration (TDZ)**

```javascript
// ❌ Temporal Dead Zone
console.log(x)  // ReferenceError: Cannot access 'x' before initialization
const x = 10

// ✅
const x = 10
console.log(x)
```

**4. Scope issue**

```javascript
function outer() {
  const innerVar = 'inside'
}

// ❌
console.log(innerVar)  // ReferenceError: innerVar is not defined

// ✅ Move outside or return
function outer() {
  const innerVar = 'inside'
  return innerVar
}
console.log(outer())
```

---

### TypeError

**เกิดเมื่อ:** ใช้งานตัวแปรผิดประเภท

```javascript
// ❌ TypeError
const num = 5
num()  // TypeError: num is not a function

const obj = null
console.log(obj.property)  // TypeError: Cannot read property 'property' of null
```

#### สาเหตุทั่วไป

**1. Cannot read property of undefined/null**

```javascript
const user = null

// ❌
console.log(user.name)
// TypeError: Cannot read property 'name' of null

const data = undefined

// ❌
console.log(data.value)
// TypeError: Cannot read property 'value' of undefined
```

**✅ แก้ไข:**

```javascript
// Option 1: Check before access
if (user !== null && user !== undefined) {
  console.log(user.name)
}

// Option 2: Optional chaining
console.log(user?.name)  // undefined (ไม่ error)

// Option 3: Default value
const userName = user?.name ?? 'Unknown'
```

**2. Calling non-function**

```javascript
const config = {
  apiUrl: 'https://api.example.com'
}

// ❌
config.apiUrl()  // TypeError: config.apiUrl is not a function

// ✅ Check type first
if (typeof config.apiUrl === 'function') {
  config.apiUrl()
}
```

**3. Assignment to const**

```javascript
const x = 10

// ❌
x = 20  // TypeError: Assignment to constant variable

// ✅ Use let if you need to reassign
let y = 10
y = 20  // OK
```

**4. Cannot read property of primitive**

```javascript
const str = 'hello'

// ❌
str.nonExistent()  // TypeError: str.nonExistent is not a function

// String methods ใช้ได้
console.log(str.toUpperCase())  // 'HELLO' ✅
```

**5. Array/Object operation มิส match**

```javascript
const arr = [1, 2, 3]

// ❌ Push ไม่ return array ใหม่
const result = arr.push(4).map(x => x * 2)
// TypeError: Cannot read property 'map' of undefined
// (เพราะ push() return length, ไม่ใช่ array)

// ✅
arr.push(4)
const result = arr.map(x => x * 2)

// หรือใช้ immutable approach
const result = [...arr, 4].map(x => x * 2)
```

---

### SyntaxError

**เกิดเมื่อ:** โค้ดมี syntax ผิด (ไม่ valid JavaScript)

```javascript
// ❌ SyntaxError examples

// 1. Missing closing bracket
const obj = { name: 'Alice'
// SyntaxError: Unexpected end of input

// 2. Invalid syntax
const if = 10
// SyntaxError: Unexpected token 'if'

// 3. Missing quotes
const name = Alice
// ReferenceError (not SyntaxError, because it's valid syntax)

// 4. Invalid property name
const obj = {
  123abc: 'value'
}
// SyntaxError: Invalid or unexpected token
```

**⚠️ SyntaxError หาได้ง่ายที่สุด** เพราะโค้ดจะรันไม่ได้เลย

---

### อื่นๆ ที่เจอบ่อย

#### RangeError

**เกิดเมื่อ:** ค่าเกินขอบเขตที่กำหนด

```javascript
// ❌ RangeError
const arr = new Array(-1)
// RangeError: Invalid array length

function recursiveCall() {
  recursiveCall()
}
recursiveCall()
// RangeError: Maximum call stack size exceeded
```

#### URIError

**เกิดเมื่อ:** URI encoding/decoding ผิด

```javascript
// ❌ URIError
decodeURIComponent('%')
// URIError: URI malformed
```

---

## Error Handling

---

### try / catch

**ใช้เมื่อ:** คาดว่าโค้ดอาจ error

```javascript
try {
  // โค้ดที่อาจ error
  const data = JSON.parse(userInput)
  console.log(data)
} catch (error) {
  // จัดการ error
  console.error('Parse failed:', error.message)
}
```

#### Basic Pattern

```javascript
try {
  const result = riskyOperation()
  console.log(result)
} catch (error) {
  console.error('Error:', error.message)
}
```

#### Catch Specific Errors

```javascript
try {
  const user = getUser()
  console.log(user.name)  // อาจเป็น null
} catch (error) {
  if (error instanceof TypeError) {
    console.error('User is null or undefined')
  } else if (error instanceof ReferenceError) {
    console.error('Variable not found')
  } else {
    console.error('Unknown error:', error)
  }
}
```

#### finally Block

**finally** = รันเสมอ ไม่ว่าจะ error หรือไม่

```javascript
let fileHandle

try {
  fileHandle = openFile('data.txt')
  const data = readFile(fileHandle)
  processData(data)
} catch (error) {
  console.error('File processing failed:', error.message)
} finally {
  // รันเสมอ - cleanup resources
  if (fileHandle) {
    closeFile(fileHandle)
  }
}
```

**Use Case ใน Automation:**

```javascript
async function runTest() {
  let browser
  
  try {
    browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('https://example.com')
    // ... test steps
  } catch (error) {
    console.error('Test failed:', error)
    throw error  // Re-throw to fail test
  } finally {
    // Close browser ไม่ว่าจะผ่านหรือไม่
    if (browser) {
      await browser.close()
    }
  }
}
```

---

### throw new Error()

**ใช้เมื่อ:** ต้องการสร้าง error เอง

#### Basic throw

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero')
  }
  return a / b
}

try {
  const result = divide(10, 0)
} catch (error) {
  console.error(error.message)  // 'Cannot divide by zero'
}
```

#### Custom Error Messages

```javascript
function validateUser(user) {
  if (!user) {
    throw new Error('User is required')
  }
  if (!user.email) {
    throw new Error('User email is required')
  }
  if (!user.email.includes('@')) {
    throw new Error('Invalid email format')
  }
  return true
}

try {
  validateUser({ email: 'invalidemail' })
} catch (error) {
  console.error('Validation failed:', error.message)
  // 'Validation failed: Invalid email format'
}
```

#### Custom Error Classes

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.name = 'NetworkError'
    this.statusCode = statusCode
  }
}

// ใช้งาน
function fetchUser(id) {
  if (!id) {
    throw new ValidationError('User ID is required')
  }
  
  const response = fetch(`/api/users/${id}`)
  
  if (!response.ok) {
    throw new NetworkError('Failed to fetch user', response.status)
  }
  
  return response.json()
}

// Handle
try {
  const user = fetchUser(null)
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation:', error.message)
  } else if (error instanceof NetworkError) {
    console.error('Network:', error.message, error.statusCode)
  } else {
    console.error('Unknown:', error)
  }
}
```

---

### Early Return vs try/catch

**When to use which?**

#### ✅ Early Return (ดีกว่า)

```javascript
// ✅ Easy to read
function getUser(id) {
  if (!id) {
    return null
  }
  
  const user = database.find(id)
  
  if (!user) {
    return null
  }
  
  return user
}
```

#### ⚠️ try/catch (เมื่อจำเป็น)

```javascript
// ใช้เมื่อต้อง handle exception ที่อาจเกิด
function parseJSON(str) {
  try {
    return JSON.parse(str)
  } catch (error) {
    console.error('Invalid JSON:', error.message)
    return null
  }
}
```

---

### ❌ Anti-Patterns

**1. Empty catch**

```javascript
// ❌ ห้ามทำ - Swallow error
try {
  riskyOperation()
} catch (error) {
  // เงียบ - ไม่รู้ว่าเกิดอะไร
}

// ✅ Log อย่างน้อย
try {
  riskyOperation()
} catch (error) {
  console.error('Operation failed:', error)
  // อาจต้อง re-throw ใน test
  throw error
}
```

**2. Catch แล้วไม่ handle**

```javascript
// ❌
try {
  const data = JSON.parse(input)
  processData(data)
} catch (error) {
  console.log('Error occurred')  // แค่นี้ไม่พอ!
}

// ✅
try {
  const data = JSON.parse(input)
  processData(data)
} catch (error) {
  console.error('Parse error:', error.message)
  return fallbackData  // ให้ fallback
}
```

**3. try/catch ข้างใน loop**

```javascript
// ❌ ช้า
for (let i = 0; i < 1000; i++) {
  try {
    processItem(items[i])
  } catch (error) {
    console.error(error)
  }
}

// ✅ ย้าย try/catch ออกนอก
try {
  for (let i = 0; i < 1000; i++) {
    processItem(items[i])
  }
} catch (error) {
  console.error('Processing failed at item', i, error)
}
```

---

## Reading Stack Traces

**Stack Trace** = ร่องรอยการเรียก function ที่นำไปสู่ error

### Anatomy of a Stack Trace

```javascript
Error: User not found
    at getUser (user.js:10:11)
    at validateUser (validation.js:5:15)
    at main (index.js:20:3)
    at Object.<anonymous> (index.js:30:1)
```

**อ่านอย่างไร:**

```
Error: User not found           ← Error message
    at getUser                   ← Function ที่เกิด error
    (user.js:10:11)             ← ไฟล์:บรรทัด:ตำแหน่ง
    at validateUser              ← Function ที่เรียก getUser
    (validation.js:5:15)
    at main                      ← Function ที่เรียก validateUser
    (index.js:20:3)
```

**อ่านจากบนลงล่าง:**
1. บนสุด = เกิด error ตรงไหน
2. ถัดมา = ใครเรียก
3. ล่างสุด = entry point

---

### Real Stack Trace Example

```javascript
// user.js
function getUser(id) {
  if (!id) {
    throw new Error('User ID is required')
  }
  // ... fetch logic
}

// validation.js
function validateUser(id) {
  const user = getUser(id)  // Line 5
  return user
}

// index.js
function main() {
  const user = validateUser(null)  // Line 20
}

main()
```

**Output:**

```
Error: User ID is required
    at getUser (user.js:3:11)         ← เกิดที่นี่!
    at validateUser (validation.js:5:15)   ← เรียกโดย validateUser
    at main (index.js:20:3)                  ← เรียกโดย main
    at Object.<anonymous> (index.js:30:1)    ← Entry point
```

**วิธีดู:**
1. เริ่มจาก **บรรทัดแรก**: Error message
2. **บรรทัดที่สอง**: ที่มา (user.js บรรทัด 3) ← **ไปแก้ที่นี่**
3. บรรทัดถัดไป: Trace การเรียก ← ใช้เข้าใจ flow

---

### Stack Trace ใน Test Automation

```javascript
// page-objects/LoginPage.js
class LoginPage {
  async login(username, password) {
    await this.page.fill('#username', username)
    await this.page.fill('#password', password)
    await this.page.click('#login-btn')  // Line 8 - Error!
  }
}

// tests/login.test.js
test('should login', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.login('user@example.com', 'pass123')  // Line 15
})
```

**Error:**

```
Error: Timeout 30000ms exceeded.
Call log:
  - waiting for selector "#login-btn"
  
    at LoginPage.login (page-objects/LoginPage.js:8:23)  ← ที่เกิด error
    at Test.<anonymous> (tests/login.test.js:15:20)      ← Test ที่เรียก
```

**แก้ไข:**
1. ดู **LoginPage.js:8** ← selector ผิด?
2. เช็ค `#login-btn` มีจริงหรือไม่
3. อาจต้องเปลี่ยนเป็น `button[type="submit"]`

---

### Async Stack Traces

```javascript
async function fetchData() {
  const response = await fetch('/api/data')
  const data = await response.json()  // Error here!
  return data
}

async function processData() {
  const data = await fetchData()
  return data
}

async function main() {
  await processData()
}

main()
```

**Error:**

```
SyntaxError: Unexpected token < in JSON at position 0
    at Response.json (node:internal/deps/...)
    at async fetchData (script.js:3:16)     ← แปลง JSON ผิด
    at async processData (script.js:8:16)   ← เรียกโดย processData
    at async main (script.js:13:3)          ← เรียกโดย main
```

**ดูแล้วรู้:**
- Error เกิดที่ `response.json()` (บรรทัด 3)
- สาเหตุ: Response ไม่ใช่ JSON (อาจเป็น HTML error page)

**แก้ไข:**

```javascript
async function fetchData() {
  const response = await fetch('/api/data')
  
  // ✅ ตรวจสอบก่อน parse
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Response is not JSON')
  }
  
  return await response.json()
}
```

---

## Debugging Strategies

---

### 1. console.log Debugging

**Basic:**

```javascript
function calculateTotal(items) {
  console.log('items:', items)  // ดูค่า input
  
  const total = items.reduce((sum, item) => {
    console.log('item:', item, 'sum:', sum)  // ดูแต่ละรอบ
    return sum + item.price
  }, 0)
  
  console.log('total:', total)  // ดูผลลัพธ์
  
  return total
}
```

**Better: console.table**

```javascript
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 }
]

console.table(users)
// ┌─────────┬────┬─────────┬─────┐
// │ (index) │ id │  name   │ age │
// ├─────────┼────┼─────────┼─────┤
// │    0    │ 1  │ 'Alice' │ 25  │
// │    1    │ 2  │  'Bob'  │ 30  │
// └─────────┴────┴─────────┴─────┘
```

**console methods:**

```javascript
console.log('Normal log')
console.warn('Warning message')      // ⚠️ สีเหลือง
console.error('Error message')       // ❌ สีแดง
console.info('Info message')         // ℹ️ สีน้ำเงิน

console.dir(object, { depth: null }) // แสดง object ทั้งหมด

console.time('operation')
// ... code to measure
console.timeEnd('operation')         // operation: 123.456ms
```

---

### 2. Debugger Statement

```javascript
function problematicFunction(data) {
  const processed = processData(data)
  
  debugger  // ⏸️ หยุดตรงนี้ (เมื่อเปิด DevTools)
  
  return processed.map(item => item.value)
}
```

**ใช้เมื่อไหร่:**
- ต้องการ inspect variables ณ จุดใดจุดหนึ่ง
- รัน step-by-step
- ดู call stack จริง

---

### 3. Type Checking

```javascript
function processUser(user) {
  // ✅ Check types
  console.log('user type:', typeof user)
  console.log('is array:', Array.isArray(user))
  console.log('is null:', user === null)
  console.log('is undefined:', user === undefined)
  
  // Process...
}
```

**Defensive checks:**

```javascript
function safeProcess(data) {
  // Type guard
  if (typeof data !== 'object' || data === null) {
    console.error('Invalid data type:', typeof data)
    return null
  }
  
  if (Array.isArray(data)) {
    console.log('Data is array, length:', data.length)
  } else {
    console.log('Data is object, keys:', Object.keys(data))
  }
  
  // ... safe to process
}
```

---

### 4. ใช้ Guard Clauses

```javascript
// ❌ ซับซ้อน
function processUser(user) {
  if (user) {
    if (user.email) {
      if (user.email.includes('@')) {
        // ... logic
      } else {
        console.error('Invalid email')
      }
    } else {
      console.error('No email')
    }
  } else {
    console.error('No user')
  }
}

// ✅ ชัดเจน
function processUser(user) {
  if (!user) {
    console.error('No user')
    return
  }
  
  if (!user.email) {
    console.error('No email')
    return
  }
  
  if (!user.email.includes('@')) {
    console.error('Invalid email')
    return
  }
  
  // ... logic (ไม่ต้อง nest)
}
```

---

### 5. Error Boundaries ใน Automation

```javascript
// test-helpers.js
async function safeExecute(fn, errorMessage) {
  try {
    return await fn()
  } catch (error) {
    console.error(`${errorMessage}:`, error.message)
    console.error('Stack:', error.stack)
    throw error  // Re-throw to fail test
  }
}

// ใช้งาน
test('should login', async ({ page }) => {
  await safeExecute(
    () => page.goto('https://example.com'),
    'Failed to navigate'
  )
  
  await safeExecute(
    () => page.fill('#username', 'user@example.com'),
    'Failed to fill username'
  )
  
  // ถ้า error ได้ message ชัดเจน
})
```

---

## 🎯 Best Practices

### ✅ Do

1. **Always handle expected errors**
   ```javascript
   try {
     const data = JSON.parse(userInput)
   } catch (error) {
     console.error('Parse error:', error.message)
     return defaultData
   }
   ```

2. **Log meaningful messages**
   ```javascript
   console.error('Failed to fetch user', { userId, error: error.message })
   ```

3. **Use custom error classes**
   ```javascript
   class ValidationError extends Error {
     constructor(field, message) {
       super(`${field}: ${message}`)
       this.field = field
     }
   }
   ```

4. **Check types before operations**
   ```javascript
   if (typeof data === 'object' && data !== null) {
     // safe to use
   }
   ```

### ❌ Don't

1. **Don't swallow errors**
   ```javascript
   // ❌
   try {
     riskyOperation()
   } catch (e) {}
   ```

2. **Don't use generic error messages**
   ```javascript
   // ❌
   throw new Error('Something went wrong')
   
   // ✅
   throw new Error('Failed to parse user data: invalid email format')
   ```

3. **Don't ignore stack traces**
   ```javascript
   // ❌
   console.log(error.message)  // แค่นี้
   
   // ✅
   console.error(error.message)
   console.error(error.stack)  // ดู stack trace
   ```

---

## 📚 เชื่อมโยงกับ Notes อื่น

- [[01 - Core JavaScript|Core JavaScript]] - Basics
- [[02 - Data Handling|Data Handling]] - Safe operations
- [[03 - Immutability|Immutability]] - Prevent mutation bugs

---

**Last Updated:** 2026-02-14
