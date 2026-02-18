# Data Handling

> **เป้าหมาย:** เชี่ยวชาญ Array Methods และ Object Handling ที่ใช้ทุกวันในการเขียน Test Automation

---

## 📌 Table of Contents

- [[#Array Methods|Array Methods]]
- [[#Object Handling|Object Handling]]
- [[#JSON|JSON]]

---

## Array Methods

Array methods เป็นเครื่องมือหลักในการจัดการข้อมูล ใน Test Automation เราใช้งานทุกวัน!

---

### `map()` - แปลงข้อมูลทุกตัว

**ใช้เมื่อ:** ต้องการแปลงข้อมูลทุกตัวใน array

**Syntax:** `array.map(item => newValue)`

**Return:** Array ใหม่ที่มีขนาดเท่าเดิม

```javascript
const numbers = [1, 2, 3, 4, 5]

// แปลงทุกตัวเป็น 2 เท่า
const doubled = numbers.map(num => num * 2)
console.log(doubled)  // [2, 4, 6, 8, 10]

// ดึงเฉพาะ property ที่ต้องการ
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 }
]

const names = users.map(user => user.name)
console.log(names)  // ['Alice', 'Bob']

// สร้าง object ใหม่
const withEmails = users.map(user => ({
  ...user,
  email: `${user.name.toLowerCase()}@example.com`
}))
console.log(withEmails)
// [
//   { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
//   { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' }
// ]
```

**การมองเห็นภาพ:**

```
[1, 2, 3, 4, 5]
 ↓  ↓  ↓  ↓  ↓  (map: num => num * 2)
[2, 4, 6, 8, 10]

ขนาด Array เท่าเดิม ✅
```

---

### `filter()` - กรองข้อมูล

**ใช้เมื่อ:** ต้องการเอาเฉพาะข้อมูลที่ตรงเงื่อนไข

**Syntax:** `array.filter(item => condition)`

**Return:** Array ใหม่ที่มีเฉพาะข้อมูลที่ตรงเงื่อนไข

```javascript
const numbers = [1, 2, 3, 4, 5, 6]

// เอาเฉพาะเลขคู่
const evenNumbers = numbers.filter(num => num % 2 === 0)
console.log(evenNumbers)  // [2, 4, 6]

// กรอง user ที่มีอายุมากกว่า 18
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 }
]

const adults = users.filter(user => user.age > 18)
console.log(adults)
// [
//   { name: 'Alice', age: 25 },
//   { name: 'Charlie', age: 30 }
// ]

// กรองแบบหลายเงื่อนไข
const activeAdults = users.filter(user => {
  return user.age > 18 && user.active === true
})
```

**การมองเห็นภาพ:**

```
[1, 2, 3, 4, 5, 6]
 ✗  ✓  ✗  ✓  ✗  ✓  (filter: เลขคู่)
    ↓     ↓     ↓
    [2, 4, 6]

ขนาด Array เปลี่ยนได้ ⚠️
```

---

### `find()` - หาตัวแรกที่ตรงเงื่อนไข

**ใช้เมื่อ:** ต้องการหาข้อมูล **ตัวเดียว** ที่ตรงเงื่อนไข

**Syntax:** `array.find(item => condition)`

**Return:** ข้อมูลตัวแรกที่เจอ หรือ `undefined`

```javascript
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 }
]

// หา user ที่มี id = 2
const user = users.find(u => u.id === 2)
console.log(user)  // { id: 2, name: 'Bob', age: 30 }

// หาไม่เจอ
const notFound = users.find(u => u.id === 999)
console.log(notFound)  // undefined

// ใช้กับ API response
const apiResponse = {
  data: [
    { id: 1, status: 'pending' },
    { id: 2, status: 'completed' },
    { id: 3, status: 'pending' }
  ]
}

const completed = apiResponse.data.find(item => item.status === 'completed')
console.log(completed)  // { id: 2, status: 'completed' }
```

**⚠️ find vs filter:**

```javascript
const numbers = [1, 2, 3, 4, 5]

// find() - ได้ตัวแรก (ไม่ใช่ array)
const first = numbers.find(n => n > 2)
console.log(first)  // 3

// filter() - ได้ทุกตัว (เป็น array)
const all = numbers.filter(n => n > 2)
console.log(all)  // [3, 4, 5]
```

---

### `some()` - มีอย่างน้อย 1 ตัวที่ตรงไหม?

**ใช้เมื่อ:** ต้องการเช็คว่า **มีบางตัว** ตรงเงื่อนไขหรือไม่

**Syntax:** `array.some(item => condition)`

**Return:** `true` หรือ `false`

**คิดเป็น:** OR gate (มีตัวใดตัวหนึ่งตรง = true)

```javascript
const numbers = [1, 2, 3, 4, 5]

// มีเลขคู่ไหม?
const hasEven = numbers.some(num => num % 2 === 0)
console.log(hasEven)  // true

// มีเลขติดลบไหม?
const hasNegative = numbers.some(num => num < 0)
console.log(hasNegative)  // false

// ตรวจสอบไฟล์ที่อัปโหลด
const files = ['image.png', 'document.pdf', 'video.mp4']

const hasPDF = files.some(file => file.endsWith('.pdf'))
console.log(hasPDF)  // true

// Validation: มี user ที่อายุต่ำกว่า 18 ไหม?
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 }
]

const hasMinor = users.some(user => user.age < 18)
console.log(hasMinor)  // true
```

---

### `every()` - ทุกตัวตรงหรือเปล่า?

**ใช้เมื่อ:** ต้องการเช็คว่า **ทุกตัว** ตรงเงื่อนไข

**Syntax:** `array.every(item => condition)`

**Return:** `true` หรือ `false`

**คิดเป็น:** AND gate (ทุกตัวต้องตรง = true)

```javascript
const numbers = [2, 4, 6, 8, 10]

// ทุกตัวเป็นเลขคู่ไหม?
const allEven = numbers.every(num => num % 2 === 0)
console.log(allEven)  // true

const mixed = [2, 3, 4, 5, 6]
const allEvenMixed = mixed.every(num => num % 2 === 0)
console.log(allEvenMixed)  // false (เพราะมี 3 และ 5)

// Validation: ทุก field มีค่าไหม?
const formData = {
  name: 'Alice',
  email: 'alice@example.com',
  phone: '123456789'
}

const allFilled = Object.values(formData).every(value => 
  value !== null && value !== undefined && value.trim() !== ''
)
console.log(allFilled)  // true

// API Response Validation
const apiResponse = {
  data: [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: '' }  // ⚠️ ชื่อว่าง
  ]
}

const allHaveNames = apiResponse.data.every(item => 
  item.name && item.name.trim() !== ''
)
console.log(allHaveNames)  // false
```

**some() vs every():**

```
some()  = มีอย่างน้อย 1 ตัวที่ตรง (OR)  → true ถ้ามีตัวใดตัวหนึ่งตรง
every() = ทุกตัวต้องตรง (AND)           → true ถ้าทุกตัวตรง

numbers = [2, 4, 5, 6]

some(n => n % 2 === 0)   // true  (มี 2, 4, 6)
every(n => n % 2 === 0)  // false (มี 5 ไม่ตรง)
```

---

### `reduce()` - รวบรวมเป็นค่าเดียว

**ใช้เมื่อ:** ต้องการ "รวม" หรือ "แปลง" array เป็นค่าเดียว

**Syntax:** `array.reduce((accumulator, current) => newAccumulator, initialValue)`

**Return:** ค่าใดก็ได้ (number, string, object, array)

#### Pattern 1: รวมเป็นตัวเลข

```javascript
const numbers = [1, 2, 3, 4, 5]

// หาผลรวม
const sum = numbers.reduce((acc, num) => acc + num, 0)
console.log(sum)  // 15

// หาผลคูณ
const product = numbers.reduce((acc, num) => acc * num, 1)
console.log(product)  // 120

// หาค่าสูงสุด
const max = numbers.reduce((acc, num) => Math.max(acc, num), -Infinity)
console.log(max)  // 5
```

**การทำงานของ reduce:**

```
numbers = [1, 2, 3, 4, 5]
initial accumulator = 0

Step 1: acc=0,  current=1  →  return 0 + 1 = 1
Step 2: acc=1,  current=2  →  return 1 + 2 = 3
Step 3: acc=3,  current=3  →  return 3 + 3 = 6
Step 4: acc=6,  current=4  →  return 6 + 4 = 10
Step 5: acc=10, current=5  →  return 10 + 5 = 15

Result: 15
```

#### Pattern 2: Array → Object (Lookup Map)

```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
]

// แปลงเป็น object เพื่อ lookup ได้เร็ว O(1)
const userMap = users.reduce((acc, user) => {
  acc[user.id] = user
  return acc
}, {})

console.log(userMap)
// {
//   '1': { id: 1, name: 'Alice' },
//   '2': { id: 2, name: 'Bob' },
//   '3': { id: 3, name: 'Charlie' }
// }

// ใช้งาน
console.log(userMap[2])  // { id: 2, name: 'Bob' } ⚡ เร็ว!
```

**ทำไมต้องแปลง?**

```
// ❌ ช้า O(n)
const user = users.find(u => u.id === 2)

// ✅ เร็ว O(1)
const user = userMap[2]
```

#### Pattern 3: Group by Category

```javascript
const products = [
  { id: 1, name: 'Laptop', category: 'Electronics' },
  { id: 2, name: 'Shirt', category: 'Clothing' },
  { id: 3, name: 'Phone', category: 'Electronics' },
  { id: 4, name: 'Pants', category: 'Clothing' }
]

const grouped = products.reduce((acc, product) => {
  // ถ้ายังไม่มี category นี้ ให้สร้าง array ว่าง
  if (!acc[product.category]) {
    acc[product.category] = []
  }
  
  // เพิ่ม product เข้าไป
  acc[product.category].push(product)
  
  return acc
}, {})

console.log(grouped)
// {
//   Electronics: [
//     { id: 1, name: 'Laptop', category: 'Electronics' },
//     { id: 3, name: 'Phone', category: 'Electronics' }
//   ],
//   Clothing: [
//     { id: 2, name: 'Shirt', category: 'Clothing' },
//     { id: 4, name: 'Pants', category: 'Clothing' }
//   ]
// }
```

#### Pattern 4: Remove Duplicates

```javascript
const numbers = [1, 2, 3, 2, 4, 1, 5]

const unique = numbers.reduce((acc, num) => {
  if (!acc.includes(num)) {
    acc.push(num)
  }
  return acc
}, [])

console.log(unique)  // [1, 2, 3, 4, 5]
```

#### Pattern 5: Flatten Nested Array

```javascript
const nested = [[1, 2], [3, 4], [5]]

const flat = nested.reduce((acc, arr) => {
  return acc.concat(arr)
}, [])

console.log(flat)  // [1, 2, 3, 4, 5]

// หรือใช้ flat() ของ ES2019
const flat2 = nested.flat()
console.log(flat2)  // [1, 2, 3, 4, 5]
```

---

### 🎯 Array Methods Summary

| Method | Purpose | Return | ขนาด Array เปลี่ยนไหม? |
|--------|---------|--------|----------------------|
| `map()` | แปลงทุกตัว | Array ใหม่ | ไม่เปลี่ยน (เท่าเดิม) |
| `filter()` | กรองตามเงื่อนไข | Array ใหม่ | เปลี่ยนได้ (น้อยกว่าหรือเท่า) |
| `find()` | หาตัวแรก | ตัวที่เจอ หรือ `undefined` | - |
| `some()` | มีบางตัวตรงไหม | `true`/`false` | - |
| `every()` | ทุกตัวตรงไหม | `true`/`false` | - |
| `reduce()` | รวม/แปลง | อะไรก็ได้ | - |

---

## Object Handling

---

### Dot vs Bracket Notation

#### Dot Notation `.`

**ใช้เมื่อ:** รู้ชื่อ property แน่นอน

```javascript
const user = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com'
}

console.log(user.name)   // 'Alice'
console.log(user.age)    // 25
```

#### Bracket Notation `[]`

**ใช้เมื่อ:** 
- ชื่อ property เป็นตัวแปร
- ชื่อมีช่องว่างหรืออักขระพิเศษ
- ต้องการใช้ค่าจากตัวแปร

```javascript
const user = {
  name: 'Alice',
  'user-id': 123,
  'full name': 'Alice Wonderland'
}

// ❌ Dot ไม่ได้
// user.user-id
// user.full name

// ✅ Bracket ได้
console.log(user['user-id'])      // 123
console.log(user['full name'])    // 'Alice Wonderland'

// Dynamic access
const key = 'name'
console.log(user[key])  // 'Alice'

// ใช้กับ loop
const keys = ['name', 'user-id']
keys.forEach(key => {
  console.log(user[key])
})
```

---

### Destructuring - แตกข้อมูลออกมา

#### Object Destructuring

```javascript
const user = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com'
}

// ❌ แบบเก่า
const name = user.name
const age = user.age

// ✅ Destructuring
const { name, age } = user
console.log(name)  // 'Alice'
console.log(age)   // 25

// เปลี่ยนชื่อตัวแปร
const { name: userName, age: userAge } = user
console.log(userName)  // 'Alice'

// ใส่ค่า default
const { city = 'Unknown' } = user
console.log(city)  // 'Unknown'

// Nested destructuring
const data = {
  user: {
    profile: {
      name: 'Alice',
      age: 25
    }
  }
}

const { user: { profile: { name, age } } } = data
console.log(name)  // 'Alice'
```

#### Array Destructuring

```javascript
const colors = ['red', 'green', 'blue']

// ❌ แบบเก่า
const first = colors[0]
const second = colors[1]

// ✅ Destructuring
const [first, second, third] = colors
console.log(first)   // 'red'
console.log(second)  // 'green'

// ข้ามตัวกลาง
const [firstColor, , thirdColor] = colors
console.log(firstColor)   // 'red'
console.log(thirdColor)   // 'blue'

// ใช้กับ function return
function getCoordinates() {
  return [10, 20]
}

const [x, y] = getCoordinates()
console.log(x, y)  // 10 20
```

---

### Spread Operator `...`

**ใช้เมื่อ:** ต้องการ "กระจาย" ข้อมูล

#### กับ Array

```javascript
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]

// รวม array
const combined = [...arr1, ...arr2]
console.log(combined)  // [1, 2, 3, 4, 5, 6]

// Clone array
const cloned = [...arr1]
cloned.push(4)
console.log(arr1)    // [1, 2, 3] (ไม่เปลี่ยน)
console.log(cloned)  // [1, 2, 3, 4]

// เพิ่มข้อมูล
const withExtra = [...arr1, 4, 5]
console.log(withExtra)  // [1, 2, 3, 4, 5]
```

#### กับ Object

```javascript
const user = { name: 'Alice', age: 25 }
const address = { city: 'Bangkok', country: 'Thailand' }

// รวม object
const combined = { ...user, ...address }
console.log(combined)
// { name: 'Alice', age: 25, city: 'Bangkok', country: 'Thailand' }

// Clone object (shallow copy)
const cloned = { ...user }
cloned.age = 30
console.log(user)    // { name: 'Alice', age: 25 } (ไม่เปลี่ยน)
console.log(cloned)  // { name: 'Alice', age: 30 }

// Override property
const updated = { ...user, age: 30 }
console.log(updated)  // { name: 'Alice', age: 30 }

// เพิ่ม property
const withEmail = { 
  ...user, 
  email: 'alice@example.com' 
}
```

---

### Optional Chaining `?.`

**ใช้เมื่อ:** ไม่แน่ใจว่า property มีหรือไม่

**ป้องกัน:** `Cannot read property of undefined`

```javascript
const user = {
  name: 'Alice',
  address: {
    city: 'Bangkok'
  }
}

// ❌ อันตราย
const zipCode = user.address.zipCode.code  // Error!

// ✅ ปลอดภัย
const zipCode = user?.address?.zipCode?.code
console.log(zipCode)  // undefined (ไม่ error)

// กับ Array
const users = [
  { id: 1, profile: { name: 'Alice' } },
  { id: 2 },  // ไม่มี profile
]

const name = users[1]?.profile?.name
console.log(name)  // undefined

// กับ Function
const obj = {
  method: () => 'Hello'
}

console.log(obj.method?.())   // 'Hello'
console.log(obj.missing?.())  // undefined (ไม่ error)
```

**ใช้ใน Test Automation:**

```javascript
// API Response ที่ไม่แน่ใจ structure
const apiResponse = await fetch('/api/user')
const data = await apiResponse.json()

const userName = data?.user?.profile?.name ?? 'Unknown'
const userAge = data?.user?.profile?.age ?? 0
```

---

### Object.keys() / values() / entries()

#### `Object.keys()` - ดึง keys ทั้งหมด

```javascript
const user = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com'
}

const keys = Object.keys(user)
console.log(keys)  // ['name', 'age', 'email']

// ใช้กับ loop
Object.keys(user).forEach(key => {
  console.log(`${key}: ${user[key]}`)
})
// name: Alice
// age: 25
// email: alice@example.com
```

#### `Object.values()` - ดึง values ทั้งหมด

```javascript
const values = Object.values(user)
console.log(values)  // ['Alice', 25, 'alice@example.com']

// Validation: ทุก field มีค่าไหม?
const allFilled = Object.values(user).every(value => 
  value !== null && value !== undefined
)
```

#### `Object.entries()` - ดึง [key, value] pairs

```javascript
const entries = Object.entries(user)
console.log(entries)
// [
//   ['name', 'Alice'],
//   ['age', 25],
//   ['email', 'alice@example.com']
// ]

// Loop แบบได้ทั้ง key และ value
Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`)
})

// แปลงเป็น Map
const userMap = new Map(Object.entries(user))
```

---

### Object.fromEntries() - แปลงกลับเป็น Object

**ใช้คู่กับ** `Object.entries()` + Array methods

```javascript
const user = {
  name: 'Alice',
  age: undefined,
  email: null,
  city: 'Bangkok'
}

// ลบ undefined และ null ออก
const cleaned = Object.fromEntries(
  Object.entries(user)
    .filter(([key, value]) => value !== null && value !== undefined)
)

console.log(cleaned)
// { name: 'Alice', city: 'Bangkok' }

// เปลี่ยนชื่อ keys
const input = {
  first_name: 'Alice',
  last_name: 'Wonderland'
}

const renamed = Object.fromEntries(
  Object.entries(input).map(([key, value]) => {
    if (key === 'first_name') return ['firstName', value]
    if (key === 'last_name') return ['lastName', value]
    return [key, value]
  })
)

console.log(renamed)
// { firstName: 'Alice', lastName: 'Wonderland' }

// Normalize values
const formData = {
  name: '  Alice  ',
  email: 'ALICE@EXAMPLE.COM'
}

const normalized = Object.fromEntries(
  Object.entries(formData).map(([key, value]) => {
    if (typeof value === 'string') {
      return [key, value.trim().toLowerCase()]
    }
    return [key, value]
  })
)

console.log(normalized)
// { name: 'alice', email: 'alice@example.com' }
```

---

## JSON

**JSON** = JavaScript Object Notation (รูปแบบข้อมูลสำหรับส่งผ่าน API)

---

### `JSON.stringify()` - Object → JSON String

**ใช้เมื่อ:** ต้องการส่งข้อมูลผ่าน API หรือเก็บใน localStorage

```javascript
const user = {
  name: 'Alice',
  age: 25,
  hobbies: ['reading', 'coding']
}

// แปลงเป็น JSON string
const jsonString = JSON.stringify(user)
console.log(jsonString)
// '{"name":"Alice","age":25,"hobbies":["reading","coding"]}'

console.log(typeof jsonString)  // 'string'
```

**Pretty Print (ง่ายต่อการอ่าน):**

```javascript
// Parameter 3 = จำนวนช่องว่างสำหรับ indent
const prettyJson = JSON.stringify(user, null, 2)
console.log(prettyJson)
/*
{
  "name": "Alice",
  "age": 25,
  "hobbies": [
    "reading",
    "coding"
  ]
}
*/
```

**เลือก properties:**

```javascript
const jsonPartial = JSON.stringify(user, ['name', 'age'])
console.log(jsonPartial)
// '{"name":"Alice","age":25}'
```

---

### `JSON.parse()` - JSON String → Object

**ใช้เมื่อ:** รับข้อมูลจาก API หรืออ่านจาก localStorage

```javascript
const jsonString = '{"name":"Alice","age":25}'

// แปลงเป็น object
const user = JSON.parse(jsonString)
console.log(user)  // { name: 'Alice', age: 25 }
console.log(typeof user)  // 'object'

// ใช้ได้เลย
console.log(user.name)  // 'Alice'
```

**Error Handling:**

```javascript
const invalidJson = '{name: "Alice"}'  // ไม่ใช่ JSON ที่ถูกต้อง

try {
  const parsed = JSON.parse(invalidJson)
} catch (error) {
  console.error('Invalid JSON:', error.message)
  // Invalid JSON: Unexpected token n in JSON at position 1
}
```

---

### 🔄 Use Cases ใน Test Automation

#### 1. Deep Clone Object

```javascript
const original = {
  user: {
    name: 'Alice',
    settings: {
      theme: 'dark'
    }
  }
}

// ✅ Deep clone
const cloned = JSON.parse(JSON.stringify(original))

cloned.user.settings.theme = 'light'

console.log(original.user.settings.theme)  // 'dark' (ไม่เปลี่ยน)
console.log(cloned.user.settings.theme)    // 'light'
```

**⚠️ ข้อจำกัด:**
- ไม่รองรับ `function`, `undefined`, `Symbol`
- `Date` จะกลายเป็น string

```javascript
const obj = {
  func: () => 'hello',
  date: new Date(),
  undef: undefined
}

const cloned = JSON.parse(JSON.stringify(obj))
console.log(cloned)
// { date: '2024-...' }  (func และ undef หายไป!)
```

#### 2. เปรียบเทียบ Object

```javascript
const obj1 = { a: 1, b: 2 }
const obj2 = { a: 1, b: 2 }

// ❌ ผิด
console.log(obj1 === obj2)  // false (compare reference)

// ✅ ถูก
console.log(
  JSON.stringify(obj1) === JSON.stringify(obj2)
)  // true
```

#### 3. localStorage

```javascript
// บันทึก
const user = { name: 'Alice', age: 25 }
localStorage.setItem('user', JSON.stringify(user))

// อ่าน
const savedUser = JSON.parse(localStorage.getItem('user'))
console.log(savedUser)  // { name: 'Alice', age: 25 }
```

#### 4. API Request/Response

```javascript
// Request
const data = { name: 'Alice', age: 25 }

fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)  // แปลงเป็น JSON string
})

