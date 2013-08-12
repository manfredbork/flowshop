// Implementing algorithm should inherit from Flowshop
function Flowshop() {
}
module.exports = Flowshop;//

// Relative percentage deviation
Flowshop.prototype.rpd = function(some, best) {
    return ((some - best) / best) * 100;
};

// Makespan implementation
Flowshop.prototype.makespan = function(data) {
    var grid = [];
    for(var i = 0; i < data.length; i++) {
        grid[i] = [];
        for(var j = 0; j < data[i].length ; j++) {
            grid[i][j] = Math.max((grid[i - 1] || [])[j] || 0, (grid[i] || [])[j - 1] || 0) + data[i][j];
        }
    }
    return grid[grid.length - 1][grid[grid.length - 1].length - 1];
};

// Implementing algorithm should overwrite order
Flowshop.prototype.apply = function(data) {
    return data;
};
