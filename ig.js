var util = require('util');
var Flowshop = require('./flowshop');
var Helper = require('./helper.js');
var NEH = require('./neh.js');

// Iterated Greedy algorithm
function IG() {
}
util.inherits(IG, Flowshop);
exports.makespan = IG.prototype.makespan;

// NEH initialization
IG.prototype.initializationNEH = function(data) {
    return NEH.order(data);
};

// Iterative improvement insertion
IG.prototype.iterativeImprovementInsertion = function(pi) {
    var piBest = [].concat(pi);
    var improve = true;
    while(improve) {
        improve = false;
        var sequence = [].concat(piBest);
        var value = Helper.makespan(sequence);
        var minSequence = sequence;
        var minValue = value;
        while(pi.length > 0) {
            var random = Math.floor((Math.random() * pi.length)) + 1;
            var item = Helper.get(pi, random);
            var pos = Helper.position(sequence, item);
            for(var i = pos; i < piBest.length; i++) {
                sequence = Helper.toggle(sequence, i, i + 1);
                value = Helper.makespan(sequence);
                if(value < minValue) {
                    minSequence = sequence;
                    minValue = value;
                }
            }
            sequence = Helper.toggle(sequence, piBest.length, 1);
            for(var j = 1; j < pos - 1; j++) {
                sequence = Helper.toggle(sequence, j, j + 1);
                value = Helper.makespan(sequence);
                if(value < minValue) {
                    minSequence = sequence;
                    minValue = value;
                }
            }
            if(Helper.makespan(minSequence) < Helper.makespan(piBest)) {
                piBest = minSequence;
                improve = true;
            }
            pi = Helper.remove(pi, random);
        }
    }
    return piBest;
};

// Iterated Greedy heuristic
IG.prototype.order = function(data) {
    var pi = IG.prototype.initializationNEH(data);
    pi = IG.prototype.iterativeImprovementInsertion(pi);
    return pi;
};
exports.order = IG.prototype.order;
