var util = require('util');
var Flowshop = require('./flowshop');
var NEH = require('./neh.js');
//var Helper = require('./helper.js');

/*--------------------------------------------------------*/
/* Iterated Greedy algorithm
/*--------------------------------------------------------*/
function IG() {
}
util.inherits(IG, Flowshop);
exports.makespan = IG.prototype.makespan;

/*--------------------------------------------------------*/
/* NEH initialization
/*--------------------------------------------------------*/
IG.prototype.initializationNEH = function(data) {
    return NEH.order(data);
};

/*--------------------------------------------------------*/
/* Iterative improvement insertion
/*--------------------------------------------------------*/
IG.prototype.iterativeImprovementInsertion = function(data) {
    // TODO
    return data;
};

/*--------------------------------------------------------*/
/* Iterated Greedy heuristic
/*--------------------------------------------------------*/
IG.prototype.order = function(data) {
    var pi = IG.prototype.initializationNEH(data);
    pi = IG.prototype.iterativeImprovementInsertion(pi);
    // TODO
    return pi;
};
exports.order = IG.prototype.order;
