# Documentation Architecture

This directory documents the conceptual foundation supporting reliable automation engineering.

While `src/` focuses on executable implementations, `docs/` captures:

- Behavioral explanations
- Deterministic design principles
- Failure pattern analysis
- Engineering reasoning behind each layer

The documentation evolves alongside implementation maturity.


## Planned Documentation Progression

1. JavaScript behavioral foundations
2. Immutability and state management
3. Deterministic data transformation
4. Debugging and exception discipline
5. Asynchronous patterns and concurrency control
6. Asynchronous JavaScript (practical)
7. Test isolation and execution safety
8. Node.js environment and scripting
9. Automation patterns and anti-patterns
10. CI/CD stability principles

> Documents are expanded incrementally as each implementation layer matures.

## Structured Documentation Map

docs/
```
├── 01-javascript-basics.md
├── 02-immutability.md
├── 03-data-handling.md
├── 04-debugging-and-errors.md
├── 05-Introduction-to-Asynchronous-JavaScript.md
├── 06-asynchronous-javascript.md
├── 07-test-isolation-and-state-management.md
├── 08-nodejs-environment-and-scripting.md
├── 09-automation-patterns-and-anti-patterns.md
├── 10-ci-cd-stability-principles.md
├── isMutation.md
├── README.md
```
Each document represents a conceptual layer aligned with the implementation structure inside `src/.`

Documentation is introduced and refined only when the corresponding engineering layer is sufficiently understood and implemented.

---

## Documentation Overview

| Document | Key Topics |
|---|---|
| 01-javascript-basics.md | Variables, scope, memory, functions |
| 02-immutability.md | Reference vs copy, mutation, Object.freeze, immutable ops |
| 03-data-handling.md | JSON, API, mapping/filtering, schema validation |
| 04-debugging-and-errors.md | try/catch, custom error, stack trace, async errors |
| 05-Introduction-to-Asynchronous-JavaScript.md | Callback, Promise, async/await, concurrency |
| 06-asynchronous-javascript.md | Callback, Promise, async/await, error handling, concurrency, QA focus |
| 07-test-isolation-and-state-management.md | beforeEach/afterEach, shared state, factory, env separation |
| 08-nodejs-environment-and-scripting.md | Node.js, modules, fs, env, CLI, npm scripts |
| 09-automation-patterns-and-anti-patterns.md | POM, factory, utility, DRY, anti-patterns, QA focus |
| 10-ci-cd-stability-principles.md | Deterministic tests, idempotency, flaky root causes, CI stability, env consistency, parallel safety |
| isMutation.md | Mutation detection, test data safety |

All documentation is aligned with the implementation structure and QA automation reliability goals.
