# Multitool JS / Process
A collection of useful process-oriented methods.

Each *tool* or group of *tools* can be required/imported on its own like this:
```js
// Full require
const multitool = require('@multitool-js/process');
const processArgs = multitool.processArgs;
```
```js
// Single *tool* require
const processArgs = require('@multitool-js/process/tools/processArgs');
```

### *Tools:*
| tool | description |
|--------|-------------| 
| processArgs | Handles a group of promises, extendin the capabilities of ``Promise.all()`` | 
| timers | Handles timers, either with standard resolution (millisecond) or high resolution (nanoseconds) | 
---
