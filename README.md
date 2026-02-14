# JavaScript Foundation for Automation Engineers

## Purpose

This repository builds JavaScript stability required for reliable test automation.

Focus: predictability, immutability, and safe data transformation.

It is designed to prevent common automation mistakes caused by weak JavaScript fundamentals.

This is not a tutorial.  
It mirrors real-world production structure.

---

## Why JavaScript Bugs Break Automation

- Shared state mutation
- Hidden reference changes
- Async timing issues
- Poor error handling

---

## Required Knowledge Before Automation

### Core JavaScript

**Variables & Scope**
- let vs const
- Block scope
- Primitive vs reference types
- Reassignment rules
- Mutation vs immutability

**Data Types**
- string, number, boolean
- null vs undefined
- object, array
- typeof

**Functions**
- Function declarations
- Arrow functions
- Parameters / default parameters
- Return / early return
- Pure functions

**Control Flow**
- if / else, switch
- for, for-of, while
- break / continue

---

### Data Handling (Used Daily in Automation)

**Array Methods**
- map()
- filter()
- find()
- some()
- every()
- reduce()

**Object Handling**
- Dot vs bracket notation
- Destructuring
- Spread operator (...)
- Nested access
- Optional chaining (?.)
- Object.keys / values / entries

**JSON**
- JSON.parse()
- JSON.stringify()

---

### Immutability Patterns for Automation

- Reference & Identity model (primitive vs object, ===, mutation vs reassignment, const-object)
- Shallow copy
- Deep copy
- StructuredClone (Node 18+)
- Avoid shared state in tests
- Defensive copying

**Test Isolation**
- Test isolation principles
- Avoid shared mutable test data
- Do not reuse state between test cases
- Reset or recreate data per test

---

### Debug & Error Handling

**Error Types**
- ReferenceError
- TypeError
- SyntaxError

**Error Handling**
- try / catch
- throw new Error()
- Reading stack traces

---

### Async (After Foundation Is Solid)

- Promise
- async / await
- Promise.all
- Event loop (conceptual understanding)

---

### Node Basics (Before Playwright)

- Module system (import / export)
- require (concept)
- process.env
- Running scripts with Node

---

## Out of Scope

- React
- Deep DOM manipulation
- Advanced design patterns
- TypeScript
- Complex algorithms

---

## Common Automation Failures from Weak JS

- Accidentally mutating test data
- Reusing shared objects between test cases
- Swallowing errors in try/catch
- Forgetting await on promises
- Misunderstanding Promise behavior
- Comparing objects by reference instead of value
- Race conditions from async mishandling

- Test cases affecting each other (lack of isolation)

---

## Deterministic Code Rule

Automation testing requires deterministic code.

Deterministic means:
- Same input → Same output
- No hidden state
- No external dependencies
- No mutation of arguments

Enforce it:
- If your function mutates input, rewrite it.
- If your logic is not deterministic, simplify it.
- If you cannot predict output without running it, redesign it.

If tests influence each other, your code is not isolated.
Isolation is required for deterministic automation.

---

## Current Focus

Work only in:
- 01-core
- 02-immutability

Before moving to async, you must understand test isolation.

**🎯 ก่อนไป Async อ่านก่อน:** [CHECKLIST.md](CHECKLIST.md) เพื่อทดสอบตัวเองว่าพร้อมหรือยัง

Do not move to async until:
- You can explain mutation clearly
- You can transform arrays without documentation
- You can clone and modify objects without mutating originals
- You can identify error types from stack traces

---

## Project Structure

```
js-qa-automation/
├── src/                            # Code examples (เรียงตาม learning path)
│   ├── 01-core/
│   │   ├── 01-variables.js
│   │   ├── 02-data-types.js
│   │   ├── 03-control-flow.js
│   │   └── 04-functions.js
│   ├── 02-immutability/
│   │   ├── 01-copy-patterns.js
│   │   └── 02-pure-functions.js
│   ├── 03-data-handling/
│   │   ├── 01-array-methods.js
│   │   └── 02-object-handling.js
│   └── 04-async/
│       └── 01-async-await.js       # TODO
├── docs/                           # Documentation
│   ├── 01 - Core JavaScript.md
│   ├── 02 - Data Handling.md
│   ├── 03 - Immutability.md
│   └── 04 - Debug & Error Handling.md
└── README.md
```

---

## Success Criteria

You are ready for automation when you can:

- Explain why mutation causes unpredictable bugs
- Use map, filter, and find without documentation
- Transform nested objects safely
- Debug errors without guessing
- Write pure helper functions

---

## Mindset

Programmer: Make it work.

Automation Engineer: Make it work, maintainable, and resistant to failure.