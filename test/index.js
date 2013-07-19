var math = 'undefined' == typeof window
  ? require('..')
  : require('equation'); // how to do this better?

var assert = require('assert');
var expression = require('tower-expressions');

describe('math expressions', function(){
  /*it('Σ', function(){
    var sum = math('∑↙{i=1}↖n i');
    var res = sum(100);
    assert(5050 === res);
  });*/

  it('parses', function(){
    var exp = expression('summation').parse('∑↙{i=1}↖n i');
    console.log(exp);
  });

  it('trig-function', function(){
    var exp = expression('trig-function').parse('sinΘ');
    console.log(exp);
    var exp = expression('trig-function').parse('sin75°');
    console.log(exp);
    var exp = expression('trig-function').parse('sin(π/4)');
    console.log(exp);
  });
});