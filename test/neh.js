var assert = require('assert');
var NEH = require('./../neh');

var set = [[5, 9, 8, 10, 1], [9, 3, 10, 1, 8], [9, 4, 5, 8, 6], [4, 8, 8, 7, 2]];
assert.ok(NEH.makespan(set) === 54);

var NEHSet = [[ 4, 8, 8, 7, 2 ], [ 9, 4, 5, 8, 6 ], [ 5, 9, 8, 10, 1 ], [ 9, 3, 10, 1, 8 ]];
assert.ok(NEH.order(set).toString() === NEHSet.toString());
