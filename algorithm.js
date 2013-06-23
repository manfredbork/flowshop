var util = require('util');
var Flowshop = require('./flowshop');

/*--------------------------------------------------------*/
/* Algorithm without operation but usable as template
/*--------------------------------------------------------*/
function Algorithm() {
}
util.inherits(Algorithm, Flowshop);
exports.makespan = Algorithm.prototype.makespan;

/*--------------------------------------------------------*/
/* Only overwrite order to implement any algorithm
/*--------------------------------------------------------*/
Algorithm.prototype.order = function(data) {
    return data;
};
exports.order = Algorithm.prototype.order;
