# Test Isolation & State Management

## 1️⃣ beforeEach / afterEach Concept

- ใช้เตรียม/ล้าง state ก่อนและหลังแต่ละ test
- ตัวอย่าง:
	```js
	let arr;
	beforeEach(() => {
		arr = [];
	});
	afterEach(() => {
		arr = null;
	});
	```

---

## 2️⃣ Shared State Problem

- การใช้ตัวแปรหรือ resource ร่วมกันทำให้เกิด flaky test, ผลลัพธ์ไม่แน่นอน
- ตัวอย่าง:
	```js
	let db = [];
	test('add', () => { db.push(1); });
	test('should be empty', () => { expect(db.length).toBe(0); });
	```

---

## 3️⃣ Factory Pattern

- ใช้สร้าง object/test data ใหม่ทุกครั้งเพื่อหลีกเลี่ยง shared state
- ตัวอย่าง:
	```js
	function userFactory(name = 'user', age = 20) {
		return { name, age };
	}
	const user = userFactory('alice');
	```

---

## 4️⃣ Test Data Builder

- สร้าง test data ที่ flexible และ readable
- ตัวอย่าง:
	```js
	function UserBuilder() {
		this.name = 'user';
		this.age = 20;
		this.withName = function(name) { this.name = name; return this; };
		this.withAge = function(age) { this.age = age; return this; };
		this.build = function() { return { name: this.name, age: this.age }; };
	}
	const user = new UserBuilder().withName('bob').withAge(30).build();
	```

---

## 5️⃣ Environment Separation

- แยก environment (dev/test/prod) เพื่อป้องกัน test รบกวน production
- ตัวอย่าง:
	```js
	if (process.env.NODE_ENV === 'test') {
		// ใช้ mock DB
	}
	```

---
