import json
import keyring
import os

from plaid import Plaid
from plaid_response_mapper import map_balance
from robinhood import Robinhood
from env_loader import load_env
from pathlib import Path


ENV_PATH = Path(__file__).parent.parent
env = load_env(ENV_PATH)


def build_plaid_client():
    plaid_host = os.getenv('PLAID_HOST')
    plaid_client_id = os.getenv('PLAID_CLIENT_ID')
    plaid_secret_key = os.getenv('PLAID_SECRET_KEY')
    return Plaid(plaid_host, plaid_client_id, plaid_secret_key)


def get_robinhood_results():
    robinhood_username = os.getenv('ROBINHOOD_USERNAME')
    robinhood_pwd = keyring.get_password('Robinhood', robinhood_username)
    robinhood_client = Robinhood(robinhood_username, robinhood_pwd)
    results = {}
    results['invested_total'] = round(
        robinhood_client.get_invested_total(), 2)
    results['market_value'] = round(
        robinhood_client.get_market_value(), 2)
    return results


project_path = os.path.dirname(os.path.realpath(__file__)).rsplit(os.sep, 2)[0]

build_path = project_path + '/build/data'

plaid_client = build_plaid_client()

pnc_access_token = os.getenv('PNC_PLAID_ACCESS_TOKEN')
pnc_balance_response = plaid_client.get_accounts(pnc_access_token)
pnc_balance_results = map_balance(pnc_balance_response)
with open(build_path + '/accounts/pnc.json', 'w') as fp:
    json.dump(pnc_balance_results, fp, indent=4)

betterment_access_token = os.getenv('BETTERMENT_PLAID_ACCESS_TOKEN')
betterment_balance_response = plaid_client.get_accounts(
    betterment_access_token)
betterment_balance_results = map_balance(betterment_balance_response)
with open(build_path + '/accounts/betterment.json', 'w') as fp:
    json.dump(betterment_balance_results, fp, indent=4)

fundrise_access_token = os.getenv('FUNDRISE_PLAID_ACCESS_TOKEN')
print(fundrise_access_token)
fundrise_response = plaid_client.get_accounts(fundrise_access_token)
fundrise_results = map_balance(fundrise_response)
with open(build_path + '/investments/fundrise.json', 'w') as fp:
    json.dump(fundrise_results, fp, indent=4)

robinhood_results = get_robinhood_results()
with open(build_path + '/investments/robinhood.json', 'w') as fp:
    json.dump(robinhood_results, fp, indent=4)
