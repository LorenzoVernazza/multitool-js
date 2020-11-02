/** The value of the NODE_ENV variable. */
declare var env: string;

/** The path where the configurations are saved. */
declare const CONFIG_DIR: string;

declare function set(
	/** Property to set. */key: string|string[], 
	/** Value to apply. */value: any, 
	/** Defines if the property will be writable, defaults true. */writable?: boolean
): any;
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

/** Reloads the configuration. */
declare function load(
	/** 
	 * If *true* wipes the current configuration and starts fresh.
	 * If *false* tries to apply the configuration over the current one, keeping newly created entries.
	 * 
	 * Default *true* 
	 */wipe?: boolean,
): any;

declare function saveConfig(): Promise<any>;
declare function saveConfigSync(): any;
declare function deleteConfig(): Promise<any>;
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