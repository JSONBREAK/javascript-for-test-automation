# Introduction to Asynchronous JavaScript

> **Purpose:** This chapter provides QA Automation engineers with a clear, structured overview of how asynchronous handling evolved in JavaScript, why it matters, and how each model works in practice.

---

## 1. Why JavaScript Is Single-Threaded & Needs Non-Blocking Behavior

JavaScript ถูกออกแบบมาให้ทำงานบน browser ซึ่งต้องตอบสนองผู้ใช้แบบ real-time (เช่น คลิก, scroll, input) โดยไม่หยุดรอการทำงานอื่น ๆ เช่น network หรือ disk.

- **Single-threaded:** มีแค่ 1 thread ในการรัน code (main thread)
- **Non-blocking:** ถ้ารอ network หรือ I/O แล้ว block thread เดียว จะทำให้ UI ค้าง

> **ตัวอย่าง:**

```js
// ถ้า block thread ด้วย loop
while (true) {}
// Browser จะ freeze ทันที
```

---

## 2. Callback Model

**Callback** คือ function ที่ส่งเข้าไปให้รันเมื่อ async task เสร็จ

```js
setTimeout(function () {
  console.log('Done')
}, 1000)
```

// ตัวอย่าง callback async ที่ใช้ setTimeout
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

- ใช้กับ event, network, timer
- ทำให้ code ไม่ block thread

---

## 3. Callback Hell

เมื่อซ้อน callback หลายชั้น โค้ดจะอ่านยากและ debug ยาก

```js
login(user => {
  getProfile(user, profile => {
    getPosts(profile, posts => {
      // ...
    })
  })
})
```

> **ปัญหา:**
- โค้ดซ้อนหลายชั้น (pyramid of doom)
- error handling กระจาย
- maintain ยาก

---

## 4. Promise Model

**Promise** คือ object ที่แทนผลลัพธ์ async ในอนาคต

- **State:** pending → fulfilled หรือ rejected

```js
fetch('/api/user')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
```

- โค้ดแบนลง อ่านง่ายขึ้น
- error handling รวมศูนย์

---

## 5. Why Promise Was Not Enough

Promise chaining แม้จะช่วยลด callback hell แต่ยังมีข้อจำกัดสำคัญ:

- **Readability collapse:** โค้ดยาว ๆ ที่ chain หลายชั้นอ่านยากมาก
- **Error handling:** try/catch ไม่ครอบคลุม chain ข้างนอก ต้อง .catch แยก
- **Mental overhead:** ต้องเข้าใจ return chaining, error propagation, และ flow control

```js
doA()
  .then(resultA => doB(resultA))
  .then(resultB => doC(resultB))
  .catch(err => handleError(err))
// ถ้า .catch อยู่ข้างนอก อาจจับ error ไม่ครบ
```

---

## 6. Async/Await: Syntactic Sugar Over Promise

**async/await** ทำให้โค้ด async อ่านเหมือน synchronous

```js
async function run() {
  try {
    const user = await getUser()
    const posts = await getPosts(user.id)
    return posts
  } catch (err) {
    // error handling รวมศูนย์
  }
}
```

- อ่านง่ายขึ้น
- error handling ใช้ try/catch ได้
- ลด mental overhead

---

## 7. Event Loop Context (หัวใจของ async)

JavaScript ใช้ event loop เพื่อจัดการ async:

- **Call Stack:** รัน synchronous code
- **Web APIs:** จัดการ async (เช่น setTimeout, fetch)
- **Task Queue:** เก็บ callback ที่รอรัน
- **Microtask Queue:** เก็บ promise callbacks (then/catch)

> ภาพรวม:

```
┌─────────────┐
│ Call Stack  │
└─────┬───────┘
      │
      ▼
┌─────────────┐
│ Web APIs    │
└─────┬───────┘
      │
      ▼
┌─────────────┐
│ Task Queue  │
└─────┬───────┘
      │
      ▼
┌─────────────┐
│ Microtask   │
└─────────────┘
```

> async/await, promise, callback ทั้งหมดทำงานบน event loop นี้

---

## 8. QA Automation: Real-World Problems

ในโลก QA Automation (เช่น Playwright, Cypress) async bug มีผลร้ายแรงมาก:

- **Missing await:** test ผ่านปลอม, flaky test

```js
test('should fetch user', async () => {
  getUser() // missing await
  expect(true).toBe(true) // test ผ่านแต่จริง ๆ ไม่ได้รอผล
})
```

- **Race condition:** test รันพร้อมกันแล้ว data ปลอม
- **Promise ที่ไม่ return:** test runner ไม่รอ async จบ

```js
test('should fetch', () => {
  return fetchUser().then(user => {
    expect(user).toBeDefined()
  })
})
// ถ้าไม่ return promise test อาจผ่านปลอม
```

> **QA Engineers:** ต้องเข้าใจ async flow เพื่อป้องกัน flaky test, race condition, และ false positive

---

## 9. Conceptual Summary

- async/await ไม่ได้แทนที่ event loop
- async/await เป็น syntax layer บน promise
- event loop ยังคงเป็นหัวใจของ async ใน JavaScript
- QA Automation ต้องเข้าใจ async flow เพื่อเขียน test ที่มั่นคง

---

**End of Chapter**
