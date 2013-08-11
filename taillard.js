var fs = require('fs');

// Import and parse Taillard instances from directory
function Taillard() {
}

// Filter Taillard instances by jobs and machines
Taillard.prototype.filter = function(jobs, machines) {
    var data = parseFiles('taillard/'), filteredData = [];
    for(var i = 0; i < data.length; i++) {
        if(data[i].numberOfJobs === jobs && data[i].numberOfMachines === machines) {
            filteredData.push(data[i]);
        }
    }
    return filteredData.reverse();
};
exports.filter = Taillard.prototype.filter;

// Get Taillard instance by name
Taillard.prototype.get = function(name) {
    var data = parseFiles('taillard/');
    for(var i = 0; i < data.length; i++) {
        if(name !== 'custom' && data[i].name === name) {
            return data[i];
        }
    }
    return [];
};
exports.get = Taillard.prototype.get;

function parseLine(line) {
    var finalValues = [], rawValues = line.split(/\s{1,}/g);
    for(var i = 0; i < rawValues.length; i++) {
        var eachValue = Number(rawValues[i]);
        if(eachValue > 0) {
            finalValues.push(eachValue);
        }
    }
    return finalValues;
}

function parseFile(file) {
    var finalValues = [], rawValues = file.split(String.fromCharCode(13) + String.fromCharCode(10));
    for(var i = 0; i < rawValues.length; i++) {
        var eachLine = parseLine(rawValues[i]);
        if(eachLine.length > 0) {
            finalValues.push(eachLine);
        }
    }
    return finalValues;
}

function parseFiles(path) {
    var finalData = [], fileList = fs.readdirSync(path);
    for(var i = 0; i < fileList.length; i++) {
        var counter = counterByFileName(fileList[i]);
        var tempData = {
            data: []
        };
        var nextHeaderData = 0;
        var rawData = parseFile( fs.readFileSync(path + fileList[i]).toString() );
        for(var j = 0; j < rawData.length; j++) {
            if(j === nextHeaderData) {
                var name = 'ta';
                if(counter > 0) {
                    name = name + fillWithZeros('' + counter, 3);
                } else {
                    name = 'custom';
                }
                tempData = {
                    name: name,
                    data: [],
                    numberOfJobs: rawData[j][0],
                    numberOfMachines: rawData[j][1],
                    initialSeed: rawData[j][2],
                    upperBound: rawData[j][3],
                    lowerBound: rawData[j][4]
                };
                nextHeaderData = nextHeaderData + tempData.numberOfMachines + 1;
                finalData.push(tempData);
                if(counter > 0) {
                    counter++;
                }
            } else {
                tempData.data.push(rawData[j]);
            }
        }
    }
    return finalData.reverse();
}

function fillWithZeros(input, length) {
    while(input.length < length) {
        input = '0' + input;
    }
    return input;
}

function counterByFileName(fileName) {
    var map = {
        'tai20_5.txt': 1,
        'tai20_10.txt': 11,
        'tai20_20.txt': 21,
        'tai50_5.txt': 31,
        'tai50_10.txt': 41,
        'tai50_20.txt': 51,
        'tai100_5.txt': 61,
        'tai100_10.txt': 71,
        'tai100_20.txt': 81,
        'tai200_10.txt': 91,
        'tai200_20.txt': 101,
        'tai500_20.txt': 111
    };
    return map[fileName] || 0;
}
