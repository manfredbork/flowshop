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

var Formatter = function () {
};

/**
 * Formatter adding spaces and colors
 *
 * @module Formatter
 * @class Formatter
 * @api
 */

Formatter.prototype = {

    reset: '\x1b[0m',
    fgBlack: '\x1b[30m',
    fgRed: '\x1b[31m',
    fgGreen: '\x1b[32m',
    fgYellow: '\x1b[33m',
    fgBlue: '\x1b[34m',
    fgMagenta: '\x1b[35m',
    fgCyan: '\x1b[36m',
    fgWhite: '\x1b[37m',
    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m',

    /**
     * Formats text to colored and centered version
     *
     * @method format
     * @param {String} text Text
     * @param {String} fgColor Text foreground color
     * @param {String} bgColor Text background color
     * @param {Number} totalChars Number of total chars
     * @param {Boolean} textCentered Align text to center
     * @return {String} Formatted text
     */

    format: function (text, fgColor, bgColor, totalChars, textCentered) {
        if (textCentered === true) {
            var left = Math.floor((totalChars - text.length) / 2) + text.length;
            return fgColor + bgColor + this._spacePad(this._spacePad(text, left, true), totalChars, false) + this.reset;
        } else {
            return fgColor + bgColor + this._spacePad(text, totalChars, false) + this.reset;
        }
    },

    /**
     * Adds leading spaces to text
     *
     * @method offset
     * @param {String} text Text
     * @param {Number} leadingSpaces Number of leading spaces
     * @return {String} Formatted text
     */

    offset: function (text, leadingSpaces) {
        return this._spacePad(text, text.length + leadingSpaces, true);
    },

//////////////////////////////// Private Formatter methods /////////////////////////////////

    /**
     * Adds spaces to text
     *
     * @method _spacePad
     * @param {String} text Text
     * @param {Number} len Length
     * @param {Boolean} prepend Prepend spaces
     * @return {String} Text with spaces
     * @private
     */

    _spacePad: function (text, len, prepend) {
        var output = '' + text;
        while (output.length < len) {
            if (prepend === true) {
                output = ' ' + output;
            } else {
                output = output + ' ';
            }
        }
        return output;
    }
};

// export the module
module.exports = Formatter;
