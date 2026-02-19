# Automation Patterns & Anti-Patterns

## 1️⃣ Patterns

### Page Object Model (POM)
- แยก logic ของแต่ละ page/component ออกเป็น class/obj
- ลด duplication, เพิ่ม maintainability
```js
// loginPage.js
class LoginPage {
	enterUsername(name) { /* ... */ }
	enterPassword(pw) { /* ... */ }
	submit() { /* ... */ }
}
module.exports = new LoginPage();
```

### Factory Pattern
- สร้าง test data หรือ object แบบ dynamic
```js
function userFactory(role = 'user') {
	return {
		username: `user_${Date.now()}`,
		password: 'pass123',
		role,
	};
}
```

### Utility Layer
- รวมฟังก์ชันช่วยเหลือ เช่น login, setup, teardown
```js
// utils.js
function login(user) { /* ... */ }
module.exports = { login };
```

### DRY Principle (Don't Repeat Yourself)
- เขียนโค้ด reusable, ไม่ซ้ำซ้อน
- ใช้ helper, function, หรือ POM

### Layer Separation
- แยก test logic, page object, utility, config ออกจากกัน
- เพิ่มความชัดเจนและ maintainability

---

## 2️⃣ Anti-patterns

### Hardcoded Waits
- ใช้ setTimeout หรือ wait แบบ fix time
- ทำให้ test ช้าและ flaky
```js
// Bad
await page.waitForTimeout(5000);
// Good
await page.waitForSelector('#result');
```

### Shared Mutable Global State
- ใช้ global variable ที่เปลี่ยนค่าได้ข้าม test
- ทำให้เกิด test flakiness

### Over-abstraction
- สร้าง abstraction ซับซ้อนเกินไป จน test อ่านยาก

### Copy-paste Test Logic
- คัดลอกโค้ด test ซ้ำๆ แทนที่จะใช้ helper หรือ POM

### Catching Errors Without Failing Test
- จับ error แล้วไม่ throw หรือ assert fail
```js
try {
	// test code
} catch (e) {
	// do nothing (bad)
}
```

### Retry Masking Real Problems
- ใช้ retry ซ้ำๆ แทนที่จะแก้ root cause

---

## 3️⃣ QA Focus

- **Maintainable framework design**: ใช้ pattern ที่เหมาะสม, ลด duplication
- **Scalable test architecture**: แยก layer, ใช้ factory, utility
- **Reducing flakiness**: หลีกเลี่ยง hardcoded wait, shared state, over-abstraction
