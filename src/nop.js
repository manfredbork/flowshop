'use strict';

// imports
var Matrix = require('./matrix');

/**
 * @constructor
 */

var NOP = function () {
};

/**
 * Use this file as template to implement
 * own alternative flow shop algorithm.
 *
 * For example to execute this file set
 * parameter alt=./src/nop on command-line.
 *
 * @module NOP
 * @class NOP
 * @api
 */

NOP.prototype = {

    /**
     * Runs NOP algorithm
     *
     * @method run
     * @param {Matrix} T Taillard data
     * @return {Matrix} Taillard data after permutation
     */

    run: function (T) {

        // Clone Taillard data
        var PI = T.clone();

        /**
         * Place here your own implementation
         * @see matrix
         * @see neh
         * @see ig
         */

        return PI;
    }
};

// export the module
module.exports = NOP;
