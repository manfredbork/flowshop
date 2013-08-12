var util = require('util');
var Flowshop = require('./flowshop');
var Helper = require('./helper');
var Timer = require('./timer');
var NEH = require('./neh');

// Iterated Greedy algorithm
function IG() {
}
util.inherits(IG, Flowshop);
exports.rpd = IG.prototype.rpd;
exports.makespan = IG.prototype.makespan;

// T parameter
IG.prototype.T = 0.4;
exports.T = IG.prototype.T;

// d parameter
IG.prototype.d = 4;
exports.d = IG.prototype.d;

// ms parameter for temperature
IG.prototype.ms = 60;

// Temperature
IG.prototype.temperature = function(data) {
    var total = 0;
    for(var i = 0; i < data.length; i++) {
        total = total + Helper.sum(data[i]);
    }
    return IG.prototype.T * (total / (data.length * data[data.length - 1].length * 10));
};
exports.temperature = IG.prototype.temperature;

// Termination criterion
IG.prototype.termination = function(data) {
    return data.length * (data[data.length - 1].length / 2) * IG.prototype.ms;
};
exports.termination = IG.prototype.termination;

// NEH initialization
IG.prototype.initializationNEH = function(data) {
    return NEH.apply(data);
};

// Iterative improvement insertion
IG.prototype.iterativeImprovementInsertion = function(pi) {

    // Variables
    var pi$, piB, improve, sequence, value, minSequence, minValue, random, position;

    // Initialization
    pi$ = Helper.clone(pi);
    piB = Helper.clone(pi);
    improve = true;

    // Repeat until improvement fails
    while(improve) {
        improve = false;
        sequence = Helper.clone(piB);
        value = IG.prototype.makespan(sequence);
        minSequence = sequence;
        minValue = value;
        while(pi$.length > 0) {
            random = Math.floor((Math.random() * pi$.length)) + 1;
            position = Helper.position(sequence, Helper.get(pi$, random));
            for(var i = position; i < piB.length; i++) {
                sequence = Helper.toggle(sequence, i, i + 1);
                value = IG.prototype.makespan(sequence);
                if(value < minValue) {
                    minSequence = sequence;
                    minValue = value;
                }
            }
            sequence = Helper.toggle(sequence, piB.length, 1);
            value = IG.prototype.makespan(sequence);
            minSequence = sequence;
            minValue = value;
            for(var j = 1; j < position - 1; j++) {
                sequence = Helper.toggle(sequence, j, j + 1);
                value = IG.prototype.makespan(sequence);
                if(value < minValue) {
                    minSequence = sequence;
                    minValue = value;
                }
            }
            if(IG.prototype.makespan(minSequence) < IG.prototype.makespan(piB)) {
                piB = minSequence;
                improve = true;
            }
            pi$ = Helper.remove(pi$, random);
        }
    }
    return piB;
};

// Iterated Greedy heuristic
IG.prototype.apply = function(data) {

    // Variables
    var pi, piB, piR, pi$, pi$$, random, item, sequence, value, minSequence, minValue;

    // Initialization
    pi = IG.prototype.initializationNEH(data);
    pi = IG.prototype.iterativeImprovementInsertion(pi);
    piB = Helper.clone(pi);

    // Reset timer
    Timer.reset();

    // Repeat until termination time is reached
    while(Timer.diff(false) < IG.prototype.termination(data)) {

        // Destruction phase
        piR = [];
        pi$ = Helper.clone(pi);
        for(var i = 1; i <= Math.min(IG.prototype.d, pi$.length); i++) {
            random = Math.floor((Math.random() * pi$.length)) + 1;
            item = Helper.get(pi$, random);
            pi$ = Helper.remove(pi$, random);
            piR = Helper.insertAfter(piR, piR.length, item);
        }

        // Construction phase
        for(var j = 1; j <= piR.length; j++) {
            sequence = Helper.insertBefore(pi$, 1, Helper.get(piR, j));
            value = IG.prototype.makespan(sequence);
            minSequence = sequence;
            minValue = value;
            for(var k = 1; k < piR.length; k++) {
                sequence = Helper.toggle(sequence, j, j + 1);
                value = IG.prototype.makespan(sequence);
                if(value < minValue) {
                    minSequence = sequence;
                    minValue = value;
                }
            }
            pi$ = minSequence;
        }

        // Local search
        pi$$ = IG.prototype.iterativeImprovementInsertion(pi$);

        // Acceptance criterion
        if(IG.prototype.makespan(pi$$) < IG.prototype.makespan(pi)) {
            pi = pi$$;

            // Check if new best permutation
            if(IG.prototype.makespan(pi) < IG.prototype.makespan(piB)) {
                piB = pi;
            }
        } else if(Math.random() <=
            Math.exp(-(IG.prototype.makespan(pi$$) - IG.prototype.makespan(pi)) / IG.prototype.temperature(data))) {
            pi = pi$$;
        }

    }
    return piB;
};
exports.apply = IG.prototype.apply;
