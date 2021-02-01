'use strict';

module.exports = (data) => {

    const transformed = {};

    transformed['accounts'] = data['accounts'].map(account => {
        return {
            "name": account['name'],
            "type": `${account['type']} - ${account['subtype']}`,
            "currentBalance": account['balances']['current'],
            "availableBalance": account['balances']['available']
        };
    });

    return transformed;

}