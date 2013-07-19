var math = 'undefined' == typeof window
  ? require('..')
  : require('math-expressions'); // how to do this better?

var assert = require('assert');

describe('math expressions', function(){
  it('Σ', function(){
    var sum = math('∑↙{i=1}↖n i');
    var res = sum(100);
    assert(5050 === res);
  });
});