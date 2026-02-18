# Immutability Patterns for Automation

> **เป้าหมาย:** เข้าใจ Immutability เพื่อป้องกันบั๊กที่เกิดจาก Mutation ใน Test Automation

---

## 📌 Table of Contents

- [[#Why Immutability Matters|Why Immutability Matters]]
- [[#Mutation vs Reassignment|Mutation vs Reassignment]]
- [[#Shallow Copy|Shallow Copy]]
- [[#Deep Copy|Deep Copy]]
- [[#StructuredClone|StructuredClone]]
- [[#Pure Functions|Pure Functions]]
- [[#Avoid Shared State|Avoid Shared State]]
- [[#Defensive Copying|Defensive Copying]]

---

## Why Immutability Matters

**Immutability** = ไม่เปลี่ยนแปลงข้อมูลเดิม

**ทำไมสำคัญใน Test Automation?**

```javascript
// ❌ ปัญหา: Test แรกผ่าน Test ที่สองล้ม เพราะ shared state
let testData = { user: 'Alice', status: 'active' }

test('should update status', () => {
  testData.status = 'inactive'  // เปลี่ยนข้อมูลเดิม!
  expect(testData.status).toBe('inactive')  // ✅ ผ่าน
})

test('should have active status', () => {
  expect(testData.status).toBe('active')  // ❌ ล้ม! (เพราะ Test แรกเปลี่ยนแล้ว)
})
```

```javascript
// ✅ แก้ไข: สร้างข้อมูลใหม่ทุกครั้ง
test('should update status', () => {
  const testData = { user: 'Alice', status: 'active' }
  const updated = { ...testData, status: 'inactive' }  // สร้างใหม่
  expect(updated.status).toBe('inactive')
})

test('should have active status', () => {
  const testData = { user: 'Alice', status: 'active' }
  expect(testData.status).toBe('active')  // ✅ ผ่าน
})
```

---

## Mutation vs Reassignment

**Mutation** = เปลี่ยนค่าภายใน (อันตราย ⚠️)

**Reassignment** = กำหนดค่าใหม่ (ปลอดภัย ✅)

### Primitive Types (ไม่มี Mutation)

```javascript
let x = 10
let y = x


console.log(x)  // 10 (ไม่เปลี่ยน)


```




### Reference Types (มี Mutation Risk!)

const obj2 = obj1  // ชี้ที่เดียวกัน!

obj2.name = 'Bob'

console.log(obj1.name)  // 'Bob' (เปลี่ยนตาม! ⚠️)
console.log(obj2.name)  // 'Bob'
```

**Memory Diagram:**

```
obj1 ─┐
      ├─→ { name: 'Alice' }
obj2 ─┘    (ชี้ที่เดียวกัน)

หลังแก้ไข:
obj1 ─┐
      ├─→ { name: 'Bob' }
obj2 ─┘    (เปลี่ยนตาม!)
```

---

## Shallow Copy

**Shallow Copy** = คัดลอกแค่ชั้นแรก

**ใช้เมื่อ:** Object/Array ไม่มี nested structure

### Array - Shallow Copy

#### 1. Spread Operator `...`

```javascript
const original = [1, 2, 3]
const copied = [...original]

copied.push(4)

console.log(original)  // [1, 2, 3] (ไม่เปลี่ยน)
console.log(copied)    // [1, 2, 3, 4]
```

#### 2. `Array.slice()`

```javascript
const original = [1, 2, 3]
const copied = original.slice()

copied[0] = 999

console.log(original)  // [1, 2, 3] (ไม่เปลี่ยน)
console.log(copied)    // [999, 2, 3]
```

#### 3. `Array.from()`

```javascript
const original = [1, 2, 3]
const copied = Array.from(original)
```

#### 4. `Array.concat()`

```javascript
const original = [1, 2, 3]
const copied = [].concat(original)
```

### Object - Shallow Copy

#### 1. Spread Operator `...`

```javascript
const original = { name: 'Alice', age: 25 }
const copied = { ...original }

copied.age = 30

console.log(original.age)  // 25 (ไม่เปลี่ยน)
console.log(copied.age)    // 30
```

#### 2. `Object.assign()`

```javascript
const original = { name: 'Alice', age: 25 }
const copied = Object.assign({}, original)

copied.age = 30

console.log(original.age)  // 25 (ไม่เปลี่ยน)
```

### ⚠️ Shallow Copy Limitation - Nested Objects

```javascript
const original = {
  name: 'Alice',
  address: {
    city: 'Bangkok',
    country: 'Thailand'
  }
}

// Shallow copy
const copied = { ...original }

// แก้ไข nested object
copied.address.city = 'Chiang Mai'

console.log(original.address.city)  // 'Chiang Mai' (เปลี่ยนตาม! ⚠️)
console.log(copied.address.city)    // 'Chiang Mai'
```

**ทำไมถึงเปลี่ยนตาม?**

```
Memory Diagram:

original → { 
  name: 'Alice',
  address: ─┐
}           │
            ├─→ { city: 'Bangkok', country: 'Thailand' }
copied → {  │
  name: 'Alice',
  address: ─┘  (ชี้ที่เดียวกัน!)
}
```

**Shallow Copy only copies the first level:**
- `name` ถูก copy (primitive)
- `address` ยังชี้ที่เดียวกัน (reference)

---

## Deep Copy

**Deep Copy** = คัดลอกทุกชั้น (รวม nested objects)

**ใช้เมื่อ:** Object/Array มี nested structure

### Method 1: JSON.parse(JSON.stringify())

```javascript
const original = {
  name: 'Alice',
  address: {
    city: 'Bangkok',
    country: 'Thailand'
  }
}

// Deep copy
const copied = JSON.parse(JSON.stringify(original))

copied.address.city = 'Chiang Mai'

console.log(original.address.city)  // 'Bangkok' (ไม่เปลี่ยน ✅)
console.log(copied.address.city)    // 'Chiang Mai'
```

**Memory Diagram:**

```
original → { 
  name: 'Alice',
  address: → { city: 'Bangkok', country: 'Thailand' }
}

copied → { 
  name: 'Alice',
  address: → { city: 'Chiang Mai', country: 'Thailand' }  (คนละกล่อง!)
}
```

#### ⚠️ Limitations of JSON Method

**1. ไม่รองรับ Functions**

```javascript
const obj = {
  name: 'Alice',
  greet: function() {
    return 'Hello'
  }
}

const copied = JSON.parse(JSON.stringify(obj))
console.log(copied)
// { name: 'Alice' }  (function หายไป!)
```

**2. ไม่รองรับ undefined**

```javascript
const obj = {
  name: 'Alice',
  age: undefined
}

const copied = JSON.parse(JSON.stringify(obj))
console.log(copied)
// { name: 'Alice' }  (undefined หายไป!)
```

**3. ไม่รองรับ Date, RegExp, Map, Set**

```javascript
const obj = {
  date: new Date(),
  pattern: /test/g,
  map: new Map([['key', 'value']])
}

const copied = JSON.parse(JSON.stringify(obj))
console.log(copied)
// {
//   date: '2026-02-14T...',  (กลายเป็น string!)
//   pattern: {},              (กลายเป็น object ว่าง!)
//   map: {}                   (กลายเป็น object ว่าง!)
// }
```

**4. ไม่รองรับ Circular References**

```javascript
const obj = { name: 'Alice' }
obj.self = obj  // ชี้ตัวเอง

const copied = JSON.parse(JSON.stringify(obj))
// ❌ Error: Converting circular structure to JSON
```

---

### Method 2: structuredClone() (Node 18+)

**Modern Solution** - รองรับเกือบทุกอย่าง!

```javascript
const original = {
  name: 'Alice',
  date: new Date(),
  pattern: /test/g,
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  nested: {
    deep: {
      value: 'nested'
    }
  }
}

const copied = structuredClone(original)

copied.nested.deep.value = 'changed'

console.log(original.nested.deep.value)  // 'nested' (ไม่เปลี่ยน ✅)
console.log(copied.nested.deep.value)    // 'changed'

console.log(copied.date instanceof Date)  // true ✅
console.log(copied.map instanceof Map)    // true ✅
```

#### ✅ Advantages

- รองรับ `Date`, `RegExp`, `Map`, `Set`, `ArrayBuffer`
- รองรับ nested objects/arrays ทุกระดับ
- รองรับ circular references บางกรณี
- เร็วกว่า JSON method

#### ⚠️ Limitations

**ยังไม่รองรับ Functions:**

```javascript
const obj = {
  name: 'Alice',
  greet: () => 'Hello'
}

const copied = structuredClone(obj)
// ❌ Error: Could not clone function
```

**ไม่รองรับ Symbols:**

```javascript
const sym = Symbol('test')
const obj = {
  [sym]: 'value'
}

const copied = structuredClone(obj)
console.log(copied[sym])  // undefined (Symbol หายไป)
```

---

### Method 3: Custom Deep Clone Function

**สำหรับ control เต็มที่:**

```javascript
function deepClone(obj) {
  // Primitive types
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  
  // Date
  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }
  
  // Array
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item))
  }
  
  // Object
  const cloned = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key])
    }
  }
  
  return cloned
}

// ใช้งาน
const original = {
  name: 'Alice',
  date: new Date(),
  hobbies: ['reading', 'coding'],
  address: {
    city: 'Bangkok'
  }
}

const copied = deepClone(original)
copied.address.city = 'Chiang Mai'

console.log(original.address.city)  // 'Bangkok' ✅
console.log(copied.date instanceof Date)  // true ✅
```

---

## Deep Copy Comparison

| Method | Nested Objects | Date | RegExp | Map/Set | Function | Circular Ref | Speed |
|--------|---------------|------|--------|---------|----------|--------------|-------|
| **JSON** | ✅ | ❌ → string | ❌ | ❌ | ❌ | ❌ | ⚡⚡⚡ Fast |
| **structuredClone** | ✅ | ✅ | ✅ | ✅ | ❌ | ⚠️ Some | ⚡⚡ Medium |
| **Custom** | ✅ | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚡ Slow |

**แนะนำ:**
- **Test Data (simple):** `JSON.parse(JSON.stringify())`
- **Test Data (complex):** `structuredClone()`
- **Production Code:** Custom or library (lodash.cloneDeep)

---

## Pure Functions

**Pure Function** = Function ที่:
1. **Same Input → Same Output** (deterministic)
2. **No Side Effects** (ไม่เปลี่ยนค่าข้างนอก)

### ✅ Pure Function

```javascript
// ✅ Pure
function add(a, b) {
  return a + b
}

console.log(add(2, 3))  // 5
console.log(add(2, 3))  // 5 (ผลลัพธ์เหมือนเดิมเสมอ)

// ✅ Pure - ไม่แก้ไข input
function addToArray(arr, item) {
  return [...arr, item]  // สร้าง array ใหม่
}

const original = [1, 2, 3]
const updated = addToArray(original, 4)

console.log(original)  // [1, 2, 3] (ไม่เปลี่ยน)
console.log(updated)   // [1, 2, 3, 4]
```

### ❌ Impure Function

```javascript
// ❌ Impure - มี side effect
let total = 0

function addToTotal(value) {
  total += value  // เปลี่ยนค่าข้างนอก!
  return total
}

console.log(addToTotal(5))  // 5
console.log(addToTotal(5))  // 10 (ผลลัพธ์เปลี่ยน! ไม่ deterministic)

// ❌ Impure - แก้ไข input
function addToArrayImpure(arr, item) {
  arr.push(item)  // แก้ไข array เดิม!
  return arr
}

const original = [1, 2, 3]
addToArrayImpure(original, 4)

console.log(original)  // [1, 2, 3, 4] (เปลี่ยน! อันตราย ⚠️)
```

### Hidden Side Effects

```javascript
// ❌ Hidden mutation
function updateUser(user) {
  user.lastModified = new Date()  // แก้ไข object!
  return user
}

const user = { name: 'Alice' }
const updated = updateUser(user)

console.log(user)  // { name: 'Alice', lastModified: ... } (เปลี่ยน! ⚠️)

// ✅ Pure version
function updateUserPure(user) {
  return {
    ...user,
    lastModified: new Date()
  }
}

const user2 = { name: 'Alice' }
const updated2 = updateUserPure(user2)

console.log(user2)     // { name: 'Alice' } (ไม่เปลี่ยน ✅)
console.log(updated2)  // { name: 'Alice', lastModified: ... }
```

---

## Immutable Update Patterns

**เป้าหมาย:** อัปเดตข้อมูลโดยไม่แก้ไขต้นฉบับ

### Array Updates

```javascript
const original = [1, 2, 3, 4, 5]

// ❌ Mutating
original.push(6)
original[0] = 999
original.splice(2, 1)

// ✅ Immutable - เพิ่มท้าย
const withNew = [...original, 6]

// ✅ Immutable - เพิ่มหน้า
const withNewFront = [0, ...original]

// ✅ Immutable - แก้ไขตำแหน่ง
const updated = original.map((item, index) => 
  index === 0 ? 999 : item
)

// ✅ Immutable - ลบตำแหน่ง
const removed = original.filter((item, index) => index !== 2)

// ✅ Immutable - แทนที่ตำแหน่ง
const replaced = [
  ...original.slice(0, 2),
  999,
  ...original.slice(3)
]
```

### Object Updates

```javascript
const user = {
  name: 'Alice',
  age: 25,
  address: {
    city: 'Bangkok',
    country: 'Thailand'
  }
}

// ✅ Update top-level property
const updated = {
  ...user,
  age: 30
}

// ✅ Update nested property
const updatedNested = {
  ...user,
  address: {
    ...user.address,
    city: 'Chiang Mai'
  }
}

// ✅ Add new property
const withEmail = {
  ...user,
  email: 'alice@example.com'
}

// ✅ Remove property
const { age, ...withoutAge } = user
console.log(withoutAge)  // { name: 'Alice', address: {...} }
```

### Deep Nested Updates

```javascript
const state = {
  user: {
    profile: {
      name: 'Alice',
      settings: {
        theme: 'dark',
        notifications: true
      }
    }
  }
}

// ✅ Update deep nested value
const updated = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      settings: {
        ...state.user.profile.settings,
        theme: 'light'
      }
    }
  }
}

console.log(state.user.profile.settings.theme)    // 'dark' (ไม่เปลี่ยน)
console.log(updated.user.profile.settings.theme)  // 'light'
```

**Helper Function:**

```javascript
function updateNested(obj, path, value) {
  const keys = path.split('.')
  const lastKey = keys.pop()
  
  let current = obj
  const cloned = JSON.parse(JSON.stringify(obj))
  let currentCloned = cloned
  
  for (const key of keys) {
    currentCloned = currentCloned[key]
  }
  
  currentCloned[lastKey] = value
  return cloned
}

// ใช้งาน
const updated = updateNested(
  state, 
  'user.profile.settings.theme', 
  'light'
)
```

---

## Avoid Shared State in Tests

**Shared State** = ข้อมูลที่ใช้ร่วมกันระหว่าง test cases

### ❌ Problem: Shared Mutable State

```javascript
// ❌ อันตราย - shared state
const testData = {
  users: [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]
}

describe('User Tests', () => {
  test('should add user', () => {
    testData.users.push({ id: 3, name: 'Charlie' })
    expect(testData.users.length).toBe(3)  // ✅ ผ่าน
  })
  
  test('should have 2 users', () => {
    expect(testData.users.length).toBe(2)  // ❌ ล้ม! (เพราะ test แรกเพิ่มแล้ว)
  })
})
```

### ✅ Solution 1: beforeEach

```javascript
describe('User Tests', () => {
  let testData
  
  beforeEach(() => {
    // สร้างใหม่ทุก test
    testData = {
      users: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]
    }
  })
  
  test('should add user', () => {
    testData.users.push({ id: 3, name: 'Charlie' })
    expect(testData.users.length).toBe(3)  // ✅
  })
  
  test('should have 2 users', () => {
    expect(testData.users.length).toBe(2)  // ✅
  })
})
```

### ✅ Solution 2: Factory Function

```javascript
function createTestData() {
  return {
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]
  }
}

describe('User Tests', () => {
  test('should add user', () => {
    const testData = createTestData()  // สร้างใหม่
    testData.users.push({ id: 3, name: 'Charlie' })
    expect(testData.users.length).toBe(3)
  })
  
  test('should have 2 users', () => {
    const testData = createTestData()  // สร้างใหม่
    expect(testData.users.length).toBe(2)
  })
})
```

### ✅ Solution 3: Deep Clone

```javascript
const baseTestData = {
  users: [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]
}

describe('User Tests', () => {
  test('should add user', () => {
    const testData = structuredClone(baseTestData)  // Clone
    testData.users.push({ id: 3, name: 'Charlie' })
    expect(testData.users.length).toBe(3)
  })
  
  test('should have 2 users', () => {
    const testData = structuredClone(baseTestData)  // Clone
    expect(testData.users.length).toBe(2)
  })
})
```

---

## Defensive Copying

**Defensive Copy** = คัดลอกข้อมูลเมื่อรับเข้ามา/ส่งออกไป

**ใช้เมื่อ:** ไม่แน่ใจว่าฝั่งอื่นจะแก้ไขหรือไม่

### At Function Boundaries

```javascript
// ✅ Defensive copy at input
function processUsers(users) {
  // Clone เพื่อป้องกัน caller แก้ไข
  const usersCopy = structuredClone(users)
  
  // ทำงานกับ copy
  usersCopy.forEach(user => {
    user.processed = true
  })
  
  return usersCopy
}

const originalUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
]

const processed = processUsers(originalUsers)

console.log(originalUsers[0].processed)  // undefined (ไม่เปลี่ยน ✅)
console.log(processed[0].processed)      // true
```

### With API Responses

```javascript
// ✅ Defensive copy after API call
async function fetchUsers() {
  const response = await fetch('/api/users')
  const data = await response.json()
  
  // Clone เพื่อป้องกันการแก้ไข response object
  return structuredClone(data)
}

// ใช้งาน
const users = await fetchUsers()
users[0].name = 'Modified'  // แก้ไขได้โดยไม่กระทบ cache
```

### With Test Fixtures

```javascript
// Test fixture
const USER_FIXTURE = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com'
}

// ✅ Always clone when using
test('should update user email', () => {
  const user = structuredClone(USER_FIXTURE)  // Clone!
  user.email = 'newemail@example.com'
  expect(user.email).toBe('newemail@example.com')
})

test('should have original email', () => {
  const user = structuredClone(USER_FIXTURE)  // Clone!
  expect(user.email).toBe('alice@example.com')  // ✅ ยังคงเดิม
})
```

---

## Real-World Automation Scenarios

### Scenario 1: Page Object Model

```javascript
// ❌ Shared state problem
class LoginPage {
  constructor() {
    this.credentials = {
      username: '',
      password: ''
    }
  }
  
  async login(username, password) {
    this.credentials.username = username  // ⚠️ Mutation!
    this.credentials.password = password
    // ... login logic
  }
}

// ปัญหา: หลาย test ใช้ instance เดียวกัน
const loginPage = new LoginPage()

test('test 1', async () => {
  await loginPage.login('user1', 'pass1')
  console.log(loginPage.credentials)  // { username: 'user1', ... }
})

test('test 2', async () => {
  // ⚠️ ยังมีข้อมูลจาก test 1!
  console.log(loginPage.credentials)  // { username: 'user1', ... }
})
```

```javascript
// ✅ Immutable approach
class LoginPage {
  async login(username, password) {
    // ไม่เก็บ state
    const credentials = { username, password }
    // ... login logic
    return credentials  // Return ถ้าจำเป็น
  }
}

// แต่ละ test สร้าง instance ใหม่
test('test 1', async () => {
  const loginPage = new LoginPage()
  await loginPage.login('user1', 'pass1')
})

test('test 2', async () => {
  const loginPage = new LoginPage()  // ใหม่เสมอ
  await loginPage.login('user2', 'pass2')
})
```

### Scenario 2: Test Data Builder

```javascript
// ✅ Immutable builder pattern
class UserBuilder {
  constructor(data = {}) {
    this.data = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      ...data
    }
  }
  
  withName(name) {
    return new UserBuilder({ ...this.data, name })
  }
  
  withEmail(email) {
    return new UserBuilder({ ...this.data, email })
  }
  
  build() {
    return structuredClone(this.data)  // Return copy
  }
}

