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

// import
var Matrix = require('./matrix');

/**
 * @constructor
 */

var NEH = function () {
};

/**
 * NEH algorithm by Nawaz, Enscore, Ham
 *
 * @module NEH
 * @class NEH
 * @api
 */

NEH.prototype = {

    /**
     * Runs NEH algorithm
     *
     * @method run
     * @param {Matrix} T Taillard data
     * @return {Matrix} Taillard data after permutation
     */

    run: function (T) {

        // Definitions
        var PI, PIbest, PIseq, PIval, PIminseq, PIminval;

        // Sort descending
        PI = T.clone().sort();

        // Initialization
        PIbest = new Matrix(0, PI.dim());
        PIbest.insert(0, PI.read(1)).insert(0, PI.read(2));
        if(PIbest.makespan() > PIbest.clone().toggle(1, 2).makespan()) {
            PIbest.toggle(1, 2);
        }

        // Find best inserts
        for(var i = 3; i <= PI.len(); i++) {
            PIseq = PIbest.clone().insert(0, PI.read(i));
            PIval = PIseq.makespan();
            PIminseq = PIseq.clone();
            PIminval = PIval;
            for(var j = 1; j < PIseq.len(); j++) {
                PIseq.toggle(j, j + 1);
                PIval = PIseq.makespan();
                if(PIval < PIminval) {
                    PIminseq = PIseq.clone();
                    PIminval = PIval;
                }
            }
            PIbest = PIminseq;
        }
        return PIbest;
    }
};

// export the module
module.exports = NEH;
