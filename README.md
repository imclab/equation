# Equation parser

[![experimental](https://rawgithub.com/hughsk/stability-badges/master/dist/experimental.svg)](http://github.com/hughsk/stability-badges)

## Installation

node.js:

```bash
npm install equation
```

browser:

```bash
component install equation
```

## Example

```js
var equation = require('equation');
var sum = equation('∑↙{i=1}↖n i');
assert(5050 === sum(100));
```

## Notes

- http://mathscribe.com/author/jqmath.html
- http://en.wikipedia.org/wiki/List_of_mathematical_symbols

## Licence

MIT