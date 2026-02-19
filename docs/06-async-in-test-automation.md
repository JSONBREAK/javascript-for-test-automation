# Async in Test Automation

## 1️⃣ Missing await: Deep Analysis
- ลืม await ทำให้ test ผ่านโดยที่ async ยังไม่เสร็จจริง
- ตัวอย่าง:
	```js
	test('should save', async () => {
		saveData(); // ลืม await
		expect(true).toBe(true); // false positive
	});
	```
- ผล: test ผ่านแม้ saveData ยังไม่เสร็จ

---

## 2️⃣ Promise Not Returned (Jest/Playwright)
- ไม่ return promise ใน test function ทำให้ Jest/Playwright ไม่รอ async
- ตัวอย่าง:
	```js
	test('should fetch', () => {
		return fetchData().then(data => {
			expect(data).toBeDefined();
		});
	});
	// หรือใช้ async/await ต้อง return หรือ await เสมอ
	test('should fetch', async () => {
		await fetchData();
	});
	```

---

## 3️⃣ False Positive Test Case
- Assertion อยู่หลัง async แต่ไม่ได้ await/promise
- Test ผ่านแม้ logic จริง fail
- ตัวอย่าง:
	```js
	test('should fail', () => {
		setTimeout(() => {
			expect(false).toBe(true); // ไม่ถูกจับ
		}, 10);
	});
	// Jest จะไม่รอ setTimeout
	```

---

## 4️⃣ Parallel Execution Hazard
- รัน async หลาย test พร้อมกันโดยไม่แยก state
- Shared resource/DB/file อาจชนกัน
- ตัวอย่าง:
	- ใช้ global variable, temp file, หรือ DB เดียวกัน
- แนวทาง: ใช้ unique data, mock, หรือแยก resource

---

## 5️⃣ Async Test Isolation Failure
- Test หนึ่งเปลี่ยน state ที่กระทบ test อื่น (เช่น async cleanup ไม่เสร็จ)
- beforeEach/afterEach async ต้อง await เสมอ
- ตัวอย่าง:
	```js
	beforeEach(async () => {
		await resetDB();
	});
	```

---

## 6️⃣ Flaky Test Root Causes
- Timing issue (race condition, setTimeout, network delay)
- ไม่ await promise, shared state, cleanup ไม่สมบูรณ์
- ใช้ hardcoded wait แทน event-driven

---

## 7️⃣ Deterministic Async Patterns
- ใช้ await ทุก async operation
- ใช้ Promise.all สำหรับ parallel ที่ควบคุมได้
- ไม่ใช้ global state, ใช้ mock/stub
- ตรวจสอบผลลัพธ์แบบ deterministic ทุกครั้ง
