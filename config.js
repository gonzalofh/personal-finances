import fs from 'fs'
import path from 'path'

const plaidAccountsCredentials = JSON.parse(fs.readFileSync('./plaid-credentials.json'))
const buildDirectory = 'build'
const dataBuildDirectory = path.join(buildDirectory,'data')
const rawDataBuildDirectory = path.join(dataBuildDirectory,'raw')
const transformedDataBuildDirectory = path.join(dataBuildDirectory,'transformed')

process.env['RAW_DATA_BUILD_DIR'] = rawDataBuildDirectory
process.env['TRANSFORMED_DATA_BUILD_DIR'] = transformedDataBuildDirectory

process.env['PLAID_HOST'] = plaidAccountsCredentials['host']
process.env['PLAID_CLIENT_ID'] = plaidAccountsCredentials['clientId']
process.env['PLAID_SECRET_KEY'] = plaidAccountsCredentials['secretKey']