var util = require('util');
var Flowshop = require('./flowshop');

/*--------------------------------------------------------------*/
/* Specific algorithm should inherit from Flowshop
/*--------------------------------------------------------------*/
function NOP() {
}
util.inherits(NOP, Flowshop);
exports.makespan = NOP.prototype.makespan;

/*--------------------------------------------------------------*/
/* Only overwrite order to implement specific algorithm
/*--------------------------------------------------------------*/
NOP.prototype.order = function(data) {
    return Flowshop.prototype.order(data);
};
exports.order = NOP.prototype.order;
