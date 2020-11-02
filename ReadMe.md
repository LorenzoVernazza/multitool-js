# Multitool JS
A collection of useful methods.

### *Objects* (tool group)
```js 
const objects = require('multitool-js/tools/objects');
```
| tool | description |
|--------|-------------| 
| getProp | Retrives a property from an object | 
| hasProp | Checks if an object contains a property | 
| setProp | Sets a property in an object | 
| replaceProp | Replaces a property in an object | 
---

### *Promises* (tool group)
```js 
const promises = require('multitool-js/tools/promises');
```
| tool | description |
|--------|-------------| 
| promiseAny | Handles a group of promises, extendin the capabilities of ``Promise.all()`` | 
| timer | Returns a promise that is resolved/rejected after a timeout |
---

### *Process* (tool group)
```js 
const process = require('multitool-js/tools/process');
```
| tool | description |
|--------|-------------| 
| processArgs | Handles a group of promises, extendin the capabilities of ``Promise.all()`` | 
| Timer | Creates a timer, either with standard resolution (millisecond) or high resolution (nanoseconds) | 
---

### *Strings* (tool group)
```js 
const strings = require('multitool-js/tools/strings');
```
| tool | description |
|--------|-------------| 
| ellipsis | Trims a string to a given length and applies ellipsis | 
| quotes | Offers some methods to add and check quotations on strings |
---

### *ConfigManager* (tool)
```js 
const configManager = require('multitool-js/tools/configManager');
```
| method | description |
|--------|-------------| 
| get | | 
| has | |
| set | |
| load | |
| save | |
| delete | |
---


Each *tool* or group of *tools* can be required/imported on its own like this:
```js
// Full require
const multitool = require('multitool-js');
const getProp = multitool.objects.getProp;
```
```js
// *tool-group* or *single-tool*
const objectTools = require('multitool-js/tools/objects');
const getProp = objectTools.getProp;
```
```js
// *tool* from *tool-group*
const getProp = require('multitool-js/tools/objects/getProp');
```