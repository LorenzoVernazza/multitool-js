## Version 1.1.3 - (07/07/2022)

Fixes:
- Fixed custom env variables loading empty values
- Fixed breaking error in extension loader
- Fixed config import

## Version 1.1.0 - (28/06/2022)

Additions:
- Ability to override environment (from NODE_ENV) via custom env variable NODE_CONFIG_ENV
- Added custom environment (no longer limited to "development" and "production". Uses "development" if no environment is specified)
- Added option to cancel autoloading via env variable (CONFIG_AUTOLOAD_ENABLED=false)
- Added instances for all static files. Instance name is read from the env variable specified via the CONFIG_INSTANCE_VARIABLE (default "NODE_APP_INSTANCE")and appended to the file name (e.g. NODE_APP_INSTANCE=1 -> default-1.json). The instance files are loaded after the standard files (e.g. default-1.json is loaded right after default.json).
- Added new supported extensions:
  - *jsonc* (requires module "json5")
  - *yaml*, *yml* (requires module "yaml")
  - additional extension support can be added by disabling the autoloading and using the "registerFileParser" method before loading the configuration.
- Warnings can be suppressed with the CONFIG_SUPPRESS_WARNINGS=true env variable

Changes:
- The json parser now uses "json5" if installed.
- The module now crashes when config files are present but invalid, use IGNORE_INVALID_FILES=true to ignore invalid files