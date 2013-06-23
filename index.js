var T = require('./taillard');
var A = require('./algorithm');

/*--------------------------------------------------------*/
/* Iterate over each Taillard set and call makespan
/*--------------------------------------------------------*/
for(var i = 0; i < T.length; i++) {

    console.log('     number of jobs:', T[i].numberOfJobs);
    console.log(' number of machines:', T[i].numberOfMachines);
    console.log('       initial seed:', T[i].initialSeed);
    console.log('        upper bound:', T[i].upperBound);
    console.log('        lower bound:', T[i].lowerBound);
    console.log('           makespan:', A.makespan(T[i].data));
    console.log('__________________________________________________');

}
