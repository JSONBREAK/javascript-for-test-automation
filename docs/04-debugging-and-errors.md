# Debugging & Error Handling in Automation

## 1️⃣ try / catch / finally

- จัดการ error ใน synchronous/async code
- ตัวอย่าง:
	```js
	try {
		risky();
	} catch (e) {
		console.error(e);
	} finally {
		cleanup();
	}
	```

---

## 2️⃣ Custom Error

- สร้าง error type เฉพาะเพื่อแยกประเภทปัญหา
- ตัวอย่าง:
	```js
	class ValidationError extends Error {
		constructor(msg) { super(msg); this.name = 'ValidationError'; }
	}
	throw new ValidationError('Invalid input');
	```

---

## 3️⃣ Stack Trace

- ใช้ trace หาต้นตอ error
- ตัวอย่าง:
	```js
	try { throw new Error('fail'); } catch (e) { console.log(e.stack); }
	```

---

## 4️⃣ Debugging with console

- ใช้ console.log, console.error, console.dir, console.table
- ตัวอย่าง:
	```js
	console.log('value', x);
	console.table([{a:1},{a:2}]);
	```

---

## 5️⃣ Debugging Async Errors

- ใช้ try/catch กับ async/await
- ตัวอย่าง:
	```js
	async function run() {
		try {
			await doAsync();
		} catch (e) {
			console.error(e);
		}
	}
	```

---

## 6️⃣ Handling Rejected Promises

- จัดการ promise ที่ reject ด้วย .catch หรือ try/catch
- ตัวอย่าง:
	```js
	doAsync().catch(e => console.error(e));
	```

---

## 7️⃣ Error Bubbling

- error ที่ throw ใน function จะ bubble ขึ้นจนกว่าจะถูก catch
- ตัวอย่าง:
	```js
	function a() { throw new Error('fail'); }
	function b() { a(); }
	try { b(); } catch (e) { console.error(e); }
	```

---

## 8️⃣ QA Focus

- **Why tests silently pass**: test ไม่มี assertion หรือ error ไม่ถูก throw/catch
- **Detecting unhandled rejections**: ใช้ process.on('unhandledRejection')
	```js
	process.on('unhandledRejection', err => { console.error('UNHANDLED', err); });
	```
- **Proper assertion errors**: assertion ที่ดีควรสื่อความหมายและเจาะจง
- **Logging strategy**: log เฉพาะจุดสำคัญ, ใช้ log level, ไม่ log ข้อมูล sensitive
