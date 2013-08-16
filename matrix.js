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

// ext. libs
var util = require('util');

/**
 * @param {Number} columns Number of columns
 * @param {Number} rows Number of rows
 * @constructor
 */

var Matrix = function (columns, rows) {
    this.M = [];
    for(var i = 0; i < columns; i++) {
        this.M[i] = [];
        for(var j = 0; j < rows; j++) {
            this.M[i][j] = 0;
        }
    }
};

/**
 * Two dimensional matrix
 *
 * @module Matrix
 * @class Matrix
 * @api
 */

Matrix.prototype = {

    /**
     * Returns clone of matrix
     *
     * @method clone
     * @return {Array} matrix Matrix clone
     */

    clone: function () {
        return [].concat(this.M);
    },

    /**
     * Writes row of values to matrix
     *
     * @method writeRow
     * @param {Number} row Position of row
     * @param {Array} data Data to write
     */

    writeRow: function (row, data) {
        if (util.isArray(data)) {
            if (row > 0 && row <= this.M[this.M.length - 1].length && data.length === this.M.length) {
                for(var i = 0; i < this.M.length; i++) {
                    this.M[i][row - 1] = data[i];
                }
            }
        }
    },

    /**
     * Toggles two columns within matrix
     *
     * @method toggleColumns
     * @param {Number} column1 Position of 1st column
     * @param {Number} column2 Position of 2nd column
     */

    toggleColumns: function (column1, column2) {
        if (column1 > column2) {
            column1 = column1 ^ column2;
            column2 = column1 ^ column2;
            column1 = column1 ^ column2;
        }
        if (this._validColumn(column1) && this._validColumn(column2)) {
            this.M = []
                .concat(this.M.slice(0, column1 - 1))
                .concat([this.M[column2 - 1]])
                .concat(this.M.slice(column1, column2 - 1))
                .concat([this.M[column1 - 1]])
                .concat(this.M.slice(column2));
        }
    },

    /**
     * Insert column into matrix
     *
     * @method insertColumn
     * @param {Number} column Insertion position
     * @param {Array} data Column data
     */

    insertColumn: function (column, data) {
        if (util.isArray(data)) {
            if (column >= 0 && column <= this.M.length && data.length === this.M[this.M.length - 1].length) {
                this.M = []
                    .concat(this.M.slice(0, column))
                    .concat([data])
                    .concat(this.M.slice(column));
            }
        }
    },

    /**
     * Checks if position of column is valid
     *
     * @method _validColumn
     * @param {Number} column Position of column
     * @private
     */

    _validColumn: function (column) {
        return column > 0 && column <= this.M.length;
    }
};

// export the module
module.exports = Matrix;
