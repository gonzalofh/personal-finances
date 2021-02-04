'use strict';

import { src, dest } from 'gulp';
import wrap from 'gulp-wrap';
import path from 'path';
import declare from 'gulp-declare';
import concat from 'gulp-concat';
import handlebars from 'gulp-handlebars';
import rename from 'gulp-rename';
import merge from 'merge-stream';
import { copyFile, writeFile, existsSync } from 'fs';
import compileHelpers from './compile-helpers';

const _getFilename = filename => {
    return path.basename(filename, path.extname(filename))
}

exports.copyHtmlToBuildDir = (outputFile) => {
    return (cb) => copyFile(`${__dirname}/report.html`, outputFile, cb);
} 

exports.compileHelpers = (outputFile) => {
    return (cb) => {
        let helpersFile;
        if (existsSync(`${__dirname}/helpers.js`)) {
            helpersFile = `${__dirname}/helpers.js`;
        } else {
            helpersFile = `${__dirname}/helpers-default.js`;
        }
        const helpers = compileHelpers(helpersFile);
        writeFile(outputFile, helpers, 'utf8', cb);
    }
}

exports.createContextFileFromData = (dataFile, namespace, outputFile) => {
    return () => {
        return src(dataFile)
        .pipe(declare({
            namespace: `context.${namespace}`,
            noRedeclare: true
        }))
        .pipe(rename(`${_getFilename(outputFile)}.js`))
        .pipe(dest(path.dirname(outputFile)));
    }
}

exports.mergeContextsFiles = (contextFilesDir, outputFile) => {
    return () => {
        return src(`${contextFilesDir}/*.js`)
        .pipe(concat(path.basename(outputFile)))
        .pipe(dest(path.dirname(outputFile)));
    }
}

exports.compileTemplates = (outputDir) => {
    return () => {
        const partials = src([`${__dirname}/templates/partials/*.hbs`])
        .pipe(handlebars())
        .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
            imports: {
                processPartialName: fileName => {
                return JSON.stringify(path.basename(fileName, '.js'));
                }
            }
        }));

        const templates = src(`${__dirname}/templates/layout.hbs`)
            .pipe(handlebars())
            .pipe(wrap('Handlebars.template(<%= contents %>)'))
            .pipe(declare({
                namespace: 'templates',
                noRedeclare: true, // Avoid duplicate declarations
            }));

        // Output both the partials and the templates as build/js/templates.js
        return merge(partials, templates)
        .pipe(concat('templates.js'))
        .pipe(dest(`${outputDir}/`));
    }
    
}