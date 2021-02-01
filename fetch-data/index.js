'use strict';

import fs from 'fs';
import { getAccount } from 'plaid-client';

const rawDataBuildDirectory = process.env['RAW_DATA_BUILD_DIR'];

export default function(institution) {
    return (done) => {
        return getAccount(institution['accessToken'], 'arraybuffer')
            .then(res => {
                fs.writeFile(`${rawDataBuildDirectory}/${institution['name']}.json`, res['data'], done);
            })
        }
}