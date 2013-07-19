
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
  .match('∑', '↙', ':latex-group', '↖', ':latex-group', ':ws', ':latex-function', function($1, $2, $3, $4, $5, $6, $7){
    return { type: 'summation', index: $3, upper: $5, fn: $7 };
  });

expression('latex-function')
  .match('i');

expression('latex-group')
  .match('{', ':latex-expression', '}', function($1, $2, $3){
    return $2;
  })
  .match(':latex-expression');

expression('latex-expression')
  .match('i=1')
  .match('n');