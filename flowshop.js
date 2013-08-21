// Import util
var util = require('util');

// Import my files
var Random = require('./src/random');
var Importer = require('./src/importer');
var Timer = require('./src/timer');
var NEH = require('./src/neh');
var IG = require('./src/ig');

// Overwrite Math.random() function
util._extend(Math, Random.prototype);

// Initialization
var importer = new Importer();
var names = [];
var neh = new NEH();
var ig = new IG();
var nehrpd = 0;
var igrpd = 0;

// Read arguments
var arguments = process.argv.splice(2);
for(var i = 0; i < arguments.length; i++) {
    if (arguments[i].match(/^ta[0-9]{3}$/)) {
        names.push(arguments[i]);
    } else {
        names = [];
        break;
    }
}

if (names.length > 0) {

    console.log('--------------------------');
    console.log('       Processing...      ');
    console.log('--------------------------');

    for(var j = 0; j < names.length; j++) {

        // Instance data
        var name = names[j];
        var metaData = importer.loadMetaData(name);
        var matrixData = importer.loadMatrixData(name);

        if (metaData) {

            // Set initial seed
            Math.initialSeed(metaData.initialSeed);

            // Run algorithms
            var timer = new Timer();
            var nehrun = neh.run(matrixData);
            var igrun = ig.run(matrixData);

            console.log('          Name:', metaData.name);
            console.log('          Jobs:', metaData.jobs);
            console.log('      Machines:', metaData.machines);
            console.log('   Upper bound:', metaData.upperBound);
            console.log('  NEH Makespan:', nehrun.makespan());
            console.log('    RPD NEH UB:', nehrun.rpd(metaData.upperBound) + '%');
            console.log('   IG Makespan:', igrun.makespan());
            console.log('     RPD IG UB:', igrun.rpd(metaData.upperBound) + '%');
            console.log('  Elapsed time:', timer.elapsedTime('mm:ss') + ' mins');
            console.log('--------------------------');

            // Average rpd
            nehrpd = nehrpd + nehrun.rpd(metaData.upperBound);
            igrpd = igrpd + igrun.rpd(metaData.upperBound);
        } else {

            console.log('   File ' + name + ' not found');
            console.log('--------------------------');
        }
    }

    if (nehrpd > 0 && igrpd > 0) {
        console.log(' Average RPD NEH UB:', (Math.round(nehrpd / names.length * 100) / 100) + '%');
        console.log('  Average RPD IG UB:', (Math.round(igrpd / names.length * 100) / 100) + '%');
        console.log('--------------------------');
    }

} else {

    console.log('Usage: node flowshop <TAILLARD INSTANCE NAMES SEPARATED BY SPACES>');

}
