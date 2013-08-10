// Timer to measure processing time
function Timer() {
}

// Start timer
Timer.prototype.start = function() {
    Timer.prototype.time = process.hrtime();
};
exports.start = Timer.prototype.start;

// Measure difference from start
Timer.prototype.diff = function() {
    if(Timer.prototype.time && Timer.prototype.time.length == 2) {
        var start = +(Timer.prototype.time.join('.'));
        var now = +(process.hrtime().join('.'));
        Timer.prototype.time = process.hrtime();
        return now - start;
    } else {
        Timer.prototype.start();
        return 0.0;
    }
};
exports.diff = Timer.prototype.diff;
