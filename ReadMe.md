# Multitool JS
A collection of useful methods.

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
ConfigManager allows to easily manage application configurations.
The configManager tool reads the following configuration files (in the given order) and merges the configurations:
- `default.json` - Default configurations.
- `production.json` - Production configurations, enabled only with *NODE_ENV* = *production*.
- `development.json` - Development configurations, enabled only with *NODE_ENV* != *production*.
- `local.json` - Local configurations.
- `custom-environment-variables.json` - Env variables overrides, loads the value of the environment variable as the config value: `{ "varaible": "ENV_VARIABLE_NAME" }`.
  
  Additionally the env variable name can be prefixed with the following terms to forcefully cast/parse the value:
  - `JSON:` parses the value, if the value is not parsable the whole string is applied:
  
    `{ "varaible": "JSON:ENV_VARIABLE_NAME" }`:
    | "ENV_VARIABLE_NAME" value | "varaible" value |
    |--------|-------------| 
    | 'some_string' | `"some_string"` | 
    | '{"some":"json"}' | `{ some: "json" }` |

  - `JSON_ONLY:` parses the value, if the value is not parsable is ignored:
  
    `{ "varaible": "JSON_ONLY:ENV_VARIABLE_NAME" }`:
    | "ENV_VARIABLE_NAME" value | "varaible" value |
    |--------|-------------| 
    | 'some_string' | `"some_string"` | 
    | '{"some":"json"}' | `{ some: "json" }` |



```js 
const configManager = require('multitool-js/tools/configManager');
```
| method | description |
|--------|-------------| 
| get | | 
| has | |
| set | |
| reload | |
| save | |
| saveSync | |
| delete | |
| deleteSync | |
---
