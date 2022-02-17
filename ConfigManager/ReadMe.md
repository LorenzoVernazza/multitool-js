# Multitool JS / Config Manager
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
    | "ENV_VARIABLE_NAME" value | "varaible" value   |
    | ------------------------- | ------------------ |
    | 'some_string'             | `"some_string"`    |
    | '{"some":"json"}'         | `{ some: "json" }` |

  - `JSON_ONLY:` parses the value, if the value is not parsable is ignored:
    `{ "varaible": "JSON_ONLY:ENV_VARIABLE_NAME" }`:
    | "ENV_VARIABLE_NAME" value | "varaible" value   |
    | ------------------------- | ------------------ |
    | 'some_string'             |                    |
    | '{"some":"json"}'         | `{ some: "json" }` |

  - `MERGE:` like `JSON` but merges the value with current value (if present).

  - `BOOLEAN:` reads the strings `'true'`, `'1'`, `'false'`, `'0'` and sets the corresponding boolean value.

  - `NUMBER:` casts the value as number. If the value is not a valid number the string is kept instead.

  - `NUMBER_NAN:` casts the value as number. If the value is not a valid number the property is set to `NaN`.

  - `NUMBER_ONLY:` casts the value as number. If the value is not a valid number is ignored.

### *How to use*

```js 
const configManager = require('@multitool-js/configManager');
```
| method     | description                                                                      |
| ---------- | -------------------------------------------------------------------------------- |
| get        | Retrives a property from the configuration.                                      |
| has        | Checks if a property is defined in the configuration.                            |
| set        | Sets a property value in the configuration.                                      |
| reload     | Reloads all the configuration values (loses unsaved values).                     |
| save       | Saves the configuration file (includes values set during runtime).               |
| saveSync   | Synchronously saves the configuration file (includes values set during runtime). |
| delete     | Deletes the currently saved configuration.                                       |
| deleteSync | Synchronously deletes the currently saved configuration.                         |

### *Built-in CLI*

The _ConfigManager_ tool also comes with a small CLI utility `npx multitool-config` to help you handle the config files:
| command                                           | description                                                                           |
| ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| init                                              | creates "config" folder and files                                                     |
| enable \<config>                                  | creates/enables \<config> file                                                        |
| disable \<config>                                 | disables \<config> file                                                               |
| remove \<config>                                  | removes \<config> file                                                                |
| add-property (ap) \<property>                     | adds a new property to the config files. Asks the value for each enabled config file. |
| remove-property (rp) \<property> [\<config file>] | removes a property from the config files.                                             |

---
