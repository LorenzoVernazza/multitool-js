# Multitool JS / Objects
A collection of useful object-oriented methods.

Each *tool* or group of *tools* can be required/imported on its own like this:
```js
// Full require/import
const multitool = require('@multitool-js/objects');
const getProp = multitool.getProp;
// OR
import { getProp } from '@multitool-js/objects';
```
```js
// Single *tool* require/import
const { getProp } = require('@multitool-js/objects/tools/getProp');
// OR
import { getProp } from '@multitool-js/objects/tools/getProp';
```

### *Tools:*
| tool | description |
|--------|-------------| 
| getProp | Retrives a property from an object | 
| hasProp | Checks if an object contains a property | 
| setProp | Sets a property in an object | 
| replaceProp | Replaces a property in an object |  
| deepMerge | Merges two objects, any child object is recursively recreated | 
| deepCompare | Checks if two values are equal. Objects and Arrays are recursively compared for each value | 
---
