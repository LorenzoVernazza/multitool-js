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
- `custom-environment-variables.json` - Env variables overrides, loads the value of the environment variable as the config value.   
  E.g. `{ "varaible": "ENV_VARIABLE_NAME" }`.   
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
    | 'some_string' |  | 
    | '{"some":"json"}' | `{ some: "json" }` |

  - `MERGE:` like `JSON` but merges the value with current value (if present).

  - `BOOL:` reads the strings `'true'` and `'false'` and sets the corresponding boolean value.

  - `NUMBER:` casts the value as number. If the value is not a valid number the string is kept instead.

  - `NUMBER_NAN:` casts the value as number. If the value is not a valid number the property is set to `NaN`.

  - `NUMBER_ONLY:` casts the value as number. If the value is not a valid number is ignored.

```js 
const configManager = require('multitool-js/tools/configManager');
```
| method | description |
|--------|-------------| 
| get | Retrives a property from the configuration. | 
| has | Checks if a property is defined in the configuration. |
| set | Sets a property value in the configuration. |
| reload | Reloads all the configuration values (loses unsaved values). |
| save | Saves the configuration file (includes values set during runtime). |
| saveSync | Synchronously saves the configuration file (includes values set during runtime). |
| delete | Deletes the currently saved configuration. |
| deleteSync | Synchronously deletes the currently saved configuration. |

The _ConfigManager_ tool also comes with a small CLI utility `npx multitool-config` to help you handle the config files:
| command | description |
|--------|-------------| 
| init | creates "config" folder and files |
| enable \<config> | creates/enables \<config> file |
| disable \<config> | disables \<config> file |
| remove \<config> | removes \<config> file |
| add-property (ap) \<property> | adds a new property to the config files. Asks the value for each enabled config file. |
| remove-property (rp) \<property> [\<config file>] | removes a property from the config files. |

---

