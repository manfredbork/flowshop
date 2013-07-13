var util = require('util');
var Flowshop = require('./flowshop');
var Helper = require('./helper.js');

/*--------------------------------------------------------*/
/* NEH algorithm by Nawaz, Enscore, Ham
/*--------------------------------------------------------*/
function NEH() {
}
util.inherits(NEH, Flowshop);
exports.makespan = NEH.prototype.makespan;

/*--------------------------------------------------------*/
/* NEH heuristic
/*--------------------------------------------------------*/
NEH.prototype.order = function(data) {
    var order = Helper.sort(data);
    var neh = [Helper.get(order, 1), Helper.get(order, 2)];
    if(Helper.makespan(neh) > Helper.makespan(Helper.toggle(neh, 1, 2))) {
        neh = Helper.toggle(neh, 1, 2);
    }
    for(var i = 3; i < order.length + 1; i++) {
        var sequence = Helper.insertBefore(neh, 1, Helper.get(order, i));
        var value = Helper.makespan(sequence);
        var minSequence = sequence;
        var minValue = value;
        for(var j = 1; j < neh.length + 1; j++) {
            sequence = Helper.toggle(sequence, j, j + 1);
            value = Helper.makespan(sequence);
            if(value < minValue) {
                minSequence = sequence;
                minValue = value;
            }
        }
        neh = minSequence;
    }
    return neh;
};
exports.order = NEH.prototype.order;
