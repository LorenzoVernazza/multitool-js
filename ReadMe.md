# Multitool JS
A collection of useful methods.

Each *tool* or group of *tools* can be required/imported on its own like this:
```js
// Full-require
const multitool = require('multitool-js');
const getProp = multitool.objects.getProp;
```
```js
// Group-require
const objectTools = require('multitool-js/tools/objects');
const getProp = objectTools.getProp;
```
```js
// Single-require
const getProp = require('multitool-js/tools/objects/getProp');
```