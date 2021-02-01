'use strict';

import through2 from 'through2';
import gulp from 'gulp';
import fs from 'fs';

let mapData;

if (fs.existsSync(`${__dirname}/mapping.js`)) {
    mapData = require(`${__dirname}/mapping.js`);
} else {
    mapData = require(`${__dirname}/mapping-default.js`);
}

const transformedDataBuildDirectory = process.env['TRANSFORMED_DATA_BUILD_DIR']

export default function(filepath) {
    return () => {
        return gulp.src(filepath)
            .pipe(through2.obj((file, _, cb) => {
                const data = JSON.parse(file.contents);
                const transformed = mapData(data);
                file.contents = Buffer.from(JSON.stringify(transformed, null, 4))
                cb(null, file);
            }))
            .pipe(gulp.dest(`${transformedDataBuildDirectory}/`));
    }
}