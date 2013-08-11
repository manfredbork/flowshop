// Helper library related to PFSP
function Helper() {
}

// T parameter
Helper.prototype.T = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5];
exports.T = Helper.prototype.T;

// d parameter
Helper.prototype.d = [2, 3, 4, 5, 6, 7, 8];
exports.d = Helper.prototype.d;

// Relative percentage deviation
Helper.prototype.rpd = function(some, best, digits) {
    var deviation = ((some - best) / best) * 100;
    if(digits) {
        return Math.floor(deviation * Math.pow(10, digits)) / Math.pow(10, digits);
    } else {
        return deviation;
    }
};
exports.rpd = Helper.prototype.rpd;

// Check if data is two dimensional array
Helper.prototype.isValidData = function(data) {
    return (data && data.length === 0) || (data && data.length > 0 && (data[data.length - 1] || []).length > 0);
};
exports.isValidData = Helper.prototype.isValidData;

// Makespan implementation
Helper.prototype.makespan = function(data) {
    if(!Helper.prototype.isValidData(data)) {
        return 0;
    }
    var grid = [];
    for(var i = 0; i < data.length; i++) {
        grid[i] = [];
        for(var j = 0; j < data[i].length ; j++) {
            grid[i][j] = Math.max((grid[i - 1] || [])[j] || 0, (grid[i] || [])[j - 1] || 0) + data[i][j];
        }
    }
    return grid[data.length - 1][data[data.length - 1].length - 1];
};
exports.makespan = Helper.prototype.makespan;

// Temperature implementation
Helper.prototype.temperature = function(data, T) {
    var total = 0;
    for(var i = 0; i < data.length; i++) {
        total = total + Helper.prototype.sum(data[i]);
    }
    return T * (total / (data.length * data[data.length - 1].length * 10));
};
exports.temperature = Helper.prototype.temperature;

// Termination criterion implementation
Helper.prototype.criterion = function(data, ms) {
    return data.length * (data[data.length - 1].length / 2) * ms;
};
exports.criterion = Helper.prototype.criterion;

// Toggle specified values in array
Helper.prototype.toggle = function(data, firstPosition, secondPosition) {
    if(!Helper.prototype.isValidData(data)) {
        return data;
    }
    var clone = [].concat(data), value = clone[firstPosition - 1];
    clone[firstPosition - 1] = clone[secondPosition - 1];
    clone[secondPosition - 1] = value;
    return clone;
};
exports.toggle = Helper.prototype.toggle;

// Remove field in array
Helper.prototype.remove = function(data, position) {
    if(!Helper.prototype.isValidData(data)) {
        return data;
    }
    return data.slice(0, position - 1).concat(data.slice(position));
};
exports.remove = Helper.prototype.remove;

// Insert value after specified field in array
Helper.prototype.insertAfter = function(data, position, value) {
    if(!Helper.prototype.isValidData(data)) {
        return data;
    }
    return data.slice(0, position).concat([value]).concat(data.slice(position));
};
exports.insertAfter = Helper.prototype.insertAfter;

// Insert value before specified field in array
Helper.prototype.insertBefore = function(data, position, value) {
    if(!Helper.prototype.isValidData(data)) {
        return data;
    }
    return Helper.prototype.insertAfter(data, position - 1, value);
};
exports.insertBefore = Helper.prototype.insertBefore;

// Get value from specified field in array
Helper.prototype.get = function(data, position) {
    if(!Helper.prototype.isValidData(data)) {
        return data;
    }
    return [].concat(data[position - 1]);
};
exports.get = Helper.prototype.get;

// Get position of item in array
Helper.prototype.position = function(data, item) {
    for(var i = 0; i < data.length; i++) {
        var compareItem = Helper.prototype.get(data, i + 1);
        if(Helper.prototype.equal(item, compareItem)) {
            return i + 1;
        }
    }
    return 0;
};
exports.position = Helper.prototype.position;

// Check if two arrays are equal
Helper.prototype.equal = function(a, b) {
    if(a && b && a.length && b.length) {
        return a.join('') === b.join('');
    }
    return false;
};
exports.equal = Helper.prototype.equal;

// Sort data in descending order
Helper.prototype.sort = function(data) {
    if(!Helper.prototype.isValidData(data)) {
        return data;
    }
    return [].concat(data).sort(comparator);
};
exports.sort = Helper.prototype.sort;

function comparator(a, b) {
    if(sum(a) > sum(b)) {
        return -1;
    }
    return 1;
}

// Sum values of fields in array
Helper.prototype.sum = function(data) {
    return sum(data);
};
exports.sum = Helper.prototype.sum;

function sum(data) {
    var sum = 0;
    for(var i = 0; i < (data || []).length; i++) {
        sum = sum + (data[i] || 0);
    }
    return sum;
}
