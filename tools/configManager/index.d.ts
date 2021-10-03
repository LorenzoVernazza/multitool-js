declare module 'multitool-js/tools/configManager';

/** The value of the NODE_ENV variable. */
declare var env: string;

/** The path where the configurations are saved. */
declare const CONFIG_DIR: string;


declare function set(
	/** Property to set. */key: string|string[], 
	/** Value to apply. */value: any, 
	/** Defines if the property will be writable, defaults true. */writable?: boolean
): any;

/**
 * Checks if a property is defined in the configuration.
 */
declare function has(
	/** Property to check. */key: string|string[]
): boolean;

/**
 * Retrives a property from the configuration.
 * For nested properties use "dot" notation:
 *
 * // with config = { foo: { bar: 0 } };
 *
 * config.get('foo.bar', obj) // returns 0
 */
declare function get(
	/** Property to get. */key: string|string[],
	/** Default value when not found. */defaultValue?: any
): any;

/** Reloads all the configuration values (loses unsaved values). */
declare function load(
	/** 
	 * If *true* wipes the current configuration and starts fresh.
	 * If *false* tries to apply the configuration over the current one, keeping newly created entries.
	 * 
	 * Default *true* 
	 */wipe?: boolean,
): any;

interface SaveConfigOptions {
    /** When set only whitelisted keys are saved. */
    whitelist: string[],
    /** Replaces the currently saved configuration instead of merging with it. */
    overwrite: boolean
}

/** Saves the configuration file (includes values set during runtime). */
declare function saveConfig(options: SaveConfigOptions): Promise<any>;

/** Synchronously saves the configuration file (includes values set during runtime). */
declare function saveConfigSync(options: SaveConfigOptions): any;

/** Removes the currently saved configuration file. */
declare function deleteConfig(): Promise<any>;

/** Synchronously removes the currently saved configuration file. */
declare function deleteConfigSync(): any;

export {
	CONFIG_DIR,
	env,
	set,
	get,
	has,
	saveConfig as save,
	saveConfigSync as saveSync,
	deleteConfig as delete,
	deleteConfigSync as deleteSync,
	load as reload
};