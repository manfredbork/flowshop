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
     * Writes row into matrix
     *
     * @method write
     * @param {Number} row Position of row
     * @param {Array} data Row data
     * @chainable
     */

    write: function (row, data) {
        if (this._validRow(row) && this._validRowData(data)) {
            for(var i = 0; i < this.len(); i++) {
                this.M[i][row - 1] = data[i];
            }
        }
        return this;
    },

    /**
     * Toggles two columns within matrix
     *
     * @method toggle
     * @param {Number} column1 Position of column one
     * @param {Number} column2 Position of column two
     * @chainable
     */

    toggle: function (column1, column2) {
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
        return this;
    },

    /**
     * Inserts column into matrix
     *
     * @method insert
     * @param {Number} column Position of insert
     * @param {Array} data Column data
     * @chainable
     */

    insert: function (column, data) {
        if (this._validColumnData(data) && this._validColumn(column)) {
            this.M = []
                .concat(this.M.slice(0, column))
                .concat([data])
                .concat(this.M.slice(column));
        } else if (util.isArray(data)) {
            this.M = []
                .concat([data])
                .concat(this.M);
        }
        return this;
    },

    /**
     * Removes column from matrix
     *
     * @method remove
     * @param {Number} column Position of column
     * @chainable
     */

    remove: function (column) {
        if (this._validColumn(column)) {
            this.M = []
                .concat(this.M.slice(0, column - 1))
                .concat(this.M.slice(column));
        }
        return this;
    },

    /**
     * Clones matrix
     *
     * @method clone
     * @return {Matrix} Matrix clone
     */

    clone: function () {
        var matrix = new Matrix(this.len(), this.dim());
        matrix.M = [].concat(this.M);
        return matrix;
    },

    /**
     * Reads column from matrix
     *
     * @method read
     * @param {Number} column Position of column
     * @return {Array} Values
     */

    read: function (column) {
        if (this._validColumn(column)) {
            return this.M[column - 1];
        } else {
            return [];
        }
    },

    /**
     * Returns length of matrix
     *
     * @method len
     * @return {Number} Number of columns
     */

    len: function () {
        return this.M.length;
    },

    /**
     * Returns dimension of matrix
     *
     * @method dim
     * @return {Number} Number of rows
     */

    dim: function () {
        if (this.len() > 0) {
            return this.M[this.M.length - 1].length;
        } else {
            return 0;
        }
    },

////////////////////////////// Special Scheduling methods //////////////////////////////

    /**
     * Sums column values of matrix
     *
     * @method sum
     * @param {Number} column Position of column
     * @return {Number} Sum of column values
     */

    sum: function (column) {
        if (this._validColumn(column)) {
            return this._internalSum(this.M[column - 1]);
        } else {
            return 0;
        }
    },

    /**
     * Makespan of matrix
     *
     * @method makespan
     * @return {Number} Makespan value
     */

    makespan: function () {
        var matrix = new Matrix(this.len(), this.dim());
        for(var i = 1; i <= matrix.len(); i++) {
            for(var j = 1; j <= matrix.dim(); j++) {
                var maxValue = Math.max(matrix._readValue(i - 1, j), matrix._readValue(i, j - 1));
                    matrix._writeValue(i, j, maxValue + this._readValue(i, j));
            }
        }
        return matrix._readValue(this.len(), this.dim());
    },

    /**
     * Sorts columns by default comparator
     *
     * @method sort
     * @chainable
     */

    sort: function () {
        this.M = this.M.sort(this._defaultComparator.bind(this));
        return this;
    },

    /**
     * Gets or sets permutation of matrix
     *
     * @method permutation
     * @param {Matrix|Array} data Data
     * @return {Matrix|Array} Data
     */

    permutation: function (data) {
        if (util.isArray(data) && this.M.length === data.length) {
            var matrix = this.clone();
            for(var i = 0; i < data.length; i++) {
                this.M[i] = matrix.M[data[i]];
            }
        } else if (data instanceof Matrix) {
            var permutation = [];
            for(var j = 0; j < data.len(); j++) {
                permutation[j] = this.position(data[j]);
            }
            return permutation;
        }
        return this;
    },

    /**
     * Gets position of column data within matrix
     *
     * @method position
     * @param {Array} data Column data
     * @return {Number} Position of column
     */

    position: function (data) {
        for(var i = 0; i < this.len(); i++) {
            if (data.join() === this.M[i].join()) {
                return i + 1;
            }
        }
        return 0;
    },

//////////////////////////////// Private Matrix methods ////////////////////////////////

    /**
     * Reads value from matrix
     *
     * @method _readValue
     * @param {Number} column Position of column
     * @param {Number} row Position of row
     * @return {Number} Value
     * @private
     */

    _readValue: function (column, row) {
        if (this._validColumn(column) && this._validRow(row)) {
            return this.M[column - 1][row - 1];
        } else {
            return 0;
        }
    },

    /**
     * Writes value into matrix
     *
     * @method _writeValue
     * @param {Number} column Position of column
     * @param {Number} row Position of row
     * @param {Number} value Value
     * @private
     */

    _writeValue: function (column, row, value) {
        if (this._validColumn(column) && this._validRow(row)) {
            this.M[column - 1][row - 1] = value;
        }
    },

    /**
     * Compares and sorts two columns
     *
     * @method _defaultComparator
     * @param {Array} column1 Column data of column 1
     * @param {Array} column2 Column data of column 2
     * @return {Number} Comparator value
     * @private
     */

    _defaultComparator: function (column1, column2) {
        if (this._internalSum(column1) > this._internalSum(column2)) {
            return -1;
        } else {
            return 1;
        }
    },

    /**
     * Sums values of array
     *
     * @method _internalSum
     * @param {Array} data Values
     * @return {Number} Sum of values
     * @private
     */

    _internalSum: function (data) {
        var sum = 0;
        for(var i = 0; i < data.length; i++) {
            sum = sum + data[i];
        }
        return sum;
    },

    /**
     * Checks if data is valid row data
     *
     * @method _validRowData
     * @param {Array} data Row data
     * @return {Boolean} Valid row data
     * @private
     */

    _validRowData: function (data) {
        return util.isArray(data) && data.length === this.len();
    },

    /**
     * Checks if data is valid column data
     *
     * @method _validColumnData
     * @param {Array} data Column data
     * @return {Boolean} Valid column data
     * @private
     */

    _validColumnData: function (data) {
        return util.isArray(data) && data.length === this.dim();
    },

    /**
     * Checks if position of row is valid
     *
     * @method _validRow
     * @param {Number} row Position of row
     * @private
     */

    _validRow: function (row) {
        return row > 0 && row <= this.dim();
    },

    /**
     * Checks if position of column is valid
     *
     * @method _validColumn
     * @param {Number} column Position of column
     * @private
     */

    _validColumn: function (column) {
        return column > 0 && column <= this.len();
    }
};

// export the module
module.exports = Matrix;
