'use strict';

const Pdfmake = require('pdfmake');
const Fonts = require('./fonts');
const Printer = new Pdfmake(Fonts);
const internals = {};

internals.generate = function (definition) {

    return new Promise((resolve) => {

        const pdf = Printer.createPdfKitDocument(definition);
        const raw = [];

        pdf.on('data', function (chunk) {

            raw.push(chunk);
        });

        pdf.on('end', function () {

            resolve(Buffer.concat(raw));
        });

        pdf.end();
    });
};

exports.plugin = {
    name: 'podo',
    register: function (server) {

        server.expose('generate', internals.generate);

        return Promise.resolve();
    },
    pkg: require('../package.json')
};
