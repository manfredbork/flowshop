var T = require('./taillard');
var NOP = require('./nop');

/*--------------------------------------------------------------*/
/* Iterate over each Taillard set and call makespan
/*--------------------------------------------------------------*/
for(var i = 0; i < T.length; i++) {

    console.log('     number of jobs:', T[i].numberOfJobs);
    console.log(' number of machines:', T[i].numberOfMachines);
    console.log('       initial seed:', T[i].initialSeed);
    console.log('        upper bound:', T[i].upperBound);
    console.log('        lower bound:', T[i].lowerBound);
    console.log('           makespan:', NOP.makespan(T[i]));
    console.log('__________________________________________________');

}
