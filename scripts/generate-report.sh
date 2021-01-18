#!/bin/bash

echo -e "\n\033[0;32mGenerating report...\033[0;0m\n"

SCRIPTS_FOLDER=$(cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)
PROJECT_FOLDER=$(dirname ${SCRIPTS_FOLDER})

cd ${PROJECT_FOLDER}/html-report
node index.js template.handlebars ${PROJECT_FOLDER}/build/robinhood_results.json ${PROJECT_FOLDER}/build/report.html

cd ${PROJECT_FOLDER}