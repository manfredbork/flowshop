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

/**
 * @constructor
 */

var Random = function () {
};

/**
 * Seedable random number generator
 *
 * @module Random
 * @class Random
 * @api
 */

Random.prototype = {

    /**
     * Sets initial seed
     *
     * @method initialSeed
     * @param {String} seed Initial seed
     */

    initialSeed: function (seed) {
        this.i = 0;
        this.j = 0;
        this.keystream = this._keystream(seed);
    },

    /**
     * Generates random number
     *
     * @method random
     * @return {Number} Number between 0 and 1
     */

    random: function () {
        if (!this.keystream) {
            this.initialSeed('seed');
        }
        return (this._randomByte() + this._randomByte() * 256 + this._randomByte() * 65536 +
                this._randomByte() * 16777216 + this._randomByte() * 4294967296 +
                this._randomByte() * 1099511627776 + this._randomByte() * 281474976710656 +
                this._randomByte() * 72057594037927940) / 18446744073709551616;
    },

//////////////////////////////// Private Random methods ////////////////////////////////

    /**
     * The key-scheduling algorithm
     *
     * @method _keystream
     * @param {String} key Key
     * @return {Array} Keystream
     */

    _keystream: function (key) {
        var S = [];
        var j = 0;
        for(var i = 0; i < 256; i++) {
            S[i] = i;
        }
        for(var k = 0; k < 256; k++) {
            var swap = S[k];
            j = (j + swap + key[k % key.length].charCodeAt(0)) % 256;
            S[k] = S[j];
            S[j] = swap;
        }
        return S;
    },

    /**
     * Generates random byte
     *
     * @method _randomByte
     * @return {Number} Random byte
     */

    _randomByte: function () {
        var swap = this.keystream[this.i];
        this.i = (this.i + 1) % 256;
        this.j = (this.j + swap) % 256;
        this.keystream[this.i] = this.keystream[this.j];
        this.keystream[this.j] = swap;
        return this.keystream[(this.keystream[this.i] + this.keystream[this.j]) % 256];
    }
};

// export the module
module.exports = Random;
