function _round(num) {
    return Math.round( num * 100 + Number.EPSILON ) / 100;
}

function substract(x, y) {
    return x - y;
}

function uppercase(aString) {
    return aString.toUpperCase();
}

function totalCurrentBalance(institutions) {
    var total = Object.values(institutions)
        .flatMap(institution => institution['accounts']
        .map(account => account['currentBalance']))
        .reduce((a, b) => a + b)
    return _round(total);
}

function totalAvailableBalance(institutions) {
    var total = Object.values(institutions)
        .flatMap(institution => institution['accounts']
        .map(account => account['availableBalance']))
        .reduce((a, b) => a + b)
    return _round(total);
}