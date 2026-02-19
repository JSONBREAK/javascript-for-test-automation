# CI/CD Stability Principles

## 1️⃣ Deterministic Tests
- Test ต้องให้ผลเหมือนเดิมทุกครั้ง (Same input → Same output)
- หลีกเลี่ยง randomness (Math.random, Date.now)
- ควบคุม time & date ด้วย mock/stub
```js
// Mock Date
jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
```

---

## 2️⃣ Idempotency
- Run ซ้ำได้โดยไม่พัง state
- Reset environment ก่อน/หลัง test
- Database cleanup, temp file cleanup
```js
beforeEach(async () => {
	await resetDatabase();
});
```

---

## 3️⃣ Flaky Test Root Causes
- Race condition (async ไม่รอ, order ไม่แน่นอน)
- Async timing issue (รอไม่ถูกจังหวะ)
- Shared state (global variable, singleton)
- Hardcoded wait (setTimeout, waitForTimeout)
- Network instability (API ช้า, response ไม่แน่นอน)

---

## 4️⃣ CI Stability Principles
- Fail fast (เจอ error ให้หยุดทันที)
- Clear logging (log ที่อ่านง่าย, ชี้ root cause)
- Artifact collection (screenshot, video, log file)
- Screenshot on failure (แนบใน report)
- Retry strategy (retry เฉพาะกรณีที่เหมาะสม, ไม่ปิดบังปัญหาจริง)

---

## 5️⃣ Environment Consistency
- Dev vs Staging vs CI ต้องเหมือนกันมากที่สุด
- Env variables management (ใช้ .env, process.env)
- Containerization concept (Docker intro)
```dockerfile
# Dockerfile ตัวอย่าง
FROM node:20
WORKDIR /app
COPY . .
RUN npm ci
CMD ["npm", "test"]
```

---

## 6️⃣ Parallel Execution Safety
- No shared global state (ห้ามใช้ global variable ที่เปลี่ยนค่า)
- Isolated test data (test แต่ละชุดมี data ของตัวเอง)
- Unique identifiers (เช่น user_1234, order_5678)
```js
const user = { username: `user_${Date.now()}` };
```
