'use strict';

const Pdfmake = require('pdfmake');
const Fonts = require('./fonts');
const Printer = new Pdfmake(Fonts);
const internals = {};

internals.generate = function (definition, next) {

    const pdf = Printer.createPdfKitDocument(definition);
    const raw = [];

    pdf.on('data', function (chunk) {

        raw.push(chunk);
    });

    pdf.on('end', function () {

        return next(null, Buffer.concat(raw));
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
