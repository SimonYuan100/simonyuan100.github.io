---
title: 'macrotask vs microtask'
date: '2023-03-08'
author: 'simon'
---

we know that javascript has a major thread. without block the thread, the Event Loop was made.
we could push the task to event loop, the task will be executed as FIFO. here we talk about macro and micro executed way, which is one macro is executed then all micros then render and loop execute.

### macrotask

- setTimeout
- setInterval
- setImmediate(node.js)

### microtask

- promise.then
- mutation observer
- Object.observe
- process.nextTick(nodejs)
