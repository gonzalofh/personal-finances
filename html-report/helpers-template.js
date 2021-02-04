/**
 * IMPORTANT:
 * - All functions must be separated by exactly one new line
 * - Remove all comment blocks on helpers.js file (Yes, including this one)
 */

function _double(num) {
    num * 2;
}

function substract(a, b) {
    return _double(a) - b;
}

/**
 * Since the first function name starts with `_`, it will be compiled as it is.
 * 
 * On the other hand function 'substract' will be compiled like this:
 * 
 * Handlebars.registerHelper('substract', function substract(a, b) {
 *  return _double(a) - b;
 * });
 * 
 * Once this helper is registered, you can use it in a Handlebars file like this:
 * Given a = 2 and b = 3
 * 
 * <div>{{ substract a b }}</div>
 * 
 * This will be rendered as:
 * 
 * <div>1</div>
 * 
 */

