# Node.js Environment & Scripting

## 1️⃣ What is Node.js

- JavaScript runtime ที่รันนอก browser (บน server, CLI)
- เหมาะกับ automation, scripting, backend

---

## 2️⃣ Module System (CommonJS vs ES Modules)

- CommonJS: ใช้ require/module.exports (default ใน Node.js เดิม)
- ES Modules: ใช้ import/export (มาตรฐานใหม่, ต้อง .mjs หรือ "type": "module")
- ตัวอย่าง:
	```js
	// CommonJS
	const fs = require('fs');
	module.exports = {};

	// ES Modules
	import fs from 'fs';
	export default {};
	```

---

## 3️⃣ require vs import

- require: sync, ใช้กับ CommonJS
- import: async, ใช้กับ ES Modules

---

## 4️⃣ File System (fs)

- อ่าน/เขียนไฟล์ด้วย fs module
- ตัวอย่าง:
	```js
	const fs = require('fs');
	fs.readFileSync('file.txt', 'utf8');
	fs.writeFileSync('out.txt', 'hello');
	```

---

## 5️⃣ Environment Variables (process.env)

- อ่านค่าจาก process.env เช่น process.env.NODE_ENV
- ตัวอย่าง:
	```js
	if (process.env.NODE_ENV === 'test') { /* ... */ }
	```

---

## 6️⃣ Running Scripts with npm

- สั่งรัน script ใน package.json ด้วย npm run
- ตัวอย่าง:
	```json
	// package.json
	{
		"scripts": {
			"test": "node test.js"
		}
	}
	```
	```sh
	npm run test
	```

---

## 7️⃣ Basic CLI Scripts

- รับ argument จาก command line
- ตัวอย่าง:
	```js
	// script.js
	console.log(process.argv);
	```
	```sh
	node script.js foo bar
	```

---

## 8️⃣ QA Focus

- **Running automation scripts**: ใช้ node/npm รัน test, automation
- **Reading config files**: ใช้ fs module อ่านไฟล์ config (JSON/YAML)
- **Managing env variables**: ใช้ dotenv หรือ process.env
- **Writing utility scripts**: สร้าง script สำหรับ task automation, data setup, cleanup
