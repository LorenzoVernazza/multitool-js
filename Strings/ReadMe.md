# Multitool JS / Strings
A collection of useful string-related methods.

Each *tool* or group of *tools* can be required/imported on its own like this:
```js
// Full require
const multitool = require('@multitool-js/strings');
const ellipsis = multitool.ellipsis;
```
```js
// Single *tool* require
const ellipsis = require('@multitool-js/strings/tools/ellipsis');
```

### *Tools:*
| tool | description |
|--------|-------------| 
| ellipsis | Trims a string to a given length and applies ellipsis | 
| quotes | Offers some methods to add and check quotations on strings |
---
