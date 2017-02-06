'use strict';

const Pdfmake = require('pdfmake');
const Fonts = require('./fonts');
const Printer = new Pdfmake(Fonts);
const internals = {};

internals.generate = function (definition, next) {

    const pdf = Printer.createPdfKitDocument(definition);
    let raw = '';

    pdf.setEncoding('utf8');

    pdf.on('data', function (chunk) {

        raw += chunk;
    });

    pdf.on('end', function () {

        return next(null, Buffer.from(raw));
    });

    pdf.end();
};


exports.register = (server, options, next) => {

    server.expose('generate', internals.generate);

    return next();
};


exports.register.attributes = {
    pkg: require('../package.json')
};
