var instances = require('./../taillard');
var seed = require('./../seed-random');
var Helper = require('./../helper');
var Timer = require('./../timer');
var NEH = require('./../neh');
var IG = require('./../ig');

// Get Taillard instance by name
var ta051 = instances.get('ta051');

// Reset timer
Timer.reset();

console.log('PROCESSING...');

var initialSeed = ta051.initialSeed;

// Overwrite Math.random by number generator with seed
seed(initialSeed, true);

console.log('               NAME:', ta051.name);
console.log('     NUMBER OF JOBS:', ta051.numberOfJobs);
console.log(' NUMBER OF MACHINES:', ta051.numberOfMachines);
console.log('        LOWER BOUND:', ta051.lowerBound);
console.log('        UPPER BOUND:', ta051.upperBound);

var orderedNEH = NEH.order(ta051.data);
var orderedIG = IG.order(ta051.data);

console.log('       NEH MAKESPAN:', NEH.makespan(orderedNEH));
console.log('        IG MAKESPAN:', IG.makespan(orderedIG));
console.log('         RPD NEH UB:', Helper.rpd(NEH.makespan(orderedNEH), ta051.upperBound, 2) + '%');
console.log('          RPD IG UB:', Helper.rpd(IG.makespan(orderedIG), ta051.upperBound, 2) + '%');
console.log('         RPD IG NEH:', Helper.rpd(IG.makespan(orderedIG), NEH.makespan(orderedNEH), 2) + '%');
console.log('       TIME ELAPSED:', (Timer.diff(true) / 1000) + ' SECS');
console.log('______________________________________________________________');
