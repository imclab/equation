
/**
 * Module dependencies.
 */

var expression = require('tower-expressions');

/**
 * Expose `math`.
 */

module.exports = math;

/**
 * A one-liner.
 *
 * @param {String} name
 * @return {Function}
 * @api public
 */

function math(str) {
  var exp = expression('math').parse(str);
  
  switch (exp.type) {
    case 'summation':
      return summationFn(exp);
      break;
  }
}

function summationFn(exp) {
  var fn = exp.fn;
  fn = function(i, n) { return i; };
  function summation(n) {
    var i = 1; // exp.index;
    var result = 0;
    while (i <= n) {
      result += i;
      i++;
    }
    return result;
  }
  return summation;
}

/**
 * Expressions.
 */

expression('math')
  .match(':summation');

expression('summation')
  .match('∑', '↙', ':below-summation', '↖', ':above-summation', ':ws', ':latex-function', function($1, $2, $3, $4, $5, $6, $7){
    return { type: 'summation', top: $5, bottom: $3, fn: $7 };
  });

expression('math-conditional')
  .match(/[a-zA-Z]+/, ':math-operator', /[\d]+/, function($1, $2, $3){
    return { left: $1, operator: $2, right: $3 };
  });

expression('latex-function')
  .match('i');

expression('below-summation')
  .match('{', ':math-conditional', '}', function($1, $2, $3){
    return $2;
  })
  .match(':math-conditional');

expression('above-summation')
  .match('n');

expression('math-operator')
  .match('=')
  .match(':element-of')
  .match(':contains');

expression('element-of').match('∈');
expression('contains').match('∋');