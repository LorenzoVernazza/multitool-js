# Multitool JS / Promises
A collection of useful promise-related methods.

Each *tool* or group of *tools* can be required/imported on its own like this:
```js
// Full require/import
const multitool = require('@multitool-js/promises');
const promiseGroup = multitool.promiseGroup;
// OR
import { promiseGroup } from '@multitool-js/promises';
```
```js
// Single *tool* require/import
const { promiseGroup } = require('@multitool-js/promises/tools/promiseGroup');
// OR
import { promiseGroup } from ('@multitool-js/promises/tools/promiseGroup');
```

### *Tools:*
| tool | description |
|--------|-------------| 
| promiseGroup | Handles a group of promises, extending the capabilities of ``Promise.all()`` | 
| timer | Returns a promise that is resolved/rejected after a timeout |
---
