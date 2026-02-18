//-------------------- Immutable Data & Pure Functions --------------------//


// Topics: Immutability, Pure functions, Immutable update patterns, Practice exercises

//-------------------- Immutable Data --------------------//

function example1() {
    // Immutable Data คือ ข้อมูลที่ไม่สามารถเปลี่ยนแปลงได้หลังจากที่ถูกสร้างขึ้น
    // Example 1: Mutation with const object
    function incorrect() {
        function addRole(user) {
            user.role = "admin"
            return user
        }
        const testUser = { name: "John" }
        const result = addRole(testUser)
        console.log("Incorrect Mutation Example:")
        console.log(testUser) // ถ้าเอาไปใช้ต่อ อาจจะเกิดปัญหาได้เพราะ testUser ถูก mutated   
        console.log(result)
    }

    function correct() {
        function addRoleImmutable(user) {
            return {
                ...user,
                role: "admin"
            }
        }
        const testUser = { name: "John" }
        const result = addRoleImmutable(testUser)
        console.log("Correct Immutable Example:")
        console.log(testUser) // สามารถเอาไปใช้ต่อได้โดยไม่ต้องกังวลเรื่อง mutation
        console.log(result)
    }
    incorrect();
    correct();
}

//-------------------- Pure Function --------------------//

function pureFunction() {
    // Pure Function คือ ฟังก์ชันที่มีลักษณะดังนี้: //Pure Function (สำคัญมากกับ test utils)
    // 1. ให้ผลลัพธ์เดียวกันเสมอเมื่อได้รับอินพุตเดียวกัน (deterministic)
    // 2. ไม่เปลี่ยนแปลงหรือพึ่งพาสถานะภายนอก (no side effects)
    //
    // ทำให้โค้ด:
    // - Predictable(ทำนายผลลัพธ์ได้ง่าย)
    // - ทดสอบง่าย 
    // - ลดโอกาสเกิด shared state bug = bug ที่เกิดจากการที่หลายๆ ส่วนของโปรแกรมไปแก้ไขสถานะเดียวกัน
    function incorrect() {
        let total = 0
        function add(price) {
            total += price
        }
        add(100)
        add(200)
        console.log(total) // 300
        // total ถูกเก็บสถานะภายนอกฟังก์ชัน add ทำให้ไม่ใช่ pure function ปัญหาคือถ้าเราเรียก add ซ้ำๆ total จะเปลี่ยนไปเรื่อยๆ
    }
    function correct() {
        function add(total, price) {
            return total + price
        }
        const total1 = add(0, 100)
        const total2 = add(total1, 200)
        console.log(total2) // 300
        // ใน correct version เราไม่ได้เก็บสถานะภายนอกฟังก์ชัน add ทำให้เป็น pure function ที่ให้ผลลัพธ์เดียวกันเสมอเมื่อได้รับอินพุตเดียวกัน
    }

    incorrect()
    correct()
}

//-------------------- Deep Copy vs Shallow Copy with Immutable Update Pattern --------------------//

function immutableUpdatePattern() {
    // Immutable Update Pattern: อัปเดตข้อมูลโดยไม่เปลี่ยนแปลงต้นฉบับ (object/array ไม่ mutate)
    // ตัวอย่าง: Selective Shallow Copy (คัดลอกเฉพาะ property ที่ต้องการเปลี่ยน)
    const user = {
        profile: {
            name: "Alice",
            address: {
                city: "Wonderland",
                zip: "12345"
            }
        }
    }
    // ถ้าอยากเปลี่ยน city โดยไม่ deep clone ทั้ง object ให้ใช้ spread/copy เฉพาะจุดที่เปลี่ยน
    // เช่น ...user -> ...user.profile -> ...user.profile.address -> city ใหม่
    const newUser = {
        ...user,
        profile: {
            ...user.profile,
            address: {
                ...user.profile.address,
                city: "Thailand"
            }
        }
    }
    console.log("Original User City:", user.profile.address.city) // Output: Original User City: Wonderland
    console.log("ImmutableUpdatePattern:", newUser.profile.address.city) // Output: New User City: Thailand

}

//-------------------- Self Practice --------------------//

function practice1() {
    // Practice 1: change price of id 2 to 300 in immutable way
    // state = { cart: { items: [ { id: 1, name: "A", price: 100 }, { id: 2, name: "B", price: 200 } ] } }
    // Goal: ...state > ...cart > ...items > item with id 2 > price: 300
    const state = {
        cart: {
            items: [
                { id: 1, name: "A", price: 100 },
                { id: 2, name: "B", price: 200 }
            ]
        }
    }
    const newState = {
        ...state,
        cart: {
            ...state.cart,
            items: state.cart.items.map(item =>
                item.id === 2
                    ? { ...item, price: 300 }
                    : item
            )
        }
    }
    console.log("Original State:", state.cart.items[1].price)
    console.log("Updated State:", newState.cart.items[1].price)
}

function practice2() {
    // Practice 2: change age to 21
    const user = {
        user: {
            name: "Alice",
            age: 20,
        },
    }
    const newUser = {
        ...user,
        user: {
            ...user.user,
            age: 21
        }
    }
    console.log(user.user.age)
    console.log(newUser.user.age) // 21
}

function practice3() {
    // Practice 3: Object + Array === change 2 to 5
    const state = {
        array: [1, 2, 3],
    }
    const newState = {
        ...state,
        array: state.array.map((i) => i === 2 ? 5 : i)
        // .map(): ทำหน้าที่สร้าง Array ใหม่ที่มีขนาดเท่าเดิม โดยการ "loop" ทุกตัวใน Array
        // i === 2 ? 5 : i witch means if i equal 2 return 5 else return i 
    }
    console.log("Original State:", state.array) // [1, 2, 3]
    console.log("Updated State:", newState.array) // [1, 5, 3]
}

function practice4() {
    // Practice 4: Nested Object + Array === change score of id 2 to 95
    const state = {
        students: [
            { id: 1, name: "Alice", score: 90 },
            { id: 2, name: "Bob", score: 85 },
        ],
    }
    const newState = {
        ...state,
        students: state.students.map(
            (i) => i.id === 2 ? { ...i, score: 95 } : i
        )
    }
    console.log("Original State:", state.students[1].score) // 85
    console.log("Updated State:", newState.students[1].score) // 95
}

function practice5() {
    // Practice 5: change score of user id 2 to 30
    const state = {
        users: [
            { id: 1, score: 10 },
            { id: 2, score: 20 }
        ]
    }
    const newstate = {
        ...state, users: state.users.map(
            (i) => i.id === 2 ? { ...i, score: 30 } : i
        )
    }
    console.log("Original State:", state.users[1].score) // 20
    console.log("Updated State:", newstate.users[1].score ) // 30
}



