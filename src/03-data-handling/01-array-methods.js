//-------------------- Array Methods --------------------//

// Topics: map(), filter(), find(), some(), every(), reduce()

function arrayMethods() {
    // filter() - กรองข้อมูลที่ตรงเงื่อนไข
    function filterExample() {
        const users = [
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 17 },
            { name: 'Charlie', age: 30 },
            { name: 'David', age: 20 },
            { name: 'Eve', age: 15 }
        ]
        // ใช้ filter เพื่อกรองผู้ใช้ที่มีอายุมากกว่า 18 ปี
        const adults = users.filter(user => user.age > 18)
        console.log("Adults:", adults)
    }

    // find() - หาข้อมูลตัวแรกที่ตรงเงื่อนไข
    function findExample() {
        const users = [
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 17 },
            { name: 'Charlie', age: 30 },
            { name: 'David', age: 20 },
            { name: 'Eve', age: 15 }
        ]
        const adults = users.filter(user => user.age > 18)
        // ใช้ find เพื่อหาผู้ใช้ที่ชื่อขึ้นต้นด้วย 'A'
        const conditionA = user => user.name.startsWith('A')
        const result = adults.find(conditionA)
        console.log("Find result:", result) // Output: { name: 'Alice', age: 25 }
    }

    // map() - แปลงข้อมูลทุกตัวใน array
    function mapExample() {
        const arr = [1, 2, 3, 4, 5]
        const doubled = arr.map((i) => i * 2)
        console.log("Map result:", doubled)
        
        // map กับ condition
        const mapped = arr.map((i) => i === 2)
        console.log("Map with condition:", mapped)
    }

    // reduce() - ลด array ลงเป็นค่าเดียว
    function reduceExample() {
        // การลด array ลงเป็นค่าเดียวโดยมีเงื่อนไขที่กำหนด || .reduce((a,b)=>a+b,0)
        const numbers = [1, 2, 3, 4, 5]
        const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        console.log("Reduce sum:", sum) // Output: 15
    }

    // reduce() - Array → Object (Lookup Map) เพื่อเพิ่มประสิทธิภาพการค้นหา O(n) → O(1)
    function arrayToObjectLookup() {
        const users = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' }
        ]
        const userMap = users.reduce((acc, user) => {
            if (acc[user.id]) { // check duplicate id กัน overwrite
                throw new Error("Duplicate id detected")
            }
            acc[user.id] = user // ถ้ายังไม่มีให้เพิ่ม user ลงใน acc โดยใช้ id เป็น key
            return acc
            // ลด O(n) to O(1) ด้วยการแปลง array เป็น object lookup map
        }, {})
        console.log("User lookup map:", userMap)
        // Question: ทำไมการใช้ reduce ถึงช่วยให้การค้นหาข้อมูลเร็วขึ้นจาก O(n) เป็น O(1)?
        // Answer: เพราะการค้นหาใน array ด้วย find() ต้องตรวจสอบทีละตัว (O(n))
        // แต่ object lookup map เข้าถึงได้โดยตรงผ่าน key (O(1))
    }

    // reduce() - Group by category
    function groupByCategory() {
        const products = [
            { id: 1, name: 'Laptop', category: 'Electronics' },
            { id: 2, name: 'Shirt', category: 'Clothing' },
            { id: 3, name: 'Phone', category: 'Electronics' },
            { id: 4, name: 'Pants', category: 'Clothing' },
            { id: 5, name: 'Headphones', category: 'Electronics' }
        ]
        const grouped = products.reduce((acc, item) => {
            if (!acc[item.category]) { // เช็คว่ามี category หรือยัง
                acc[item.category] = [] // ถ้ายังไม่มีให้สร้าง array ว่าง
            }
            acc[item.category].push(item) // push item ลงใน array ตาม category
            return acc
        }, {})
        console.log("Grouped by category:", grouped)
    }

    // reduce() - Remove duplicates
    function removeDuplicates() {
        const array = [1, 2, 3, 2, 4, 1, 5]
        const unique = array.reduce((acc, item) => {
            if (!acc.includes(item)) { // เช็คว่ามี item ใน acc หรือยัง
                acc.push(item) // ถ้ายังไม่มีให้ push ลงใน acc
            }
            return acc
        }, [])
        console.log("Unique array:", unique)
    }

    // reduce() - Flatten nested array
    function flattenNested() {
        const nested = [[1, 2], [3, 4], [5]]
        const flat = nested.reduce((acc, arr) => {
            return acc.concat(arr) // concat รวม array โดยไม่เปลี่ยน array เดิม
        }, [])
        console.log("Flattened array:", flat)
    }

    // reduce() - Filter active users to lookup map
    function filterActiveUsersToMap() {
        const users = [
            { id: 1, name: "A", active: true },
            { id: 2, name: "B", active: false },
            { id: 3, name: "C", active: true }
        ]
        const activeUserMap = users.reduce((acc, user) => {
            if (!user?.active || typeof user.id !== "number") return acc
            acc[user.id] = true
            return acc
        }, {})
        console.log("Active users map:", activeUserMap)
    }

    // some() - ตรวจสอบว่ามีอย่างน้อยหนึ่งตัวที่ตรงเงื่อนไข
    function someExample() {
        // some = อย่างน้อยหนึ่งรายการที่ตรงกับเงื่อนไข === OR gate
        const files = ['image.png', 'document.pdf', 'presentation.pptx']
        const hasPDF = files.some(file => file.endsWith('.pdf'))
        console.log("some example:", hasPDF) // Output: true
    }

    // every() - ตรวจสอบว่าทุกตัวตรงเงื่อนไข
    function everyExample() {
        // every = ทุกรายการต้องตรงกับเงื่อนไข === AND gate
        const files = ['image.png', 'document.pdf', 'presentation.pptx']
        const allPDF = files.every(file => file.endsWith('.pdf'))
        console.log("every example:", allPDF) // Output: false
    }

    // every() ใช้ใน validation
    function validateUserInput(input) {
        const isValid = Object.values(input).every(value => typeof value === 'string' && value.trim() !== '')
        return isValid
    }

    // every() กับ API response validation
    function apiValidationExample() {
        const apiResponse = {
            data: [
                { id: 1, name: 'Alice' },
                { id: 2, name: 'Bob' },
                { id: 3, name: 'Charlie' },
                { id: 4, name: ' ' },
            ]
        }
        const allHaveNames = apiResponse.data.every(item => item.name && item.name.trim() !== '')
        console.log("API validation result:", allHaveNames) // Output: false
    }

    // filter + find แบบมีเงื่อนไขซ้อน
    function combinedExample() {
        const items = [
            { user1: { name: "jetsu", age: 25, type: "human" } },
            { user2: { name: "pink", age: 22, type: "human" } },
            { user3: { name: "somo", age: 2, color: "orange", type: "fatcat" } }
        ]

        // find - หาตัวแรกที่ตรงเงื่อนไข
        const firstHuman = items.find((item) => {
            const innerData = Object.values(item)[0]
            return innerData?.type === "human"
        })
        console.log("First human:", firstHuman)

        // filter - หาทุกตัวที่ตรงเงื่อนไข
        const allHumans = items.filter((i) => {
            const innerData = Object.values(i)[0]
            return innerData?.type === "human"
        })
        console.log("All humans:", allHumans)
    }

    
    filterExample()
    findExample()
    mapExample()
    reduceExample()
    arrayToObjectLookup()
    groupByCategory()
    removeDuplicates()
    flattenNested()
    filterActiveUsersToMap()
    someExample()
    everyExample()
    console.log("Validation result:", validateUserInput({ name: 'Alice', email: 'alice@example.com' }))
    apiValidationExample()
    combinedExample()
}

arrayMethods()
