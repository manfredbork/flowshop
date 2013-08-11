var Helper = require('./helper');

// Implementing algorithm should inherit from Flowshop
function Flowshop() {
}
module.exports = Flowshop;

// Implementing algorithm should not overwrite makespan
Flowshop.prototype.makespan = function(data) {
    return Helper.makespan(data);
};

// Implementing algorithm should not overwrite permutation
Flowshop.prototype.permutation = function(originalData, orderedData) {
    return Helper.readPermutation(originalData, orderedData);
};

// Implementing algorithm should overwrite order
Flowshop.prototype.order = function(data) {
    return data;
};
