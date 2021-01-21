import httplib2
from json import dumps, loads

HEADERS = {'Content-Type': 'application/json; charset=UTF-8'}


class PlaidError(Exception):

    def __init__(self, error_type, error_code):
        self.error_type = error_type
        self.error_code = error_code


class Plaid:

    def __init__(self, host, client_id, secret_key):
        self.host = host
        self.client_id = client_id
        self.secret_key = secret_key
        self.h = httplib2.Http(".cache")

    def get_accounts(self, access_token):
        body = {
            "client_id": self.client_id,
            "secret": self.secret_key,
            "access_token": access_token
        }
        body = dumps(body)
        url = self.host + "/accounts/get"
        (resp, content) = self.h.request(
            url, "POST", body=body, headers=HEADERS)
        content = loads(content.decode("utf-8"))
        if (resp.status != 200):
            raise PlaidError(content['error_type'], content['error_code'])
        return content
