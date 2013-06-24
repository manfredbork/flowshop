var sets = require('./../taillard');
var NEH = require('./../neh');

/*--------------------------------------------------------*/
/* Iterate over Taillard sets with 20 jobs and 5 machines
/*--------------------------------------------------------*/
var filteredSets = sets.filter(20, 5);
for(var i = 0; i < filteredSets.length; i++) {

    console.log('     number of jobs:', filteredSets[i].numberOfJobs);
    console.log(' number of machines:', filteredSets[i].numberOfMachines);
    console.log('       initial seed:', filteredSets[i].initialSeed);
    console.log('        upper bound:', filteredSets[i].upperBound);
    console.log('        lower bound:', filteredSets[i].lowerBound);
    console.log('       NEH makespan:', NEH.makespan(filteredSets[i].data));
    console.log('__________________________________________________');

}
