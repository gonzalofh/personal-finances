#!/bin/bash

echo -e "\n\033[0;32mGenerating report...\033[0;0m\n"

SCRIPTS_FOLDER=$(cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)
PROJECT_FOLDER=$(dirname ${SCRIPTS_FOLDER})
DATA_BUILD_PATH=$PROJECT_FOLDER/build/data
HTML_BUILD_PATH=$PROJECT_FOLDER/build/html

cd ${PROJECT_FOLDER}/html-report

# CLEAN HTML'build' DIRECTORIES
rm -rf build
rm -rf ${HTML_BUILD_PATH}

# RECREATE NECESSARY 'build' DIRECTORIES
mkdir -p ${HTML_BUILD_PATH}

mkdir -p tmp/contexts

# COPY CONTEXTS FROM PROJECT 'build' DIRECTORY
cp -rf ${DATA_BUILD_PATH}/* tmp/contexts/

# EXECUTE TASKS
node_modules/gulp/bin/gulp.js templates contexts

# MOVE RESULTS TO PROJECT BULD DIRECTORY
cp report.html ${HTML_BUILD_PATH}/
cp -rf build/* ${HTML_BUILD_PATH}/

# CLEAN HTML'build' DIRECTORIES
rm -rf build
rm -rf tmp

cd ${PROJECT_FOLDER}