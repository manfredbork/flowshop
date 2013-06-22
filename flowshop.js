function Flowshop() {
}
module.exports = Flowshop;

/*--------------------------------------------------------------*/
/* Implementation of makespan can be reused in every algorithm
/*--------------------------------------------------------------*/
Flowshop.prototype.makespan = function(data) {
    var grid = [], ord = this.order(data);
    for(var i = 0; i < ord.length; i++) {
        grid[i] = [];
        for(var j = 0; j < data.numberOfMachines; j++) {
            grid[i][j] = Math.max((grid[i - 1] || [])[j] || 0, (grid[i] || [])[j - 1] || 0)
                + data.processingTime[j][ord[i] - 1];
        }
    }
    return (grid[ord.length - 1] || [])[data.numberOfMachines - 1] || 0;
};

/*--------------------------------------------------------------*/
/* Implementation of specific algorithm should overwrite order
/*--------------------------------------------------------------*/
Flowshop.prototype.order = function(data) {
    var ord = [];
    for(var i = 0; i < data.numberOfJobs; i++) {
        ord[i] = i + 1;
    }
    return ord;
};
