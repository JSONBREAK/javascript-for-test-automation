# ชุดโจทย์ฝึก JavaScript QA Automation

## ข้อ 1: Filter Active Users
**คำถาม:**
จาก array ด้านล่าง ให้เขียนโค้ดเพื่อให้ได้เฉพาะชื่อของ user ที่ active เท่านั้น

```js
const users = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false },
  { id: 3, name: "Charlie", active: true }
]
```
**ผลลัพธ์ที่ต้องการ:**
["Alice", "Charlie"]

**เงื่อนไข:**
- ใช้ filter + map
- ห้าม mutate array เดิม

---

## ข้อ 2: Transform API Response
**คำถาม:**
จาก object response ด้านล่าง ให้ดึง array ของ email ออกมา

```js
const response = {
  status: 200,
  data: {
    users: [
      { id: 1, email: "a@test.com" },
      { id: 2, email: "b@test.com" }
    ]
  }
}
```
**ผลลัพธ์ที่ต้องการ:**
["a@test.com", "b@test.com"]

**เงื่อนไข:**
- ใช้ destructuring
- หลีกเลี่ยงการเขียน response.data.users ตรง ๆ หลายครั้ง

---

## ข้อ 3: Safe Nested Access
**คำถาม:**
จาก object user ด้านล่าง ให้เขียนฟังก์ชัน getCity(user) เพื่อคืนค่าชื่อเมือง ถ้าไม่มี address ให้คืน "Unknown"

```js
const user = {
  profile: {
    address: {
      city: "Bangkok"
    }
  }
}
```
**ตัวอย่างการใช้งาน:**
```js
getCity(user) // "Bangkok"
getCity({})   // "Unknown"
```
**เงื่อนไข:**
- ใช้ optional chaining
- มี default value

---

## ข้อ 4: Immutable Update
**คำถาม:**
จาก object order ด้านล่าง ให้เปลี่ยน status เป็น "completed" โดยไม่แก้ไข object เดิม และ items ต้องยังเป็น reference เดิม

```js
const order = {
  id: 1,
  status: "pending",
  items: ["apple", "banana"]
}
```
**เงื่อนไข:**
- ห้าม mutate object เดิม
- ห้ามแก้ items reference เดิม

---

## ข้อ 5: Detect Mutation
**คำถาม:**
เขียนฟังก์ชันที่รับ object มา clone แล้วแก้ไข clone จากนั้นตรวจสอบว่า original object ไม่เปลี่ยนแปลง

**เงื่อนไข:**
- ใช้ spread หรือ structuredClone

---

## ข้อ 6: Compare by Value
**คำถาม:**
จากตัวอย่างด้านล่าง อธิบายว่า `expected === actual` จะได้ผลลัพธ์เป็นอะไร และเพราะเหตุใด

```js
const expected = { id: 1, name: "Alice" }
const actual = { id: 1, name: "Alice" }
```
ควรเปรียบเทียบ object ใน automation อย่างไร

---

# แนวทางการฝึกให้ได้ผลจริง

- อย่าแค่เขียนให้ผ่าน ให้ถามตัวเองทุกข้อ:
  - มี mutation ไหม
  - deterministic ไหม
  - test case จะ contaminate ไหม
  - ถ้า async มา จะพังไหม
