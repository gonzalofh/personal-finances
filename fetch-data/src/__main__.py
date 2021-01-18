import json
import keyring
import os

from robinhood import Robinhood
from decouple import config


def get_robinhood_results():
    robinhood_username = config('ROBINHOOD_USERNAME')
    robinhood_pwd = keyring.get_password('Robinhood', robinhood_username)
    robinhood_client = Robinhood(robinhood_username, robinhood_pwd)
    results = {}
    results['invested_total'] = round(robinhood_client.get_invested_total(), 2)
    results['market_value'] = round(robinhood_client.get_market_value(), 2)
    return results


def dump_robinhood_results(build_path, results):
    with open(build_path + '/robinhood_results.json', 'w') as fp:
        json.dump(results, fp, indent=4)


project_path = os.path.dirname(os.path.realpath(__file__)).rsplit(os.sep, 2)[0]

build_path = project_path + '/build'

robinhood_results = get_robinhood_results()
dump_robinhood_results(build_path, robinhood_results)
