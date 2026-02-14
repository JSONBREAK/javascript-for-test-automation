//-------------------- Object Handling --------------------//

// Topics: Dot vs bracket notation, Destructuring, Spread operator, 
//         Nested access, Optional chaining, Object.keys/values/entries

function objectHandling() {
    // Dot notation vs Bracket notation
    function accessExample() {
        const user = { name: "Alice", age: 25 }
        console.log("Dot notation:", user.name)
        console.log("Bracket notation:", user["age"])
    }

    // Optional chaining (?.) - เข้าถึง nested object อย่างปลอดภัย
    function optionalChainingExample() {
        const items = [
            { user1: { name: "jetsu", age: 25, type: "human" } },
            { user2: { name: "pink", age: 22, type: "human" } },
            { user3: { name: "somo", age: 2, color: "orange", type: "fatcat" } }
        ]

        // รู้ว่าต้องการเข้าถึงอะไร
        const result = items[1]?.user2?.name
        console.log("Optional chaining result:", result)
    }

    // Object.values() - ดึงค่าทั้งหมดออกมาเป็น array
    function objectValuesExample() {
        const items = [
            { user1: { name: "jetsu", age: 25, type: "human" } },
        ]
        const innerData = Object.values(items[0])[0]
        console.log("Object.values result:", innerData)
    }

    // Object.entries() - แปลง object เป็น array ของ [key, value] pairs
    function objectEntriesExample() {
        const user = {
            name: 'Alice',
            age: 25,
            email: 'alice@example.com'
        }
        const entries = Object.entries(user)
        console.log("Object.entries result:", entries)
        // Output: [['name', 'Alice'], ['age', 25], ['email', 'alice@example.com']]
    }

    // Object.fromEntries() - แปลง array ของ [key, value] กลับเป็น object
    function removeUndefinedValues() {
        const user = {
            name: 'Alice',
            age: undefined,
            email: null,
            city: 'Bangkok'
        }
        // ใช้ Object.entries + filter + fromEntries เพื่อเอา null และ undefined ออก
        const clean = Object.fromEntries(
            Object.entries(user)
                .filter(([_, value]) => value !== null && value !== undefined)
        )
        console.log("Original user:", user)
        console.log("Cleaned user:", clean)
    }

    // Object.entries() + map - Rename keys
    function renameKeys() {
        const input = {
            first_name: 'Alice',
            last_name: 'Wonderland',
            email: 'alice@example.com'
        }
        const renamed = Object.fromEntries(
            Object.entries(input).map(([key, value]) => {
                if (key === "first_name") return ["firstName", value]
                if (key === "last_name") return ["lastName", value]
                return [key, value]
            })
        )
        console.log("Renamed keys:", renamed)
    }

    // Object.entries() + map - Normalize values
    function normalizeValues() {
        const raw = {
            name: 'Alice',
            email: 'tESt@eXAmpLe.cOM'
        }
        const normalized = Object.fromEntries(
            Object.entries(raw).map(([key, value]) => {
                if (typeof value === "string") {
                    return [key, value.trim().toLowerCase()]
                }
                return [key, value]
            })
        )
        console.log("Raw user:", raw)
        console.log("Normalized user:", normalized)
    }

    // Object.keys() - TODO: ต้องเพิ่ม
    // Destructuring - TODO: ต้องเพิ่ม
    // Spread operator - TODO: ต้องเพิ่ม (มีใน immutability แล้วบางส่วน)

    function handOnpractice1() {
        // goal: แก้ theme ให้ original ไม่เปลี่ยน
        const user = {
            name: "jet",
            setting: {
                theme: "dark",
            }
        }
        const copy = {
            ...user,
            setting: {
                ...user.setting,
                theme: "light"
            }
        }
        console.log(user) // Output: { name: 'jet', setting: { theme: 'dark' } }
        console.log(copy) // Output: { name: 'jet', setting: { theme: 'light' } }
    }
    //handOnpractice1()

    
}

objectHandling()
