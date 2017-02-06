'use strict';

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();
const beforeEach = lab.beforeEach;
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;
const proxyquire = require('proxyquire').noCallThru();
const Pdfmake = function () {

    let end = null;
    let data = null;

    this.createPdfKitDocument = () => {

        return {
            setEncoding: () => {},
            on: (event, next) => {

                if (event === 'data') {

                    data = next;

                    return;
                }
                end = next;
            },
            end: () => {

                data('Hello.');

                return end();
            }
        };
    };

};
const Podo = proxyquire('../lib', { pdfmake: Pdfmake });

const internals = {
    register: (next) => {

        internals.server.register({
            register: Podo
        }, (err) => {

            return next(err);
        });
    },
    definition: {
        content: [
            'First paragraph',
            'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
        ]
    },
    init: () => {

        internals.server = new Hapi.Server();
        internals.server.connection();
        internals.server.initialize();
    }
};

describe('Registering the plugin', () => {

    beforeEach((done) => {

        internals.init();

        return done();
    });

    it('Should create default SMTP transport object', (done) => {

        internals.register((err) => {

            expect(err).to.not.exist();

            return done();
        });
    });
});

describe('Creating a PDF', () => {

    it('Should create a PDF buffer', (done) => {

        internals.server.plugins.podo.generate(internals.definition, (err, res) => {

            expect(err).to.not.exist();
            expect(res).to.exist();

            return done();
        });
    });
});
