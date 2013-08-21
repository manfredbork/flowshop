// Import util
var util = require('util');

// Import my files
var Random = require('./src/random');
var Importer = require('./src/importer');
var NEH = require('./src/neh');
var IG = require('./src/ig');

// Overwrite Math.random() function
util._extend(Math, Random.prototype);

// Initialization
var name = 'ta005';
var importer = new Importer();
var metaData = importer.loadMetaData(name);
var matrixData = importer.loadMatrixData(name);
var neh = new NEH();
var ig = new IG();

// Set initial seed
Math.initialSeed(metaData.initialSeed);

// Run algorithms
console.log('INSTANCE NAME', name);
console.log(' NEH MAKESPAN', neh.run(matrixData).makespan());
console.log('  IG MAKESPAN', ig.run(matrixData).makespan());
