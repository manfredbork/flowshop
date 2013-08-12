// Helper library related to PFSP
function Helper() {
}

// Toggle specified values in array
Helper.prototype.toggle = function(data, firstPosition, secondPosition) {
    var clone = [].concat(data), value = clone[firstPosition - 1];
    clone[firstPosition - 1] = clone[secondPosition - 1];
    clone[secondPosition - 1] = value;
    return clone;
};
exports.toggle = Helper.prototype.toggle;

// Remove field in array
Helper.prototype.remove = function(data, position) {
    return data.slice(0, position - 1).concat(data.slice(position));
};
exports.remove = Helper.prototype.remove;

// Insert value after specified field in array
Helper.prototype.insertAfter = function(data, position, value) {
    return data.slice(0, position).concat([value]).concat(data.slice(position));
};
exports.insertAfter = Helper.prototype.insertAfter;

// Insert value before specified field in array
Helper.prototype.insertBefore = function(data, position, value) {
    return Helper.prototype.insertAfter(data, position - 1, value);
};
exports.insertBefore = Helper.prototype.insertBefore;

// Get value from specified field in array
Helper.prototype.get = function(data, position) {
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

// Array equal operator
Helper.prototype.equal = function(firstData, secondData) {
    return firstData.join('') === secondData.join('');
};
exports.equal = Helper.prototype.equal;

// Clone array
Helper.prototype.clone = function(data) {
    return [].concat(data);
};
exports.clone = Helper.prototype.clone;

// Sort data in descending order
Helper.prototype.sort = function(data) {
    return [].concat(data).sort(
        function(firstItem, secondItem) {
            if(Helper.prototype.sum(firstItem) > Helper.prototype.sum(secondItem)) {
                return -1;
            }
            return 1;
        }
    );
};
exports.sort = Helper.prototype.sort;

// Sum values of fields in array
Helper.prototype.sum = function(data) {
    var sum = 0;
    for(var i = 0; i < (data || []).length; i++) {
        sum = sum + (data[i] || 0);
    }
    return sum;
};
exports.sum = Helper.prototype.sum;
