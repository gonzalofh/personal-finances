import fs from 'fs'
import plaidClient from './plaidClient.js'

const rawDataBuildDirectory = process.env['RAW_DATA_BUILD_DIR']

export default function(institution) {
    return (done) => {
        return plaidClient.getAccounts(institution['accessToken'])
            .then(res => {
                fs.writeFile(`${rawDataBuildDirectory}/${institution['name']}.json`, res['data'], done)
            })
        }
}