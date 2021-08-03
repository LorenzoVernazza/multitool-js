/** 
 * Capitalize the first letter of a given string.
 */
declare function _capitalizeOne(/** Input string */input: string) : string;

interface SentenceCapitalizationOptions {
    /** Mimimun length of a single word to capitalize. *Default 1*. */
    min?: number, 
    /** Pattern used to recognize a word. Default *[a-zA-Z]*. */
    wordPattern?: string,
    /** Forces all the characters to lower case before capitalization. Default *false*. */
    enforce?: boolean,
    /** Inverts all the case operations. Default *false*. */
    invert?: boolean
}

interface WordCapitalizationOptions extends SentenceCapitalizationOptions {
    /** Pattern used to recognize the beginning of a sentence. Default *^|\\s*. */
    beforeCapitalPattern?: string,
}


/** 
 * Capitalize the first letter of each word in a given string.
 */
declare function _capitalizeWords(/** Input string */input: string, /** Capitalization options */options?: WordCapitalizationOptions) : string

/** 
 * Capitalize the first letter of a sentence in a given string.
 */
declare function _capitalizeSentences(/** Input string */input: string, /** Capitalization options */options?: SentenceCapitalizationOptions) : string

/** 
 * Returns a capitalization object for the current string.
 */
declare function capitalize(/** Input string */input: string) : {
    /** Capitalize the first letter of the given string. */
    toString(): string,
    /** Capitalize the first letter of each word in the given string. */ 
    words(/** Capitalization options */options?: WordCapitalizationOptions) : string,
    /** Capitalize the first letter of a sentence in the given string. */ 
    sentences(/** Capitalization options */options?: SentenceCapitalizationOptions) : string,
}

declare namespace capitalize {
    declare const capitalizeOne = _capitalizeOne;
    declare const capitalizeWords = _capitalizeWords;
    declare const capitalizeSentences = _capitalizeSentences;
}  

export = capitalize;