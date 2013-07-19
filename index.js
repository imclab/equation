
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
    return { type: 'summation', overscript: $5, underscript: $3, fn: $7 };
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

expression('math-expression')
  .match(':math-conditional');

expression('superscript')
  .match('^', ':math-expression');

expression('subscript')
  .match('_', ':symbol');

// http://en.wikipedia.org/wiki/Trigonometric_functions
expression('trig-function')
  .match(':trig-name', ':math-expression');

expression('trig-name')
  .match('sin')
  .match('cos')
  .match('tan');

expression('symbol')
  .match(/[a-zA-Z0-9]/+);

expression('math-function')
  .match('f(x+h)-f(x)');

// $v↖{→}⋅w↖{→} = vw\cos θ$  