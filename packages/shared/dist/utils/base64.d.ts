/**
 *  base64.ts
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 *
 * @author Dan Kogai (https://github.com/dankogai)
 */
declare const version = "3.6.1";
/**
 * @deprecated use lowercase `version`.
 */
declare const VERSION = "3.6.1";
/**
 * polyfill version of `btoa`
 */
declare const btoaPolyfill: (bin: string) => any;
/**
 * does what `window.btoa` of web browsers do.
 * @param {String} bin binary string
 * @returns {string} Base64-encoded string
 */
declare const _btoa: (bin: string) => any;
/**
 * converts a Uint8Array to a Base64 string.
 * @param {boolean} [urlsafe] URL-and-filename-safe a la RFC4648 §5
 * @returns {string} Base64 string
 */
declare const fromUint8Array: (u8a: any, urlsafe?: boolean) => any;
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-8 string
 * @returns {string} UTF-16 string
 */
declare const utob: (u: string) => any;
/**
 * converts a UTF-8-encoded string to a Base64 string.
 * @param {boolean} [urlsafe] if `true` make the result URL-safe
 * @returns {string} Base64 string
 */
declare const encode: (src: string, urlsafe?: boolean) => any;
/**
 * converts a UTF-8-encoded string to URL-safe Base64 RFC4648 §5.
 * @returns {string} Base64 string
 */
declare const encodeURI: (src: string) => any;
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-16 string
 * @returns {string} UTF-8 string
 */
declare const btou: (b: string) => any;
/**
 * polyfill version of `atob`
 */
declare const atobPolyfill: (asc: string) => string;
/**
 * does what `window.atob` of web browsers do.
 * @param {String} asc Base64-encoded string
 * @returns {string} binary string
 */
declare const _atob: (asc: string) => any;
/**
 * converts a Base64 string to a Uint8Array.
 */
declare const toUint8Array: (a: string) => any;
/**
 * converts a Base64 string to a UTF-8 string.
 * @param {String} src Base64 string.  Both normal and URL-safe are supported
 * @returns {string} UTF-8 string
 */
declare const decode: (src: string) => any;
/**
 * check if a value is a valid Base64 string
 * @param {String} src a value to check
  */
declare const isValid: (src: any) => boolean;
/**
 * extend String.prototype with relevant methods
 */
declare const extendString: () => void;
/**
 * extend Uint8Array.prototype with relevant methods
 */
declare const extendUint8Array: () => void;
/**
 * extend Builtin prototypes with relevant methods
 */
declare const extendBuiltins: () => void;
declare const gBase64: {
    version: string;
    VERSION: string;
    atob: (asc: string) => any;
    atobPolyfill: (asc: string) => string;
    btoa: (bin: string) => any;
    btoaPolyfill: (bin: string) => any;
    fromBase64: (src: string) => any;
    toBase64: (src: string, urlsafe?: boolean) => any;
    encode: (src: string, urlsafe?: boolean) => any;
    encodeURI: (src: string) => any;
    encodeURL: (src: string) => any;
    utob: (u: string) => any;
    btou: (b: string) => any;
    decode: (src: string) => any;
    isValid: (src: any) => boolean;
    fromUint8Array: (u8a: any, urlsafe?: boolean) => any;
    toUint8Array: (a: string) => any;
    extendString: () => void;
    extendUint8Array: () => void;
    extendBuiltins: () => void;
};
export { version };
export { VERSION };
export { _atob as atob };
export { atobPolyfill };
export { _btoa as btoa };
export { btoaPolyfill };
export { decode as fromBase64 };
export { encode as toBase64 };
export { utob };
export { encode };
export { encodeURI };
export { encodeURI as encodeURL };
export { btou };
export { decode };
export { isValid };
export { fromUint8Array };
export { toUint8Array };
export { extendString };
export { extendUint8Array };
export { extendBuiltins };
export { gBase64 as Base64 };
