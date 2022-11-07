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

/**
 * @function lottery
 * @description Draw an array of number
 * @param {number} lotto_size the number of balls to draw
 * @param {number} ball_count the maximum number in the pool of numbers (lowest is zero)
 * @returns {array} Array of unique numbers
 */
export function lottery(lotto_size,ball_count){
    let lotto = [];
    while(lotto.length < lotto_size){
        let ball = getRandomInt(0,ball_count);
        if(lotto.indexOf(ball) === -1){
            lotto.push(ball);
        }
    }
    return lotto;
}

/**
 * @function attr
 * @description get or set an attribute
 * @param {HTMLElement} el
 * @return {function}
 * @param {string} name attribute name
 * @param {string|number|undefined} val 
 * @returns {string|undefined} string if getting, undefined if setting
 */
export const attr = (el) => (name,val) => (val === undefined) ? el.getAttribute(name) : el.setAttribute(name,val); 

/**
 * 
 * @param {HTMLElement} el 
 * @returns {function}
 * @param {object}
 * @returns {HTMLElement}
 */
export function attrs(el){
    return function(obj){
        Object.entries(obj).map(([k,v]) => attr(el)(k,v));
        return el;      // return el so attrs is chainable
    }
}

/**
 * @function rm_attr
 * @description remove an attribute.
 * NOTE: There are some attributes that are "properties". We'll worry about those later.
 * @param {HTMLElement} el 
 * @returns {function}
 * @param {name}
 * @returns {undefined}
 */
export const rm_attr = (el) => (name) => el.removeAttribute(name);

/**
 * @function html
 * @description get or set text content in and element
 * @param {HTMLElement} el 
 * @param {boolean} textOnly if set, use innerText instead of innerHTML 
 * @returns {function}
 * @param {string} text
 */
export function html(el,textOnly=false){
    return function(text){
        const func = textOnly ? "innerText" : "innerHTML";
        if(text !== undefined){
            el[func] = text;
            return el;              // return the element so html is chainable
        }else{
            return el[func];
        }
    }
}

/**
 * @function ce
 * @description create an element, with attributes if provided
 * @param {string} tag 
 * @param {object|undefined} attrs 
 * @returns {HTMLElement}
 */
export function ce(tag,obj){
    const el = document.createElement(tag);

    if(obj !== undefined){
        attrs(el)(obj);
        //Object.entries(obk).map(([k,v]) => attr(el)(k,v));
    }

    return el;
}
