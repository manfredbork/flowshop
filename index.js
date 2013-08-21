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
var importer = new Importer();
var names = ['ta001', 'ta002', 'ta003'];
var neh = new NEH();
var ig = new IG();

for(var i = 0; i < names.length; i++) {

    // Instance data
    var name = names[i];
    var metaData = importer.loadMetaData(name);
    var matrixData = importer.loadMatrixData(name);

    // Set initial seed
    Math.initialSeed(metaData.initialSeed);

    // Run algorithms
    console.log('INSTANCE NAME', metaData.name);
    console.log('         JOBS', metaData.jobs);
    console.log('     MACHINES', metaData.machines);
    console.log(' NEH MAKESPAN', neh.run(matrixData).makespan());
    console.log('  IG MAKESPAN', ig.run(matrixData).makespan());
    console.log('-----------------------------');

}