// Response
const response = await fetch('/api/users')
const users = await response.json()  // Parse JSON → Object
console.log(users)
```

---

## 🎯 Best Practices สำหรับ Automation

### ✅ ต้องทำ

1. **ใช้ Array Methods แทน for loop**
   ```javascript
   // ✅ ดี
   const names = users.map(u => u.name)
   
   // ❌ ไม่ดี
   const names = []
   for (let i = 0; i < users.length; i++) {
     names.push(users[i].name)
   }
   ```

2. **ใช้ Optional Chaining กับ API response**
   ```javascript
   const userName = response?.data?.user?.name ?? 'Unknown'
   ```

3. **Clone ก่อนแก้ไข**
   ```javascript
   const updated = { ...original, age: 30 }
   ```

4. **Validate ด้วย every()**
   ```javascript
   const allValid = users.every(u => u.email && u.name)
   ```

### ❌ ห้ามทำ

1. **อย่า mutate array เดิม**
   ```javascript
   // ❌ อันตราย
   users.push(newUser)
   
   // ✅ ปลอดภัย
   const updatedUsers = [...users, newUser]
   ```

2. **อย่าลืม try/catch กับ JSON.parse()**
   ```javascript
   try {
     const data = JSON.parse(jsonString)
   } catch (error) {
     console.error('Parse error:', error)
   }
   ```

3. **อย่าใช้ JSON.parse(JSON.stringify()) กับ function**
   ```javascript
   // ❌ function จะหายไป
   const cloned = JSON.parse(JSON.stringify(obj))
   ```

---

## 📚 เชื่อมโยงกับ Notes อื่น

- [[01 - Core JavaScript|Core JavaScript]] - Basics
- [[03 - Immutability|Immutability Patterns]] - Deep copy, Pure functions

---

**Last Updated:** 2026-02-14
