#!/bin/bash

echo -e "\n\033[0;32mFetching data...\033[0;0m\n"

SCRIPTS_FOLDER=$(cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)
PROJECT_FOLDER=$(dirname ${SCRIPTS_FOLDER})

python3 ${PROJECT_FOLDER}/fetch-data/src