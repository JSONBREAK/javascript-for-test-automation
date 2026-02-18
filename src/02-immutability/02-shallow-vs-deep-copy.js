// Shallow vs Deep Copy
// Shallow copy = copy แค่ระดับบนสุด (copy reference ของ nested object)
// Deep copy = copy ทุกชั้น (แก้ nested mutation)

// เป้าหมาย:
// 1. เข้าใจความแตกต่างระหว่าง shallow copy และ deep copy
// 2. รู้ว่า spread operator เป็นแค่ shallow copy
// 3. เรียนรู้วิธีทำ deep copy ด้วย structuredClone หรือ JSON.parse/stringify
// 4. รู้ว่าเมื่อไหร่ควรใช้ controlled mutation แทนการ copy    
// 5. เข้าใจว่าทำไม spread หลอกตาถึงดูเหมือนทำ deep copy แต่จริงๆ แล้วไม่ใช่
// เข้าใจ structuredClone limitations
// เข้าใจ JSON deep copy trap
// เข้าใจ performance vs safety trade-off
// เข้าใจเมื่อไหร่ควร deep copy / ไม่ควร deep copy

function MemoryGraphThinking() {
    const state = {
        user: {
            profile: {
                name: "Jet"
            }
        }
    }
    // State  ──► #1
    // #1.user ──► #2
    // #2.profile ──► #3
    // #3.name = "Jet"
    // ทุก layer คือ reference 
}

// ================================ Shallow ================================

function shallowCopy() {
    const user = {
        name: "Alice",
        address: { city: "Wonderland" }
    }
    const shallow = { ...user } // Shallow copy แค่ระดับบนสุด
    shallow.name = "Bob"
    shallow.address.city = "New City"
    console.log("Original user:", user.name, user.address.city) // Alice, New City
    console.log("Shallow copy:", shallow.name, shallow.address.city) // Bob, New City
}

// ================================ Deep ================================

function deepCopy() {
    const user = {
        name: "Alice",
        address: { city: "Wonderland" }
    }
    const deep = structuredClone(user) // Node 18+ มี built-in deep copy
    // environment เก่าอาจต้องใช้ JSON.parse(JSON.stringify(user)) ซึ่งมีข้อจำกัดเรื่อง function, undefined, circular reference
    deep.address.city = "Thailand"
    console.log("Original user:", user.name, user.address.city) // Alice, Wonderland
    console.log("Deep copy:", deep.name, deep.address.city) // Alice, Thailand
}

// 💥 Nested Mutation Bug (Production-Level)
function nestedMutationBug() {
    function addItemUnsafe(cart, newItem) {
        // ตัวอย่าง cart
        const cartCopy = { ...cart }; // Shallow copy แค่ระดับบนสุด
        function addItem(cart, newItem) {
            cart.items.push(newItem); // แก้ไข cart ที่รับมาโดยตรง (mutation)
        }
        addItem(cart, newItem);
        console.log("Original cart:", cartCopy.items); // cartCopy.items ถูกเปลี่ยนแปลงไปด้วย
    }

    const cart = {
        items: [
            { id: 1, name: "Product A", quantity: 2 },
            { id: 2, name: "Product B", quantity: 1 }
        ]
    };

    addItemUnsafe(cart, { id: 3, name: "Product C", quantity: 1 });

    // การแก้ไขปัญหา: ทำ deep copy โดยการ spread ทั้ง object และ nested object
    function addItemSafe(cart, newItem) {
        const cartCopy = { ...cart, items: [...cart.items] }; // Deep copy ทั้ง cart และ nested items
        function addItem(cart, newItem) {
            cart.items.push(newItem); // แก้ไข cart ที่รับมาโดยตรง (mutation)
        }
        addItem(cart, newItem);
        console.log("Original cart (safe):", cartCopy.items); // cartCopy.items ไม่ถูกเปลี่ยนแปลง
    }

    // สร้าง cart ใหม่สำหรับตัวอย่าง safe
    const cart2 = {
        items: [
            { id: 1, name: "Product A", quantity: 2 },
            { id: 2, name: "Product B", quantity: 1 }
        ]
    };

    addItemSafe(cart2, { id: 3, name: "Product C", quantity: 1 });
}
nestedMutationBug();