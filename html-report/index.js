const Handlebars = require("handlebars");
const fs = require('fs');

var args = process.argv.slice(2)

const templatePath = args[0]
const contextPath = args[1]
const outputPath = args[2]

const readTemplateStream = fs.createReadStream(templatePath, 'utf8')
const readContextStream = fs.createReadStream(contextPath, 'utf8')

let templateFile = ''
let contextFile = ''

readTemplateStream.on('data', function(chunk) {
    templateFile += chunk
}).on('end', function() {
    readContextStream.on('data', function(chunk) {
        contextFile += chunk
    }).on('end', function() {
        Handlebars.registerHelper("substract", function(a, b) {
            return a - b;
          });
        const template = Handlebars.compile(templateFile);
        const html = template(JSON.parse(contextFile))
        fs.writeFileSync(outputPath, html)
    })
});