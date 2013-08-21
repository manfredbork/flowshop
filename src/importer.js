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
var fs = require('fs');
var Matrix = require('./Matrix');

/**
 * @constructor
 */

var Importer = function () {
};

/**
 * Import Taillard instances
 *
 * @module Importer
 * @class Importer
 * @api
 */

Importer.prototype = {

    // Instance variables
    cacheMeta: [],
    cacheMatrix: [],
    fileMapping: {
        'ta001': ['ta001', 'ta002', 'ta003', 'ta004', 'ta005', 'ta006', 'ta007', 'ta008', 'ta009', 'ta010'],
        'ta011': ['ta011', 'ta012', 'ta013', 'ta014', 'ta015', 'ta016', 'ta017', 'ta018', 'ta019', 'ta020'],
        'ta021': ['ta021', 'ta022', 'ta023', 'ta024', 'ta025', 'ta026', 'ta027', 'ta028', 'ta029', 'ta030'],
        'ta031': ['ta031', 'ta032', 'ta033', 'ta034', 'ta035', 'ta036', 'ta037', 'ta038', 'ta039', 'ta040'],
        'ta041': ['ta041', 'ta042', 'ta043', 'ta044', 'ta045', 'ta046', 'ta047', 'ta048', 'ta049', 'ta050'],
        'ta051': ['ta051', 'ta052', 'ta053', 'ta054', 'ta055', 'ta056', 'ta057', 'ta058', 'ta059', 'ta060'],
        'ta061': ['ta061', 'ta062', 'ta063', 'ta064', 'ta065', 'ta066', 'ta067', 'ta068', 'ta069', 'ta070'],
        'ta071': ['ta071', 'ta072', 'ta073', 'ta074', 'ta075', 'ta076', 'ta077', 'ta078', 'ta079', 'ta080'],
        'ta081': ['ta081', 'ta082', 'ta083', 'ta084', 'ta085', 'ta086', 'ta087', 'ta088', 'ta089', 'ta090'],
        'ta091': ['ta091', 'ta092', 'ta093', 'ta094', 'ta095', 'ta096', 'ta097', 'ta098', 'ta099', 'ta100'],
        'ta101': ['ta101', 'ta102', 'ta103', 'ta104', 'ta105', 'ta106', 'ta107', 'ta108', 'ta109', 'ta110'],
        'ta111': ['ta111', 'ta112', 'ta113', 'ta114', 'ta115', 'ta116', 'ta117', 'ta118', 'ta119', 'ta120']
    },

    /**
     * Loads Taillard matrix data
     *
     * @method loadMatrixData
     * @param {String} name Taillard instance name
     * @return {Matrix} Taillard matrix data
     */

    loadMatrixData: function (name) {
        if (!this.cacheMatrix[name]) {
            this._loadData(name);
        }
        return this.cacheMatrix[name];
    },

    /**
     * Loads Taillard meta data
     *
     * @method loadMetaData
     * @param {String} name Taillard instance name
     * @return {Object} Taillard meta data
     */

    loadMetaData: function (name) {
        if (!this.cacheMeta[name]) {
            this._loadData(name);
        }
        return this.cacheMeta[name];
    },

//////////////////////////////// Private Import methods ////////////////////////////////

    /**
     * Loads Taillard data from file
     *
     * @method loadData
     * @param {String} name Taillard instance name
     * @private
     */

    _loadData: function (name) {
        var raw = [];
        var file = this._fileName(name);
        try {
            raw = fs.readFileSync('taillard/' + file).toString()
                    .split(String.fromCharCode(13) + String.fromCharCode(10));
        } catch (err) {
        }
        var parsed = [];
        for(var i = 0; i < raw.length; i++) {
            var values = this._trim(raw[i]).split(/[^0-9]+/);
            if (values.join('') !== '') {
                for(var j = 0; j < values.length; j++) {
                    values[j] = Number(values[j]);
                }
                parsed.push(values);
            }
        }
        var k = 0;
        var l = 1;
        for(var m = 0; m < parsed.length; m++) {
            var alias = this.fileMapping[file];
            if (parsed[m].length === 5) {
                l = 1;
                this.cacheMeta[alias[k]] = {
                    name: alias[k],
                    jobs: parsed[m][0] + '',
                    machines: parsed[m][1] + '',
                    initialSeed: parsed[m][2] + '',
                    upperBound: parsed[m][3] + '',
                    lowerBound: parsed[m][4] + ''
                };
                this.cacheMatrix[alias[k++]] = new Matrix(parsed[m][0], parsed[m][1]);
            } else {
                this.cacheMatrix[alias[k - 1]].write(l++, parsed[m]);
            }
        }
    },

    /**
     * Returns file name from Taillard instance name
     *
     * @method _fileName
     * @param {String} name Taillard instance name
     * @return {String} File name
     * @private
     */

    _fileName: function (name) {
        for(var file in this.fileMapping) {
            if (this.fileMapping.hasOwnProperty(file)) {
                for(var i = 0; i < this.fileMapping[file].length; i++) {
                    if (this.fileMapping[file][i] === name) {
                        return file;
                    }
                }
            }
        }
        return String.fromCharCode(0);
    },

    /**
     * Trims input
     *
     * @method _trim
     * @param {String} input Input
     * @private
     */

    _trim: function (input) {
        return input.replace(/^\s+|\s+$/g,'');
    }
};

// export the module
module.exports = Importer;
