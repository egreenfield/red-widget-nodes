

var v = 12345;


var big = Math.trunc(v)
var r = []
while(big) {
    d = big % 10;
    r.unshift(d);
    big = Math.trunc(big/10);
}