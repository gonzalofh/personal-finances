#!/bin/bash

SCRIPTS_FOLDER=$(cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)
PROJECT_FOLDER=$(dirname ${SCRIPTS_FOLDER})

for i in "$@" ; do
    if [[ $i == "-i" ]] ; then
        source ${SCRIPTS_FOLDER}/install.sh
    fi
    if [[ $i == "-c" ]] ; then
        source ${SCRIPTS_FOLDER}/clean.sh
    fi
    if [[ $i == "-ic" || $i == "-ci" ]] ; then
        source ${SCRIPTS_FOLDER}/clean.sh
        source ${SCRIPTS_FOLDER}/install.sh
    fi
done

source ${SCRIPTS_FOLDER}/fetch-data.sh

source ${SCRIPTS_FOLDER}/generate-report.sh

open ${PROJECT_FOLDER}/build/report.html