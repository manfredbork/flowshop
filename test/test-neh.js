var assert = require('assert');
var NEH = require('./../neh');

var instance = [[5, 9, 8, 10, 1], [9, 3, 10, 1, 8], [9, 4, 5, 8, 6], [4, 8, 8, 7, 2]];
assert.ok(NEH.makespan(instance) === 54);

var NEHInstance = [[ 4, 8, 8, 7, 2 ], [ 9, 4, 5, 8, 6 ], [ 5, 9, 8, 10, 1 ], [ 9, 3, 10, 1, 8 ]];
assert.ok(NEH.order(instance).toString() === NEHInstance.toString());
