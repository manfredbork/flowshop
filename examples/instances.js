var instances = require('./../taillard');
var NEH = require('./../neh');

/*--------------------------------------------------------*/
/* Iterate over filtered Taillard instances
/*--------------------------------------------------------*/
var filteredInstances = instances.filter(50, 20);
for(var i = 0; i < filteredInstances.length; i++) {

    console.log('               name:', filteredInstances[i].name);
    console.log('     number of jobs:', filteredInstances[i].numberOfJobs);
    console.log(' number of machines:', filteredInstances[i].numberOfMachines);
    console.log('       initial seed:', filteredInstances[i].initialSeed);
    console.log('        lower bound:', filteredInstances[i].lowerBound);
    console.log('        upper bound:', filteredInstances[i].upperBound);
    console.log('       NEH makespan:', NEH.makespan(filteredInstances[i].data));
    console.log('__________________________________________________');

}
