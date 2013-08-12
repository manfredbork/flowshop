var instances = require('./../taillard');
var seed = require('./../seed-random');
var Timer = require('./../timer');
var NEH = require('./../neh');
var IG = require('./../ig');

// Number of jobs and machines
var jobs = 20;
var machines = 5;

// Filter Taillard instances by jobs and machines
var filteredInstances = instances.filter(jobs, machines);

// Relative percentage deviation
var rpdNEH = 0;
var rpdIG = 0;

// Reset timer
Timer.reset();

    console.log('PROCESSING');
    console.log('______________________________________________________________');

// Iterate over filtered instances
for(var i = 0; i < filteredInstances.length; i++) {

    // Overwrite Math.random by number generator with seed
    seed(filteredInstances[i].initialSeed, true);

    // Apply algorithms
    var $NEH = NEH.apply(filteredInstances[i].data);
    var $IG = IG.apply(filteredInstances[i].data);

    rpdNEH = rpdNEH + NEH.rpd(NEH.makespan($NEH), filteredInstances[i].upperBound);
    rpdIG = rpdIG + IG.rpd(IG.makespan($IG), filteredInstances[i].upperBound);

    console.log('          NAME:', filteredInstances[i].initialSeed);
    console.log('  NEH MAKESPAN:', NEH.makespan($NEH));
    console.log('      MAKESPAN:', IG.makespan($IG));
    console.log('  TIME ELAPSED:', Timer.diff(true) / 1000, 'SECS');
    console.log('______________________________________________________________');

}

    console.log('      INSTANCE:', jobs + ' x ' + machines);
    console.log('       RPD NEH:', Math.round(rpdNEH / filteredInstances.length * 100) / 100, '%');
    console.log('        RPD IG:', Math.round(rpdIG / filteredInstances.length * 100) / 100, '%');
