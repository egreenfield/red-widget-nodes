
var SevenSegment = require('ht16k33-sevensegment-display');


function splitIntoDigits(v) {


    var big = Math.trunc(v)
    var r = []
    while(big) {
        d = big % 10;
        r.push(d);
        big = Math.trunc(big/10);
    }
    return r;
}

module.exports = function(RED) {
    function ShowNumberNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.address = parseInt(config.address) || 0x70;
        console.log("addr is",node.address)
        var _display = new SevenSegment(node.address, 1);

        node.on('input', function(msg) {
            var n = parseInt(msg.payload);
            var digits = splitIntoDigits(n);            
            digits.length = Math.min(4,digits.length);
            _display.clear();
            if(digits.length >= 1)
                _display.writeDigit(4,digits[0]);
            if(digits.length >= 2)
                _display.writeDigit(3,digits[1]);
            if(digits.length >= 3)
                _display.writeDigit(1,digits[2]);
            if(digits.length >= 4)
                _display.writeDigit(0,digits[3]);            
        });
    }
    RED.nodes.registerType("show-number",ShowNumberNode);
}

