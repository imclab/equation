
/**
 * Module dependencies.
 */

var expression = require('tower-expressions');

/**
 * Expose `equation`.
 */

module.exports = equation;

/**
 * Equation parser.
 *
 * @param {String} str Mathematical expression.
 * @return {Function}
 * @api public
 */

function equation(str) {
  var exp = expression('equation').parse(str);
  
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

expression('equation')
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
  .match(':math-conditional')
  .match(':math-function')
  .match(':division')
  .match(':symbol');

expression('math-function')
  .match('(', ':math-expression', ')', function($1, $2){
    return { type: 'function', value: $2 };
  });

expression('superscript')
  .match('^', ':math-expression');

expression('subscript')
  .match('_', ':symbol');

expression('division')
  .match(':symbol', '/', ':symbol', function($1, $2, $3){
    return { left: $1, operator: $2, right: $3 };
  });

// http://en.wikipedia.org/wiki/Trigonometric_functions
expression('trig-function')
  .match(':trig-name', ':math-expression', function($1, $2){
    return { type: $1, value: $2 };
  });

expression('trig-name')
  .match('sin')
  .match('cos')
  .match('tan');

expression('symbol')
  .match(/\d+/, '°', function($1){
    return { type: 'degree', value: $1 };
  })
  .match(/[^\.,\?\)\(\/]+/);

/**
 * |w| = |a1 ···ak| = k.
 * $v↖{→}⋅w↖{→} = vw\cos θ$ 
 * C =c(A)={c(a)|a∈A}
 * R(v) = B1B2 ···B⌈k/6⌉ (3.3)
 */
