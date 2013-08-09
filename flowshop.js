var Helper = require('./helper');

// Implementing algorithm should inherit from Flowshop
function Flowshop() {
}
module.exports = Flowshop;

// Implementing algorithm should not overwrite makespan
Flowshop.prototype.makespan = function(data) {
    return Helper.makespan(this.order(data));
};

// Implementing algorithm should overwrite order
Flowshop.prototype.order = function(data) {
    return data;
};
