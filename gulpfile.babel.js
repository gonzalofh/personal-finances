'use strict';

import fs from 'fs';
import gulp from 'gulp';
import './config.js';
import fetchData from './fetch-data/index.js';
import transformData from './transform-data/index.js';
import { copyHtmlToBuildDir, createContextFileFromData, mergeContextsFiles, compileTemplates } from './html-report/index.js';

const plaidAccountsCredentials = JSON.parse(fs.readFileSync('./plaid-credentials.json'));
const rawDataBuildDirectory = process.env['RAW_DATA_BUILD_DIR'];
const transformedDataBuildDirectory = process.env['TRANSFORMED_DATA_BUILD_DIR'];
const htmlBuildDirectory = process.env['HTML_BUILD_DIR']

function createCleaningTasks(dirs) {
    return dirs.map(dir => {
        const taskName = `clean:${dir}`
        gulp.task(`clean:${dir}`, (cb) => {
            fs.rm(dir, { recursive: true }, () => fs.mkdir(dir, { recursive: true }, cb));
        });
        return taskName;
    });
}

const buildTasks = plaidAccountsCredentials['institutions'].map(institution => {

    const institutionName = institution['name'];

    const fetchDataTaskName = `fetchData:${institutionName}`;
    const transformDataTaskName = `transformData:${institutionName}`;
    const createContextFileFromDataTaskName = `createContextFileFromData:${institutionName}`;

    gulp.task(fetchDataTaskName, fetchData(institution));

    const rawDataBuildFile = `${rawDataBuildDirectory}/${institutionName}.json`;
    gulp.task(transformDataTaskName, transformData(rawDataBuildFile));

    const transformedDataBuildFile = `${transformedDataBuildDirectory}/${institutionName}.json`;
    const jsContextOutputFile = `${htmlBuildDirectory}/contexts/${institutionName}.js`
    gulp.task(createContextFileFromDataTaskName, createContextFileFromData(transformedDataBuildFile, 'institutions', jsContextOutputFile));

    return {
        fetchTask: fetchDataTaskName,
        transformTask : transformDataTaskName,
        createContextTask: createContextFileFromDataTaskName 
    };

});

const compileTemplatesTask = compileTemplates(htmlBuildDirectory);
const cleanTasks = createCleaningTasks([rawDataBuildDirectory, transformedDataBuildDirectory, htmlBuildDirectory]);
const buildTasksInSeries = buildTasks.map(institution => gulp.series(institution['fetchTask'], institution['transformTask'], institution['createContextTask']));
const mergeContextFilesTask = mergeContextsFiles(`${htmlBuildDirectory}/contexts`, `${htmlBuildDirectory}/accountsContext.js`);

gulp.task('compileTemplates', compileTemplatesTask);
gulp.task('mergeContextFiles', mergeContextFilesTask);
gulp.task('copyHtmlToBuildDir', copyHtmlToBuildDir(`${htmlBuildDirectory}/report.html`));

exports.clean = gulp.parallel(cleanTasks);
exports.compileTemplates = compileTemplatesTask;
exports.fetchData = gulp.parallel(buildTasks.map(institution => institution['fetchTask']));
exports.transformData = gulp.parallel(buildTasks.map(institution => institution['transformTask']));
exports.createContexts = gulp.parallel(buildTasks.map(institution => institution['createContextTask']));
exports.build = gulp.parallel(buildTasksInSeries);
exports.mergeContextFiles = mergeContextFilesTask;
exports.generateReport = gulp.parallel('copyHtmlToBuildDir', 'mergeContextFiles', 'compileTemplates')
export default gulp.series(gulp.parallel(cleanTasks), gulp.parallel('compileTemplates', 'copyHtmlToBuildDir'), gulp.parallel(buildTasksInSeries), 'mergeContextFiles');
