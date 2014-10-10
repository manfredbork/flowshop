/*!
 *
 * Copyright (c) 2013 Manfred Bork
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

'use strict';

// imports
var Matrix = require('./matrix');
var Timer = require('./timer');
var NEH = require('./neh');

/**
 * @constructor
 */

var IG = function () {
};

/**
 * Iterated Greedy algorithm
 *
 * @module IG
 * @class IG
 * @api
 */

IG.prototype = {

    // Instance variables
    ms: 60,
    d: 4,
    T: 0.4,

    /**
    * Calculates termination time
    *
    * @method terminationTime
    * @param {Matrix} T Taillard data
    * @return {Number} Time in milliseconds
    */

    terminationTime: function (T) {
        return T.len() * (T.dim() / 2) * this.ms;
    },

    /**
     * Calculates temperature value
     *
     * @method temperatureValue
     * @param {Matrix} T Taillard data
     * @return {Number} Value
     */

    temperatureValue: function (T) {
        var total = 0;
        for(var i = 1; i <= T.len(); i++) {
            total = total + T.sum(i);
        }
        return this.T * (total / (T.len() * T.dim() * 10));
    },

    /**
     * Runs NEH algorithm
     *
     * @method initNEH
     * @param {Matrix} T Taillard data
     * @return {Matrix} Taillard data after permutation
     */

    initNEH: function (T) {
        var neh = new NEH();
        return neh.run(T);
    },

    /**
     * Runs iterative improvement insertion
     *
     * @method improvementInsertion
     * @param {Matrix} T Taillard data
     * @return {Matrix} Taillard data after permutation
     */

    improvementInsertion: function (T) {

        // Definitions
        var PI, PIi, PIbest, PIimprove, PIseq, PIval, PIminseq, PIminval, PIrand, PIpos;

        // Initialization
        PI = T.clone();
        PIi = PI.clone();
        PIbest = PI.clone();
        PIimprove = true;

        // Repeat until improvement fails
        while (PIimprove) {
            PIimprove = false;
            PIseq = PIbest.clone();
            PIval = PIseq.makespan();
            PIminseq = PIseq.clone();
            PIminval = PIval;
            while (PIi.len() > 0) {
                PIrand = Math.floor(Math.random() * PIi.len()) + 1;
                PIpos = PIseq.position(PIi.read(PIrand));
                for(var i = PIpos; i < PIbest.len(); i++) {
                    PIseq.toggle(i, i + 1);
                    PIval = PIseq.makespan();
                    if (PIval < PIminval) {
                        PIminseq = PIseq.clone();
                        PIminval = PIval;
                    }
                }
                PIseq.toggle(PIbest.len(), 1);
                PIval = PIseq.makespan();
                PIminseq = PIseq.clone();
                PIminval = PIval;
                for(var j = 1; j < PIpos - 1; j++) {
                    PIseq.toggle(j, j + 1);
                    PIval = PIseq.makespan();
                    if (PIval < PIminval) {
                        PIminseq = PIseq.clone();
                        PIminval = PIval;
                    }
                }
                if (PIminseq.makespan() < PIbest.makespan()) {
                    PIbest = PIminseq.clone();
                    PIimprove = true;
                }
                PIi.remove(PIrand);
            }
        }
        return PIbest;
    },

    /**
     * Runs IG algorithm
     *
     * @method run
     * @param {Matrix} T Taillard data
     * @return {Matrix} Taillard data after permutation
     */

    run: function (T) {

        // Definitions
        var PI, PIbest, PItimer, PIr, PIi, PIrand, PIitem, PIseq, PIval, PIminseq, PIminval, PIii;

        // Initialization
        PI = T.clone();
        PI = this.initNEH(PI);
        PI = this.improvementInsertion(PI);
        PIbest = PI.clone();

        // Initialize timer
        PItimer = new Timer();

        // Repeat until termination time is reached
        while (PItimer.elapsedTime('ms') < this.terminationTime(T)) {

            // Destruction phase
            PIr = new Matrix(0, PI.dim());
            PIi = PI.clone();
            for(var i = 1; i <= this.d; i++) {
                PIrand = Math.floor(Math.random() * PI.len()) + 1;
                PIitem = PIi.read(PIrand);
                PIi.remove(PIrand);
                PIr.insert(PIr.len(), PIitem);
            }

            // Construction phase
            for(var j = 1; j <= PIr.len(); j++) {
                PIseq = PIi.clone().insert(0, PIr.read(j));
                PIval = PIseq.makespan();
                PIminseq = PIseq.clone();
                PIminval = PIval;
                for(var k = 1; k < PIseq.len(); k++) {
                    PIseq.toggle(k, k + 1);
                    PIval = PIseq.makespan();
                    if (PIval < PIminval) {
                        PIminseq = PIseq.clone();
                        PIminval = PIval;
                    }
                }
                PIi = PIminseq;
            }

            // Local search
            PIii = this.improvementInsertion(PIi);

            // Acceptance criterion
            if (PIii.makespan() < PI.makespan()) {
                PI = PIii.clone();
                if (PI.makespan() < PIbest.makespan()) {
                    PIbest = PI.clone();
                }
            } else if (Math.random() <= Math.exp(-(PIii.makespan() - PI.makespan()) / this.temperatureValue(T))) {
                PI = PIii.clone();
            }
        }
        return PIbest;
    }
};

// export the module
module.exports = IG;
