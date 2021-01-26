'use strict';

import fs from 'fs';
import gulp from 'gulp';
import './config.js';
import fetchData from './fetch-data/index.js';
import transformData from './transform-data/index.js';

const plaidAccountsCredentials = JSON.parse(fs.readFileSync('./plaid-credentials.json'));
const rawDataBuildDirectory = process.env['RAW_DATA_BUILD_DIR'];
const transformedDataBuildDirectory = process.env['TRANSFORMED_DATA_BUILD_DIR'];

function createCleaningTasks(dirs) {
    return dirs.map(dir => {
        const taskName = `clean:${dir}`
        gulp.task(`clean:${dir}`, (cb) => {
            fs.rm(dir, () => fs.mkdir(dir, { recursive: true }, cb));
        });
        return taskName;
    });
}

function createDataTasks(institution) {
    const fetchDataTaskName = `fetchData:${institution['name']}`;
    const transformDataTaskName = `transformData:${institution['name']}`
    gulp.task(fetchDataTaskName, fetchData(institution));
    gulp.task(transformDataTaskName, transformData(`${rawDataBuildDirectory}/${institution['name']}.json`));
    return gulp.series(fetchDataTaskName, transformDataTaskName);
}

const dataTasks = plaidAccountsCredentials['institutions'].map(createDataTasks);

export default gulp.series(gulp.parallel(createCleaningTasks([rawDataBuildDirectory, transformedDataBuildDirectory])), gulp.parallel(dataTasks))
