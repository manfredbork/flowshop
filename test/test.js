// Unit tests
var assert = require('assert');
var Helper = require('./../helper');
var NEH = require('./../neh');

var instance = [[5, 9, 8, 10, 1], [9, 3, 10, 1, 8], [9, 4, 5, 8, 6], [4, 8, 8, 7, 2]];
assert.ok(NEH.makespan(instance) === 54);
assert.ok(Helper.sum(Helper.get(instance, 1)) === 33);
assert.ok(Helper.sum(Helper.get(instance, 2)) === 31);
assert.ok(Helper.sum(Helper.get(instance, 3)) === 32);
assert.ok(Helper.sum(Helper.get(instance, 4)) === 29);

var targetInstance = [[ 4, 8, 8, 7, 2 ], [ 9, 4, 5, 8, 6 ], [ 5, 9, 8, 10, 1 ], [ 9, 3, 10, 1, 8 ]];
assert.ok(NEH.apply(instance).toString() === targetInstance.toString());

var sortedInstance = Helper.sort(instance);
assert.ok(Helper.sum(Helper.get(sortedInstance, 1)) === 33);
assert.ok(Helper.sum(Helper.get(sortedInstance, 2)) === 32);
assert.ok(Helper.sum(Helper.get(sortedInstance, 3)) === 31);
assert.ok(Helper.sum(Helper.get(sortedInstance, 4)) === 29);

var subInstance = [Helper.get(sortedInstance, 1), Helper.get(sortedInstance, 2)];
assert.ok(NEH.makespan(subInstance) === 46);
assert.ok(NEH.makespan(Helper.toggle(subInstance, 1, 2)) === 42);

var insertedInstance = Helper.toggle(subInstance, 1, 2);
assert.ok(Helper.remove(insertedInstance, 1).length === 1);
assert.ok(Helper.insertBefore(insertedInstance, 1, Helper.get(sortedInstance, 3)).length === 3);
assert.ok(NEH.makespan(Helper.insertBefore(insertedInstance, 1, Helper.get(sortedInstance, 3))) === 51);
assert.ok(NEH.makespan(Helper.insertBefore(insertedInstance, 2, Helper.get(sortedInstance, 3))) === 51);
assert.ok(NEH.makespan(Helper.insertBefore(insertedInstance, 3, Helper.get(sortedInstance, 3))) === 50);

var lastInstance = Helper.insertBefore(insertedInstance, 3, Helper.get(sortedInstance, 3));
assert.ok(NEH.makespan(Helper.insertBefore(lastInstance, 1, Helper.get(sortedInstance, 4))) === 54);
assert.ok(NEH.makespan(Helper.insertBefore(lastInstance, 2, Helper.get(sortedInstance, 4))) === 57);
assert.ok(NEH.makespan(Helper.insertBefore(lastInstance, 3, Helper.get(sortedInstance, 4))) === 58);
assert.ok(NEH.makespan(Helper.insertBefore(lastInstance, 4, Helper.get(sortedInstance, 4))) === 58);
