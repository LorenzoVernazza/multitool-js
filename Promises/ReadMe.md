# Multitool JS / Promises
A collection of useful promise-related methods.

Each *tool* or group of *tools* can be required/imported on its own like this:
```js
// Full require
const multitool = require('@multitool-js/promises');
const promiseAny = multitool.promiseAny;
```
```js
// Single *tool* require
const promiseAny = require('@multitool-js/promises/tools/promiseAny');
```

### *Tools:*
| tool | description |
|--------|-------------| 
| promiseAny | Handles a group of promises, extendin the capabilities of ``Promise.all()`` | 
| timer | Returns a promise that is resolved/rejected after a timeout |
---
