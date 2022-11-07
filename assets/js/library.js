/* File: assets/js/library.js
 * Info: Trying out something new.
 */

/**
 * @constant root
 * @returns {Element} the root element of the document (this is equivalent to the `:root` value used by CSS)
 */
export const root = document.documentElement;

/**
 * @function qs
 * @param {string} query 
 * @param {boolean} all 
 * @returns {HTMLElement|NodeList}
 */
export const qs = (query,all=false) => document[`querySelector${all?"All":""}`](query);

/**
 * @function css
 * @param {HTMLElement} el 
 * @returns {function}
 * @param {string} prop
 * @param {string|number|undefined} val
 * @returns {string|number|undefined}
 */
export const css = (el) => (prop, val) => (val === undefined) ? getComputedStyle(el).getPropertyValue(prop) : el.style.setProperty(prop,val);

/**
 * @function getRandomInt 
 * @description Return a random integer between min and max
 * @param {number} min an inclusive minimum limit integer
 * @param {number} max an exclusive maximum limit integer
 * @param {boolean} inclusive make the maximum inclusive, default is false. 
 * @returns {number} more specifically, an integer
 */
export function getRandomInt(min, max, inclusive = false){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + (inclusive ? 1 : 0)) + min);
}
