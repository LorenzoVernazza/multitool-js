# Multitool JS / Promises
A collection of useful promise-related methods.

Each *tool* or group of *tools* can be required/imported on its own like this:
```js
// Full require/import
const multitool = require('@multitool-js/promises');
const promiseAny = multitool.promiseAny;
// OR
import { promiseAny } from '@multitool-js/promises';
```
```js
// Single *tool* require/import
const promiseAny = require('@multitool-js/promises/tools/promiseAny');
// OR
import promiseAny from ('@multitool-js/promises/tools/promiseAny');
```

### *Tools:*
| tool | description |
|--------|-------------| 
| promiseAny | Handles a group of promises, extendin the capabilities of ``Promise.all()`` | 
| timer | Returns a promise that is resolved/rejected after a timeout |
---
