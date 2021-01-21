const { src, dest, parallel } = require('gulp')
const wrap = require('gulp-wrap')
const path = require('path')
const declare = require('gulp-declare')
const concat = require('gulp-concat');
const handlebars = require('gulp-handlebars')
const rename = require("gulp-rename")
const merge = require('merge-stream');
const mergeJson = require('gulp-merge-json')
const transformJson = require('gulp-json-transform')
const print = require('gulp-print').default


const _institutionFromFilename = function(filename) {
    return path.basename(filename, path.extname(filename)).toUpperCase();
}

const _mergeContexts = function(srcFiles, namespace, outputFile) {
    return src(srcFiles)
        .pipe(print(file => 'Compiling context for: ' + file))
        .pipe(transformJson(function(data, file) {
            data['institution'] = _institutionFromFilename(file.relative)
            return { a: [data] };
        }))
        .pipe(mergeJson({concatArrays: true}))
        .pipe(transformJson(function(data) {
            return data['a'];
        }))
        .pipe(rename(namespace))
        .pipe(declare({
            namespace: 'contexts',
            noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe(rename(outputFile))
        .pipe(dest('build/'))
}

function accountContext() {
    return _mergeContexts(['tmp/contexts/accounts/*.json'], 'accounts', 'accountsContext.js');
}

function investmentContext() {
    return _mergeContexts(['tmp/contexts/investments/*.json'], 'investments', 'investmentsContext.js');
}

function templates() {

    const partials = src(['templates/partials/*.hbs'])
        .pipe(handlebars())
        .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
        imports: {
            processPartialName: function(fileName) {
            return JSON.stringify(path.basename(fileName, '.js'));
            }
        }
        }));

    const templates = src('templates/layout.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'templates',
            noRedeclare: true, // Avoid duplicate declarations
        }));

    // Output both the partials and the templates as build/js/templates.js
    return merge(partials, templates)
    .pipe(concat('templates.js'))
    .pipe(dest('build/'));
    
}

exports.templates = templates
exports.contexts = parallel(investmentContext, accountContext)