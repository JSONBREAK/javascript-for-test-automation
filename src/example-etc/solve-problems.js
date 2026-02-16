// ข้อ 1: Filter Active Users
// คำถาม: จาก array ด้านล่าง ให้เขียนโค้ดเพื่อให้ได้เฉพาะชื่อของ user ที่ active เท่านั้น

// const users = [
//   { id: 1, name: "Alice", active: true },
//   { id: 2, name: "Bob", active: false },
//   { id: 3, name: "Charlie", active: true }
// ]
// ผลลัพธ์ที่ต้องการ: ["Alice", "Charlie"]

// เงื่อนไข:

// ใช้ filter + map
// ห้าม mutate array เดิม

function example1() {
    const users = [
        { id: 1, name: "Alice", active: true },
        { id: 2, name: "Bob", active: false },
        { id: 3, name: "Charlie", active: true }
    ]
    // active = ture map
    const activeUsers = users.filter(user => user.active).map(user => user.name);
    console.log(activeUsers) // [ 'Alice', 'Charlie' ]
}



//===========================================================================================//

/*
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
`["a@test.com", "b@test.com"]`

**เงื่อนไข:**
- ใช้ destructuring
- หลีกเลี่ยงการเขียน response.data.users ตรง ๆ หลายครั้ง
*/

function example2() {
    const response = {
        status: 200,
        data: {
            users: [
                { id: 1, email: "a@test.com" },
                { id: 2, email: "b@test.com" }
            ]
        }
    }
    // ["a@test.com", "b@test.com"]
    const {
        data: {
            users: [
                { email: first },
                { email: second }]
        }
    } = response;
    console.log(first, second)
}


//===========================================================================================//

/** 
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
*/

function example3() {
    const user = {
        profile: {
            address: {
                city: "Bangkok"
            }
        }
    }
    function getCity(user) {
        return user?.profile?.address?.city ?? "Unknown"
    }

    console.log(getCity(user)) // 'Bangkok'
    console.log(getCity({})) // 'Unknown'
}


//===========================================================================================//

/*
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
*/

function example4() {
    const order = {
        id: 1,
        status: "pending",
        items: ["apple", "banana"]
    }
    const updatedOrder = { ...order, status: "completed" };

    console.log(order) // { id: 1, status: 'pending', items: [ 'apple', 'banana' ] }
    console.log(updatedOrder) // { id: 1, status: 'completed', items: [ 'apple', 'banana' ] }
    console.log(order === updatedOrder) // false
}


//===========================================================================================//

/*
## ข้อ 6: Compare by Value
**คำถาม:**
จากตัวอย่างด้านล่าง อธิบายว่า `expected === actual` จะได้ผลลัพธ์เป็นอะไร และเพราะเหตุใด

```js
const expected = { id: 1, name: "Alice" }
const actual = { id: 1, name: "Alice" }
```
ควรเปรียบเทียบ object ใน automation อย่างไร
*/

function example5() {
    const expected = { id: 1, name: "Alice" }
    const actual = { id: 1, name: "Alice" }
    // คิดว่าเป็น false เพราะคนละ reference และคนละ Memory Address
}
example5()