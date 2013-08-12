var util = require('util');
var Flowshop = require('./flowshop');
var Helper = require('./helper');

// NEH algorithm by Nawaz, Enscore, Ham
function NEH() {
}
util.inherits(NEH, Flowshop);
exports.makespan = NEH.prototype.makespan;
exports.rpd = NEH.prototype.rpd;

// NEH heuristic
NEH.prototype.apply = function(data) {
    var sequence, value, minSequence, minValue;
    var pi$ = Helper.clone(data);
    var pi = Helper.sort(data);
    var neh = [Helper.get(pi, 1), Helper.get(pi, 2)];
    if(NEH.prototype.makespan(neh) > NEH.prototype.makespan(Helper.toggle(neh, 1, 2))) {
        neh = Helper.toggle(neh, 1, 2);
    }
    for(var i = 3; i <= pi.length; i++) {
        sequence = Helper.insertBefore(neh, 1, Helper.get(pi, i));
        value = NEH.prototype.makespan(sequence);
        minSequence = sequence;
        minValue = value;
        for(var j = 1; j <= neh.length; j++) {
            sequence = Helper.toggle(sequence, j, j + 1);
            value = NEH.prototype.makespan(sequence);
            if(value < minValue) {
                minSequence = sequence;
                minValue = value;
            }
        }
        neh = minSequence;
    }
    if(NEH.prototype.makespan(pi$) < NEH.prototype.makespan(neh)) {
        neh = pi$;
    }
    return neh;
};
exports.apply = NEH.prototype.apply;
