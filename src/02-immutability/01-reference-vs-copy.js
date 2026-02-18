//-------------------- Copy Patterns --------------------//

function copyPatterns() {
    // Identity vs Value
    function identityVsValue() {
        const a = 10
        const b = 10
        console.log("Primitive compare:", a === b) // true (เทียบค่า)

        const objA = { x: 1 }
        const objB = { x: 1 }
        console.log("Object compare:", objA === objB) // false (เทียบ reference)

        const objC = objA
        console.log("Assign same ref:", objA === objC) // true

        const objD = { ...objA }
        console.log("Spread new ref:", objA === objD) // false

        const nestedA = { inner: { y: 1 } }
        const nestedB = { ...nestedA }
        console.log("Nested shared ref:", nestedA.inner === nestedB.inner) // true
    }

    // Spread basics (array + object)
    function spreadBasics() {
        const arr1 = [1, 2, 3]
        const arr2 = [...arr1, 4, 5]
        console.log("Spread array:", arr2) // [1, 2, 3, 4, 5]

        const obj1 = { name: "Alice", age: 25 }
        const obj2 = { ...obj1, role: "admin" }
        console.log("Spread object:", obj2)
    }

    // Shallow copy = copy แค่ระดับบนสุด
    function shallowCopy() {
        const user = {
            name: "Alice",
            address: { city: "Wonderland" }
        }
        const shallow = { ...user }
        shallow.name = "Bob"
        shallow.address.city = "New City"
        console.log("Original user:", user.name, user.address.city) // Alice, New City
        console.log("Shallow copy:", shallow.name, shallow.address.city) // Bob, New City
    }

    // Deep copy = copy ทุกชั้น (แก้ nested mutation)
    function deepCopy() {
        const user = {
            name: "Alice",
            address: { city: "Wonderland" }
        }
        const deep = structuredClone(user) // Node 18+
        // environment เก่าอาจต้องใช้ JSON.parse(JSON.stringify(user))
        deep.address.city = "Thailand"
        console.log("Original user:", user.name, user.address.city) // Alice, Wonderland
        console.log("Deep copy:", deep.name, deep.address.city) // Alice, Thailand
    }

    // Controlled mutation (ใช้เฉพาะกรณีจำเป็น)
    function intentionalSharePerformance() {
        const config = { timeout: 5000 }
        function runTest(c) {
            c.timeout = 1000
        }
        runTest(config)
        console.log("Mutated config:", config.timeout) // 1000
    }

    // Immutable update pattern (ใช้ใน state)
    function immutableUpdateSafeState() {
        const user = { name: "jet", setting: { theme: "dark" } }
        const copy = {
            ...user,
            setting: {
                ...user.setting,
                theme: "light"
            }
        }
        console.log("Original user:", user)
        console.log("Updated user:", copy)
    }

    // Mini challenge (จับ bug จาก shallow copy)
    function miniChallenge() {
        const defaultConfig = { retry: 3, headers: { auth: "token" } }
        function override(config) {
            const newConfig = { ...config }
            newConfig.headers.auth = "new-token"
            return newConfig
        }
        const result = override(defaultConfig)
        console.log("Original auth:", defaultConfig.headers.auth) // new-token (เพราะ shallow copy)
        console.log("New auth:", result.headers.auth)
    }
}
copyPatterns()

