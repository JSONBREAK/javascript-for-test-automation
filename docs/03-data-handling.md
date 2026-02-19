# Data Handling in Automation

## 1️⃣ JSON Parsing / Stringify

- แปลง object ↔ JSON string
- ตัวอย่าง:
	```js
	const obj = { name: 'Alice', age: 30 };
	const json = JSON.stringify(obj);
	const parsed = JSON.parse(json);
	```

---

## 2️⃣ API Response Handling

- รับข้อมูลจาก API แล้วแปลงเป็น object/array ที่ใช้งานได้
- ตัวอย่าง:
	```js
	fetch('/api/user')
		.then(res => res.json())
		.then(data => { /* ใช้งาน data */ });
	```

---

## 3️⃣ Mapping & Transforming Data

- ใช้ map/filter/reduce เปลี่ยนรูปข้อมูล
- ตัวอย่าง:
	```js
	const users = [ { name: 'A' }, { name: 'B' } ];
	const names = users.map(u => u.name); // ['A','B']
	```

---

## 4️⃣ Filtering Data Sets

- เลือกเฉพาะข้อมูลที่ตรงเงื่อนไข
- ตัวอย่าง:
	```js
	const nums = [1,2,3,4];
	const even = nums.filter(n => n % 2 === 0); // [2,4]
	```

---

## 5️⃣ Deep Destructuring

- ดึงค่าจาก object/array ซ้อนหลายชั้น
- ตัวอย่าง:
	```js
	const user = { profile: { name: 'Bob', address: { city: 'BKK' } } };
	const { profile: { address: { city } } } = user;
	// city = 'BKK'
	```

---

## 6️⃣ Validation Logic

- ตรวจสอบความถูกต้องของข้อมูลก่อนใช้งาน
- ตัวอย่าง:
	```js
	function isValidUser(user) {
		return typeof user.name === 'string' && typeof user.age === 'number';
	}
	```

---

## 7️⃣ Schema Validation Concept

- ใช้ schema (เช่น Joi, Yup) ตรวจสอบโครงสร้างข้อมูล
- ตัวอย่าง (Yup):
	```js
	import * as yup from 'yup';
	const schema = yup.object({ name: yup.string().required(), age: yup.number() });
	schema.validateSync({ name: 'A', age: 1 });
	```

---

## 8️⃣ QA Focus

- **Validate API response**: ตรวจสอบว่าข้อมูลที่ได้จาก API ตรง schema
- **Transform UI data**: แปลงข้อมูลก่อนแสดงผลหรือส่งต่อ
- **Data-driven testing**: ใช้ชุดข้อมูลหลายแบบทดสอบ logic
- **Handling edge cases**: รับมือ null, undefined, missing fields, type ผิด
