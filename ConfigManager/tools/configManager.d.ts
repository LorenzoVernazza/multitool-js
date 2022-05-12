declare type SaveConfigOptions = {
	/** When set only whitelisted keys are saved. */
	whitelist: string[],
	/** Replaces the currently saved configuration instead of merging with it. */
	overwrite: boolean
}


/** The path where the configurations are saved. */
export const CONFIG_DIR: string;

/** The value of the NODE_ENV variable. */
export const env: string;

/**
 * Sets a property in the configuration.
 * For nested properties use "dot" notation:
 *
 * // for { foo: { bar: 0 } };
 *
 * config.set('foo.bar', 0)
 */	
 export function set(
	/** Property to set. */key: string | string[],
	/** Value to apply. */value: any,
	/** Defines if the property will be writable, defaults true. */writable?: boolean
): any;

/**
 * Checks if a property is defined in the configuration.
 */
 export function has(
	/** Property to check. */key: string | string[]
): boolean;

/**
 * Retrives a property from the configuration.
 * For nested properties use "dot" notation:
 *
 * // with config = { foo: { bar: 0 } };
 *
 * config.get('foo.bar', obj) // returns 0
 */
export function get(
	/** Property to get. */key: string | string[],
	/** Default value when not found. */defaultValue?: any
): any;

/** Saves the configuration file (includes values set during runtime). */
export function save(options: SaveConfigOptions): Promise<any>;

/** Synchronously saves the configuration file (includes values set during runtime). */
export function saveSync(options: SaveConfigOptions): any;

/** Removes the currently saved configuration file. */
export function remove(): Promise<any>;

/** Synchronously removes the currently saved configuration file. */
export function removeSync(): any;

/** Reloads all the configuration values (loses unsaved values). */
export function load(
	/** 
	 * If *true* wipes the current configuration and starts fresh.
	 * If *false* tries to apply the configuration over the current one, keeping newly created entries.
	 * 
	 * Default *true* 
	 */wipe?: boolean
): any;
