var fs = require('fs');

/*--------------------------------------------------------*/
/* Import and parse Taillard sets from directory
/*--------------------------------------------------------*/
function Taillard(path) {
    return parseFiles(path + '/');
}
module.exports = Taillard('taillard');

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
        var tempData = {
            data: []
        };
        var nextHeaderData = 0;
        var rawData = parseFile( fs.readFileSync(path + fileList[i]).toString() );
        for(var j = 0; j < rawData.length; j++) {
            if(j === nextHeaderData) {
                tempData = {
                    data: [],
                    numberOfJobs: rawData[j][0],
                    numberOfMachines: rawData[j][1],
                    initialSeed: rawData[j][2],
                    upperBound: rawData[j][3],
                    lowerBound: rawData[j][4]
                };
                nextHeaderData = nextHeaderData + tempData.numberOfMachines + 1;
                finalData.push(tempData);
            } else {
                tempData.data.push(rawData[j]);
            }
        }
    }
    return finalData.reverse();
}
