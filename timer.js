// Timer to measure elapsed time
function Timer() {
}

// Reset timer
Timer.prototype.reset = function() {
    Timer.prototype.time = process.hrtime();
};
exports.reset = Timer.prototype.reset;

// Time in milliseconds since last reset
Timer.prototype.diff = function(reset) {
    if(Timer.prototype.time && Timer.prototype.time.length == 2) {
        var start = +(Timer.prototype.time.join('.')) * 1000;
        var now = +(process.hrtime().join('.')) * 1000;
        if(reset) {
            Timer.prototype.time = process.hrtime();
        }
        return Math.floor(now - start);
    } else {
        Timer.prototype.start();
        return 0;
    }
};
exports.diff = Timer.prototype.diff;