// ใช้งาน
const baseUser = new UserBuilder()

test('test 1', () => {
  const user = baseUser.withName('Alice').build()
  console.log(user.name)  // 'Alice'
})

test('test 2', () => {
  const user = baseUser.withName('Bob').build()
  console.log(user.name)  // 'Bob'
  // baseUser ยังคงเดิม ✅
})
```

### Scenario 3: API Response Caching

```javascript
// ✅ Cache with defensive copying
class APICache {
  constructor() {
    this.cache = new Map()
  }
  
  set(key, value) {
    // Store a copy
    this.cache.set(key, structuredClone(value))
  }
  
  get(key) {
    const cached = this.cache.get(key)
    // Return a copy to prevent mutation
    return cached ? structuredClone(cached) : null
  }
}

// ใช้งาน
const cache = new APICache()

const userData = { id: 1, name: 'Alice' }
cache.set('user:1', userData)

const retrieved = cache.get('user:1')
retrieved.name = 'Modified'

const retrievedAgain = cache.get('user:1')
console.log(retrievedAgain.name)  // 'Alice' (ไม่เปลี่ยน ✅)
```

---

## 🎯 Best Practices Summary

### ✅ Always Do

1. **Clone test data ทุกครั้ง**
   ```javascript
   const testData = structuredClone(BASE_DATA)
   ```

2. **ใช้ Pure Functions**
   ```javascript
   // ✅ Return new, don't mutate
   function addItem(arr, item) {
     return [...arr, item]
   }
   ```

3. **Prefer const over let**
   ```javascript
   const user = { name: 'Alice' }
   const updated = { ...user, age: 30 }  // สร้างใหม่
   ```

4. **Use Array methods แทน mutation**
   ```javascript
   // ✅ filter, map, reduce
   const active = users.filter(u => u.active)
   
   // ❌ forEach + push
   const active = []
   users.forEach(u => {
     if (u.active) active.push(u)
   })
   ```

### ❌ Never Do

1. **อย่า mutate function arguments**
   ```javascript
   // ❌
   function update(obj) {
     obj.updated = true
   }
   ```

2. **อย่าใช้ shared state**
   ```javascript
   // ❌
   let globalTestData = {}
   ```

3. **อย่าใช้ mutating methods**
   ```javascript
   // ❌ push, pop, shift, unshift, splice, sort, reverse
   arr.push(item)
   obj.prop = value
   ```

---

## 📊 Mutation Detection Checklist

- [ ] มี `push`, `pop`, `shift`, `unshift`, `splice`?
- [ ] มี `obj.prop = value` หรือ `obj[key] = value`?
- [ ] มี `delete obj.prop`?
- [ ] มี `arr.sort()` หรือ `arr.reverse()`?
- [ ] Function แก้ไข argument?
- [ ] มี global/shared variable?

ถ้าตอบ **YES** ข้อใดข้อหนึ่ง → ⚠️ **มี Mutation Risk!**

---

## 📚 เชื่อมโยงกับ Notes อื่น

- [[01 - Core JavaScript|Core JavaScript]] - Primitive vs Reference
- [[02 - Data Handling|Data Handling]] - Array Methods, Spread Operator

---

**Last Updated:** 2026-02-14
