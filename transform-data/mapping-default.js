'use strict';

function _round(num) {
    return Math.round( num * 100 + Number.EPSILON ) / 100
}

module.exports = (data) => {

    const transformed = {};

    transformed['accounts'] = data['accounts'].map(account => {
        return {
            "name": account['name'],
            "type": `${account['type']} - ${account['subtype']}`,
            "currentBalance": _round(account['balances']['current']),
            "availableBalance": _round(account['balances']['available'])
        };
    });

    return transformed;

}