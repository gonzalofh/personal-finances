import fs from 'fs';

const re = /function (.*)\(/;

function _getFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function _getFunctionName(f) {
    return f.match(re)[1];
}  

function _wrapFunctionInHandleBarsHelper(f) {
    const functionName = _getFunctionName(f);
    if (functionName.startsWith('_')) {
        return f;
    } else {
        return `Handlebars.registerHelper('${functionName}', ${f});`;
    }
}

export default function (filePath) {
    const functions = _getFile(filePath).split(`\n\n`);
    const helpers = functions.map(_wrapFunctionInHandleBarsHelper);
    return helpers.join('\n\n');
}