'use strict';

import through2 from 'through2'
import gulp from 'gulp'

const transformedDataBuildDirectory = process.env['TRANSFORMED_DATA_BUILD_DIR']

export default function(filepath) {
    return () => {
        return gulp.src(filepath)
            .pipe(through2.obj((file, _, cb) => {
                const data = JSON.parse(file.contents)
                const transformed = {}
                transformed['accounts'] = data['accounts'].map(account => {
                    return {
                        "name": account['name'],
                        "type": `${account['type']} - ${account['subtype']}`,
                        "currentBalance": account['balances']['current'],
                        "availableBalance": account['balances']['available']
                    }
                })
                file.contents = Buffer.from(JSON.stringify(transformed, null, 4))
                cb(null, file);
            }))
            .pipe(gulp.dest(`${transformedDataBuildDirectory}/`));
    }
}