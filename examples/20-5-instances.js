var instances = require('./../taillard');
var seed = require('./../seed-random');
var Helper = require('./../helper');
var Timer = require('./../timer');
var NEH = require('./../neh');
var IG = require('./../ig');

// Filter Taillard instances by jobs and machines
var filteredInstances = instances.filter(20, 5);

// Reset timer
Timer.reset();

console.log('PROCESSING...');

// Iterate over filtered instances
for(var i = 0; i < filteredInstances.length; i++) {

    var initialSeed = filteredInstances[i].initialSeed;

    // Overwrite Math.random by number generator with seed
    seed(initialSeed, true);

    console.log('               NAME:', filteredInstances[i].name);
    console.log('     NUMBER OF JOBS:', filteredInstances[i].numberOfJobs);
    console.log(' NUMBER OF MACHINES:', filteredInstances[i].numberOfMachines);
    console.log('        LOWER BOUND:', filteredInstances[i].lowerBound);
    console.log('        UPPER BOUND:', filteredInstances[i].upperBound);

    var orderedNEH = NEH.order(filteredInstances[i].data);
    var orderedIG = IG.order(filteredInstances[i].data);

    console.log('       NEH MAKESPAN:', NEH.makespan(orderedNEH));
    console.log('        IG MAKESPAN:', IG.makespan(orderedIG));
    console.log('         RPD NEH UB:', Helper.rpd(NEH.makespan(orderedNEH), filteredInstances[i].upperBound, 2) + '%');
    console.log('          RPD IG UB:', Helper.rpd(IG.makespan(orderedIG), filteredInstances[i].upperBound, 2) + '%');
    console.log('       TIME ELAPSED:', (Timer.diff(true) / 1000) + ' SECS');
    console.log('______________________________________________________________');

}
