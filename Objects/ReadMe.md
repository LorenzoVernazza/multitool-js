# Multitool JS / Objects
A collection of useful object-oriented methods.

Each *tool* or group of *tools* can be required/imported on its own like this:
```js
// Full require
const multitool = require('@multitool-js/objects');
const getProp = multitool.getProp;
```
```js
// Single *tool* require
const getProp = require('@multitool-js/objects/tools/getProp');
```

### *Tools:*
| tool | description |
|--------|-------------| 
| getProp | Retrives a property from an object | 
| hasProp | Checks if an object contains a property | 
| setProp | Sets a property in an object | 
| replaceProp | Replaces a property in an object | 
---
