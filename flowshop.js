// Import util
var util = require('util');

// Import flowshop files
var Random = require('./src/random');
var Importer = require('./src/importer');
var Timer = require('./src/timer');
var NEH = require('./src/neh');
var IG = require('./src/ig');

// Initialization
var importer = new Importer(__dirname);
var notfound = 0;
var names = [];
var neh = new NEH();
var ig = new IG();
var nehrpd = 0;
var igrpd = 0;
var repeat = 1;
var seed = 'default';

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
    } else if (arguments[i].match(/^ms=[0-9]{1,3}$/)) {
        ig.ms = Number(arguments[i].replace('ms=', ''));
    } else if (arguments[i].match(/^d=[0-9]{1}$/)) {
        ig.d = Number(arguments[i].replace('d=', ''));
    } else if (arguments[i].match(/^T=[0-9]{1}.[0-9]{1}$/)) {
        ig.T = Number(arguments[i].replace('T=', ''));
    } else if (arguments[i].match(/^repeat=[1-9]$|^repeat=[1-9][0-9]$/)) {
        repeat = Number(arguments[i].replace('repeat=', ''));
    } else if (arguments[i].match(/^seed=[[0-9,]+]$|^seed=auto$|^seed=default$/)) {
        var arg = arguments[i].replace('seed=', '');
        if (arg === 'auto' || arg === 'default') {
            seed = arg;
        } else {
            try {
                seed = JSON.parse(arg);
            } catch (err) {
                names = [];
            }
        }
    } else {
        names = [];
        break;
    }
}

// Overwrite Math.random()
var BasicMath = {
    floor: Math.floor,
    random: Math.random
};
util._extend(Math, Random.prototype);

console.log('--------------------------');
console.log('       Processing...      ');
console.log('--------------------------');

var iteration = 1;

while (repeat > 0) {

    var total = new Timer();

    if (names.length > 0) {

        for(var j = 0; j < names.length; j++) {

            // Instance data
            var name = names[j];
            var metaData = importer.loadMetaData(name);
            var matrixData = importer.loadMatrixData(name);

            if (metaData) {

                // Auto initial seed
                if (seed === 'auto') {
                    metaData.initialSeed = BasicMath.floor(BasicMath.random() * 9999999999);
                } else if (util.isArray(seed) && seed[j] > 0) {
                    metaData.initialSeed = seed[j];
                }

                // Set initial seed
                Math.initialSeed(metaData.initialSeed);

                // Run algorithms
                var elapsed = new Timer();
                var nehrun = neh.run(matrixData);
                var igrun = ig.run(matrixData);

                if (iteration > 1) {
                    console.log();
                    console.log('--------------------------');
                    console.log('       ' + iteration + '. Iteration');
                    console.log('--------------------------');
                }

                console.log('          Name:', metaData.name);
                console.log('  Initial Seed:', metaData.initialSeed);
                console.log('          Jobs:', metaData.jobs);
                console.log('      Machines:', metaData.machines);
                console.log('            LB:', metaData.lowerBound);
                console.log('            UB:', metaData.upperBound);
                console.log('  NEH Makespan:', nehrun.makespan());
                console.log('   IG Makespan:', igrun.makespan());
                console.log('IG Permutation:', igrun.permutation(matrixData));
                console.log('    RPD NEH UB:', nehrun.rpd(metaData.upperBound) + '%');
                console.log('     RPD IG UB:', igrun.rpd(metaData.upperBound) + '%');
                console.log('  Elapsed time:', elapsed.elapsedTime('mm:ss') + ' mins');
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
            console.log('    Total time:', total.elapsedTime('mm:ss') + ' mins');
            console.log('--------------------------');
        }

    } else {

        console.log();
        console.log('Glossary');
        console.log('========');
        console.log('Makespan: Time between start and finish of a sequence of jobs');
        console.log('LB: Makespan best solution Lower Bound');
        console.log('UB: Makespan best solution Upper Bound');
        console.log('NEH: Algorithm by Nawaz, Enscore, Ham');
        console.log('IG: Iterated Greedy algorithm');
        console.log('RPD: Relative Percentage Deviation');
        console.log();
        console.log('Hints');
        console.log('=====');
        console.log('Existing Taillard instances are ta001, ta002, ta003, ta004, ta005, ta006 etc.');
        console.log('Existing alias names for multiple Taillard instances are 20x5, 20x10, 20x20 etc.');
        console.log('Common values for parameter T of IG algorithm are 0.0, 0.1, 0.2, 0.3, 0.4 and 0.5');
        console.log('Common values for parameter d of IG algorithm are 2, 3, 4, 5, 6, 7 and 8');
        console.log('Common values for parameter ms of IG algorithm are 20 and 60');
        console.log('Set array of 10-digit numbers to overwrite initial seeds');
        console.log();
        console.log('Examples');
        console.log('========');
        console.log('node flowshop 20x5 20x10 repeat=2 seed=auto');
        console.log('node flowshop ta001 ta002 ta003 seed=[1111111111,9999999999]');
        console.log('node flowshop 50x5 ta005 ta020 T=0.4 d=4 ms=20');
        console.log();
        console.log('Usage: node flowshop <INSTANCES SEPARATED BY SPACES> [T=N.N] [d=N] [ms=NNN] [repeat=NN]');
        console.log('                                                     [seed=[S0,S1,...,Sn]|auto|default]');

    }
    nehrpd = 0;
    igrpd = 0;
    repeat--;
    iteration++;
}