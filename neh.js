var util = require('util');
var Flowshop = require('./flowshop');
var Helper = require('./helper');

// NEH algorithm by Nawaz, Enscore, Ham
function NEH() {
}
util.inherits(NEH, Flowshop);
exports.rpd = NEH.prototype.rpd;
exports.makespan = NEH.prototype.makespan;

// NEH heuristic
NEH.prototype.apply = function(data) {

    // Variables
    var pi, piB, sequence, value, minSequence, minValue;

    // Initialization
    pi = Helper.sort(data);
    piB = [Helper.get(pi, 1), Helper.get(pi, 2)];
    if(NEH.prototype.makespan(piB) > NEH.prototype.makespan(Helper.toggle(piB, 1, 2))) {
        piB = Helper.toggle(piB, 1, 2);
    }

    // Best insertion
    for(var i = 3; i <= pi.length; i++) {
        sequence = Helper.insertBefore(piB, 1, Helper.get(pi, i));
        value = NEH.prototype.makespan(sequence);
        minSequence = sequence;
        minValue = value;
        for(var j = 1; j < sequence.length; j++) {
            sequence = Helper.toggle(sequence, j, j + 1);
            value = NEH.prototype.makespan(sequence);
            if(value < minValue) {
                minSequence = sequence;
                minValue = value;
            }
        }
        piB = minSequence;
    }
    return piB;
};
exports.apply = NEH.prototype.apply;
