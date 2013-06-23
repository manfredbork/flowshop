/*--------------------------------------------------------*/
/* Collection of helper functions
/*--------------------------------------------------------*/
function Helper() {
}
Helper.exports = Helper;

/*--------------------------------------------------------*/
/* Basic makespan implementation
/*--------------------------------------------------------*/
Helper.prototype.makespan = function(data) {
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
