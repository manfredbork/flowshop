/*--------------------------------------------------------*/
/* Collection of helper functions
/*--------------------------------------------------------*/
function Helper() {
}
Helper.exports = Helper;

/*--------------------------------------------------------*/
/* Check if data is two dimensional array
/*--------------------------------------------------------*/
Helper.prototype.isValidData = function(data) {
    return data && data.length > 0 && data[data.length - 1].length > 0;
};
exports.isValidData = Helper.prototype.isValidData;

/*--------------------------------------------------------*/
/* Basic makespan implementation
/*--------------------------------------------------------*/
Helper.prototype.makespan = function(data) {
    if(!Helper.prototype.isValidData(data)) {
        return 0;
    }
    var grid = [];
    for(var i = 0; i < data.length; i++) {
        grid[i] = [];
        for(var j = 0; j < data[i].length; j++) {
            grid[i][j] = Math.max((grid[i - 1] || [])[j] || 0, (grid[i] || [])[j - 1] || 0) + data[i][j];
        }
    }
    return grid[data.length - 1][data[data.length - 1].length - 1];
};
exports.makespan = Helper.prototype.makespan;

/*--------------------------------------------------------*/
/* Toggle specified values in array
/*--------------------------------------------------------*/
Helper.prototype.toggle = function(data, firstPosition, secondPosition) {
    if(!Helper.prototype.isValidData(data)) {
        return data;
    }
    var clone = data.slice(), value = clone[firstPosition - 1];
    clone[firstPosition - 1] = clone[secondPosition - 1];
    clone[secondPosition - 1] = value;
    return clone;
};
exports.toggle = Helper.prototype.toggle;

/*--------------------------------------------------------*/
/* Remove field in array
/*--------------------------------------------------------*/
Helper.prototype.remove = function(data, position) {
    if(!Helper.prototype.isValidData(data)) {
        return data;
    }
    return data.slice(0, position - 1).concat(data.slice(position));
};
exports.remove = Helper.prototype.remove;

/*--------------------------------------------------------*/
/* Insert value after specified field in array
/*--------------------------------------------------------*/
Helper.prototype.insertAfter = function(data, position, value) {
    if(!Helper.prototype.isValidData(data)) {
        return data;
    }
    return data.slice(0, position).concat([value]).concat(data.slice(position));
};
exports.insertAfter = Helper.prototype.insertAfter;

/*--------------------------------------------------------*/
/* Insert value before specified field in array
/*--------------------------------------------------------*/
Helper.prototype.insertBefore = function(data, position, value) {
    return Helper.prototype.insertAfter(data, position - 1, value);
};
exports.insertBefore = Helper.prototype.insertBefore;
