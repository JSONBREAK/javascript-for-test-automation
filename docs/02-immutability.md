---

## 7️⃣ QA Focus

- **Shared state problem**
	- การใช้ object/array เดียวกันข้าม test ทำให้เกิดผลกระทบข้าม test
	- ตัวอย่าง:
		```js
		let shared = [];
		test('add', () => { shared.push(1); });
		test('should be empty', () => { expect(shared.length).toBe(0); });
		```

- **ทำไม test ถึง flaky**
	- test ที่มี shared state หรือ mutate ข้อมูลร่วมกันจะให้ผลลัพธ์ไม่แน่นอน (flaky)
	- การ clone/immutable update ช่วยลดปัญหานี้

- **Test data factory**
	- สร้าง object ใหม่ทุกครั้งที่ต้องใช้ test data
	- ตัวอย่าง:
		```js
		function userFactory(name = 'user', age = 20) {
			return { name, age };
		}
		const user = userFactory('alice');
		```

- **Isolation mindset**
	- ทุก test ควรเป็นอิสระ ไม่พึ่ง state จาก test อื่น
	- ใช้ beforeEach/afterEach, factory, immutable update เพื่อแยก state
# Immutability in JavaScript

## 1️⃣ Primitive vs Reference

- Primitive: ค่าถูก copy เสมอ (number, string, boolean, null, undefined, symbol, bigint)
- Reference: object, array, function — copy เฉพาะ reference
- ตัวอย่าง:
	```js
	let a = 1;
	let b = a; // b = 1 (copy)
	let arr1 = [1,2];
	let arr2 = arr1; // arr2 ชี้ที่เดียวกับ arr1
	arr2.push(3); // arr1, arr2 = [1,2,3]
	```

---

## 2️⃣ Mutation vs Immutable Update

- Mutation: เปลี่ยนค่าภายใน object/array เดิม
	```js
	const obj = { x: 1 };
	obj.x = 2; // mutation
	```
- Immutable update: สร้าง object/array ใหม่
	```js
	const obj2 = { ...obj, x: 3 };
	```

---

## 3️⃣ Shallow vs Deep Copy

- Shallow copy: copy แค่ชั้นบน (object/array ซ้อนจะยังชี้ที่เดิม)
	```js
	const a = { x: { y: 1 } };
	const b = { ...a };
	b.x.y = 2; // a.x.y ก็เปลี่ยน!
	```
- Deep copy: copy ทุกชั้น
	```js
	const c = JSON.parse(JSON.stringify(a));
	c.x.y = 5; // a.x.y ไม่เปลี่ยน
	```

---

## 4️⃣ structuredClone

- วิธี deep copy ที่รองรับ type มากกว่า JSON
	```js
	const d = structuredClone(a);
	```

---

## 5️⃣ Object.freeze

- ทำให้ object (shallow) เป็น read-only
	```js
	const frozen = Object.freeze({ x: 1 });
	frozen.x = 2; // ไม่มีผล
	```

---

## 6️⃣ Immutable Array Operations

- ใช้ map, filter, concat, ...spread เพื่อไม่ mutate array เดิม
	```js
	const arr = [1,2,3];
	const arr2 = arr.map(x => x*2); // [2,4,6]
	const arr3 = arr.filter(x => x>1); // [2,3]
	const arr4 = [...arr, 4]; // [1,2,3,4]
	```

---
