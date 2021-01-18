#!/bin/bash

echo -e '\n\033[0;32mInstalling dependencies...\033[0;0m\n'

SCRIPTS_FOLDER=$(cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)
PROJECT_FOLDER=$(dirname ${SCRIPTS_FOLDER})

cd ${PROJECT_FOLDER}/fetch-data
python3 -m pip install -r requirements.txt
cd ${PROJECT_FOLDER}/html-report
npm install
cd ${PROJECT_FOLDER}