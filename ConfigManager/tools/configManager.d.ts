declare type SaveConfigOptions = {
	/** When set only whitelisted keys are saved. */
	whitelist: string[],
	/** Replaces the currently saved configuration instead of merging with it. */
	overwrite: boolean
}

declare const configManager: {
	/** The path where the configurations are saved. */
	readonly CONFIG_DIR: string;
	
	/** The value of the NODE_ENV variable. */
	env: string;

	/**
	 * Sets a property in the configuration.
	 * For nested properties use "dot" notation:
	 *
	 * // for { foo: { bar: 0 } };
	 *
	 * config.set('foo.bar', 0)
	 */	
	set(
		/** Property to set. */key: string | string[],
		/** Value to apply. */value: any,
		/** Defines if the property will be writable, defaults true. */writable?: boolean
	): any;

	/**
	 * Checks if a property is defined in the configuration.
	 */
	has(
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
	get(
		/** Property to get. */key: string | string[],
		/** Default value when not found. */defaultValue?: any
	): any;

	/** Saves the configuration file (includes values set during runtime). */
	save(options: SaveConfigOptions): Promise<any>;

	/** Synchronously saves the configuration file (includes values set during runtime). */
	saveSync(options: SaveConfigOptions): any;

	/** Removes the currently saved configuration file. */
	delete(): Promise<any>;

	/** Synchronously removes the currently saved configuration file. */
	deleteSync(): any;

	/** Reloads all the configuration values (loses unsaved values). */
	load(
		/** 
		 * If *true* wipes the current configuration and starts fresh.
		 * If *false* tries to apply the configuration over the current one, keeping newly created entries.
		 * 
		 * Default *true* 
		 */wipe?: boolean
	): any;
};

export = configManager;