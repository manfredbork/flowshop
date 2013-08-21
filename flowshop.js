// Import util
var util = require('util');

// Import flowshop files
var Random = require('./src/random');
var Importer = require('./src/importer');
var Timer = require('./src/timer');
var NEH = require('./src/neh');
var IG = require('./src/ig');

// Overwrite Math.random()
util._extend(Math, Random.prototype);

// Initialization
var importer = new Importer();
var notfound = 0;
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
    } else if (arguments[i].match(/^[0-9]{1,3}x[0-9]{1,2}$/)) {
        var aliasMapping = {
            '20x5': ['ta001', 'ta002', 'ta003', 'ta004', 'ta005', 'ta006', 'ta007', 'ta008', 'ta009', 'ta010'],
            '20x10': ['ta011', 'ta012', 'ta013', 'ta014', 'ta015', 'ta016', 'ta017', 'ta018', 'ta019', 'ta020'],
            '20x20': ['ta021', 'ta022', 'ta023', 'ta024', 'ta025', 'ta026', 'ta027', 'ta028', 'ta029', 'ta030'],
            '50x5': ['ta031', 'ta032', 'ta033', 'ta034', 'ta035', 'ta036', 'ta037', 'ta038', 'ta039', 'ta040'],
            '50x10': ['ta041', 'ta042', 'ta043', 'ta044', 'ta045', 'ta046', 'ta047', 'ta048', 'ta049', 'ta050'],
            '50x20': ['ta051', 'ta052', 'ta053', 'ta054', 'ta055', 'ta056', 'ta057', 'ta058', 'ta059', 'ta060'],
            '100x5': ['ta061', 'ta062', 'ta063', 'ta064', 'ta065', 'ta066', 'ta067', 'ta068', 'ta069', 'ta070'],
            '100x10': ['ta071', 'ta072', 'ta073', 'ta074', 'ta075', 'ta076', 'ta077', 'ta078', 'ta079', 'ta080'],
            '100x20': ['ta081', 'ta082', 'ta083', 'ta084', 'ta085', 'ta086', 'ta087', 'ta088', 'ta089', 'ta090'],
            '200x10': ['ta091', 'ta092', 'ta093', 'ta094', 'ta095', 'ta096', 'ta097', 'ta098', 'ta099', 'ta100'],
            '200x20': ['ta101', 'ta102', 'ta103', 'ta104', 'ta105', 'ta106', 'ta107', 'ta108', 'ta109', 'ta110'],
            '500x20': ['ta111', 'ta112', 'ta113', 'ta114', 'ta115', 'ta116', 'ta117', 'ta118', 'ta119', 'ta120']
        };
        names = names.concat(aliasMapping[arguments[i]] || []);
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

            notfound++;
        }
    }

    if (nehrpd > 0 && igrpd > 0) {
        console.log(' Average RPD NEH UB:', (Math.round(nehrpd / (names.length - notfound) * 100) / 100) + '%');
        console.log('  Average RPD IG UB:', (Math.round(igrpd / (names.length - notfound) * 100) / 100) + '%');
        console.log('--------------------------');
    }

} else {

    console.log('Usage: node flowshop <TAILLARD INSTANCE NAMES SEPARATED BY SPACES>');

}
