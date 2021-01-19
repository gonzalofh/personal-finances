def _map_pnc_balance_accounts(account):
    return {
        "account_name": account['name'],
        "available_balance": account['balances']['available'],
        "current_balance": account['balances']['current'],
    }


def map_balance(institution, response):
    accounts = list(map(_map_pnc_balance_accounts, response['accounts']))
    return {
        "institution": institution,
        "accounts": accounts
    }
