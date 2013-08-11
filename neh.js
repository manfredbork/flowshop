var util = require('util');
var Flowshop = require('./flowshop');
var Helper = require('./helper');

// NEH algorithm by Nawaz, Enscore, Ham
function NEH() {
}
util.inherits(NEH, Flowshop);
exports.makespan = NEH.prototype.makespan;

// NEH heuristic
NEH.prototype.order = function(data) {
    var sequence, value, minSequence, minValue;
    var pi = Helper.sort(data);
    var pi$ = [].concat(data);
    var neh = [Helper.get(pi, 1), Helper.get(pi, 2)];
    if(Helper.makespan(neh) > Helper.makespan(Helper.toggle(neh, 1, 2))) {
        neh = Helper.toggle(neh, 1, 2);
    }
    for(var i = 3; i <= pi.length; i++) {
        sequence = Helper.insertBefore(neh, 1, Helper.get(pi, i));
        value = Helper.makespan(sequence);
        minSequence = sequence;
        minValue = value;
        for(var j = 1; j <= neh.length; j++) {
            sequence = Helper.toggle(sequence, j, j + 1);
            value = Helper.makespan(sequence);
            if(value < minValue) {
                minSequence = sequence;
                minValue = value;
            }
        }
        neh = minSequence;
    }
    if(Helper.makespan(pi$) < neh) {
        neh = pi$;
    }
    return neh;
};
exports.order = NEH.prototype.order;
