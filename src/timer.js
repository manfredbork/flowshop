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

var Timer = function () {
    this.init();
};

/**
 * Timer to measure time differences and elapsed time
 *
 * @module Timer
 * @class Timer
 * @api
 */

Timer.prototype = {

    /**
     * Initializes timer
     *
     * @method init
     */

    init: function () {
        this.E = process.hrtime();
    },

    /**
     * Reads time since timer is initialized
     *
     * @method elapsedTime
     * @param {String} format Time format
     * @return {String} Formatted time
     */

    elapsedTime: function (format) {
        return this._formatTime(this._elapsedTimeInMilliseconds(), format);
    },

//////////////////////////////// Private Timer methods /////////////////////////////////

    /**
     * Formats time
     *
     * @method _formatTime
     * @param {Number} time Time in milliseconds
     * @param {String} format Time format
     * @return {String} Formatted time
     * @private
     */

    _formatTime: function (time, format) {
        var date = new Date(time);
        var hh = date.getUTCHours();
        var mm = date.getUTCMinutes();
        var ss = date.getUTCSeconds();
        var sss = date.getUTCMilliseconds();
        if (format === 'hh:mm:ss') {
            return hh + ':' + this._zeroPad(mm, 2) + ':' + this._zeroPad(ss, 2);
        } else if (format === 'mm:ss') {
            return (hh * 60 + mm) + ':' + this._zeroPad(ss, 2);
        } else if (format === 'mm:ss.sss') {
            return (hh * 60 + mm) + ':' + this._zeroPad(ss, 2) + '.' + sss;
        } else if (format === 'ss.sss') {
            return (hh * 3600 + mm * 60 + ss) + '.' + sss;
        } else if (format === 'ms') {
            return (hh * 3600000 * mm * 60000 + ss * 1000 + sss) + '';
        } else {
            return hh + ':' + this._zeroPad(mm, 2) + ':' + this._zeroPad(ss, 2) + '.' + sss;
        }
    },

    /**
     * Adds leading zeros to number
     *
     * @method _zeroPad
     * @param {Number} n Number
     * @param {Number} len Length
     * @return {String} Number with leading zeros
     * @private
     */

    _zeroPad: function (n, len) {
        var output = '' + n;
        while (output.length < len) {
            output = '0' + output;
        }
        return output;
    },

    /**
     * Reads time since timer is initialized
     *
     * @method _elapsedTimeInMilliseconds
     * @return {Number} Milliseconds
     * @private
     */

    _elapsedTimeInMilliseconds: function () {
        var init = this.E;
        var now = process.hrtime();
        return Math.floor((now[0] - init[0]) * 1000 + (now[1] - init[1]) / 1000000);
    }
};

// export the module
module.exports = Timer;
