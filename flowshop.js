var Helper = require('./helper');

/*--------------------------------------------------------*/
/* Implementing algorithm should inherit from Flowshop
/*--------------------------------------------------------*/
function Flowshop() {
}
module.exports = Flowshop;

/*--------------------------------------------------------*/
/* Implementing algorithm should not overwrite makespan
/*--------------------------------------------------------*/
Flowshop.prototype.makespan = function(data, initialSeed) {
    return Helper.makespan(this.order(data, initialSeed));
};

/*--------------------------------------------------------*/
/* Implementing algorithm should overwrite order
/*--------------------------------------------------------*/
Flowshop.prototype.order = function(data, initialSeed) {
    return data;
};
