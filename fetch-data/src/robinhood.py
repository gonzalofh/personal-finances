import robin_stocks as r
from functools import reduce


class Robinhood:

    def __init__(self, username, password):
        self.username = username
        self.password = password
        r.login(username=self.username, password=self.password)

    def get_market_value(self):
        portfolio = r.profiles.load_portfolio_profile()
        return float(portfolio['market_value'])

    def get_invested_total(self):
        bank_transfers = r.get_bank_transfers()
        invested_amounts = list(map(lambda transfer: float(transfer['amount']), bank_transfers))
        return reduce(lambda x, y: x + y, invested_amounts)
