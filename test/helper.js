var assert = require('assert');
var Helper = require('./../helper');

var set = [[5, 9, 8, 10, 1], [9, 3, 10, 1, 8], [9, 4, 5, 8, 6], [4, 8, 8, 7, 2]];
assert.ok(Helper.isValidData(set));
assert.ok(Helper.sum(Helper.get(set, 1)) === 33);
assert.ok(Helper.sum(Helper.get(set, 2)) === 31);
assert.ok(Helper.sum(Helper.get(set, 3)) === 32);
assert.ok(Helper.sum(Helper.get(set, 4)) === 29);

var sortedSet = Helper.sort(set);
assert.ok(Helper.sum(Helper.get(sortedSet, 1)) === 33);
assert.ok(Helper.sum(Helper.get(sortedSet, 2)) === 32);
assert.ok(Helper.sum(Helper.get(sortedSet, 3)) === 31);
assert.ok(Helper.sum(Helper.get(sortedSet, 4)) === 29);

var subSet = [Helper.get(sortedSet, 1), Helper.get(sortedSet, 2)];
assert.ok(Helper.makespan(subSet) === 46);
assert.ok(Helper.makespan(Helper.toggle(subSet, 1, 2)) === 42);

var insertedSet = Helper.toggle(subSet, 1, 2);
assert.ok(Helper.remove(insertedSet, 1).length === 1);
assert.ok(Helper.insertBefore(insertedSet, 1, Helper.get(sortedSet, 3)).length === 3);
assert.ok(Helper.makespan(Helper.insertBefore(insertedSet, 1, Helper.get(sortedSet, 3))) === 51);
assert.ok(Helper.makespan(Helper.insertBefore(insertedSet, 2, Helper.get(sortedSet, 3))) === 51);
assert.ok(Helper.makespan(Helper.insertBefore(insertedSet, 3, Helper.get(sortedSet, 3))) === 50);

var lastSet = Helper.insertBefore(insertedSet, 3, Helper.get(sortedSet, 3));
assert.ok(Helper.makespan(Helper.insertBefore(lastSet, 1, Helper.get(sortedSet, 4))) === 54);
assert.ok(Helper.makespan(Helper.insertBefore(lastSet, 2, Helper.get(sortedSet, 4))) === 57);
assert.ok(Helper.makespan(Helper.insertBefore(lastSet, 3, Helper.get(sortedSet, 4))) === 58);
assert.ok(Helper.makespan(Helper.insertBefore(lastSet, 4, Helper.get(sortedSet, 4))) === 58);
