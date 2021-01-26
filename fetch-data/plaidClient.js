import axios from 'axios'

const host = process.env['PLAID_HOST']
const clientId = process.env['PLAID_CLIENT_ID']
const secret = process.env['PLAID_SECRET_KEY']

export default {
	getAccounts: (accessToken) => {
		return axios({
			method: 'post',
			url: host + '/accounts/get',
			responseType: 'arraybuffer',
			data: {
				'access_token': accessToken,
				'client_id': clientId,
				'secret': secret
			}
		})
	}
}  