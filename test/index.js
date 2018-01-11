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
            on: (event, next) => {

                if (event === 'data') {

                    data = next;

                    return;
                }
                end = next;
            },
            end: () => {

                data(new Buffer('Hello'));

                return end();
            }
        };
    };

};
const Podo = proxyquire('../lib', { pdfmake: Pdfmake });

const internals = {
    register: async function () {

        try {
            await internals.server.register({
                plugin: Podo
            });
        }
        catch (err) {
            return Promise.reject(err);
        }
    },
    definition: {
        content: [
            'First paragraph',
            'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
        ]
    },
    init: async function () {

        internals.server = new Hapi.Server();
        await internals.server.start();
    }
};

describe('Registering the plugin', () => {

    beforeEach((done) => {

        internals.init()
            .then(() => {

                return done;
            });
    });

    it('Should register the plugin', (done) => {

        internals.register()
            .then(() => {

                return done;
            })
            .catch((err) => {

                expect(err).to.not.exist();

                return done;
            });
    });
});

describe('Creating a PDF', () => {

    it('Should create a PDF buffer', (done) => {

        internals.server.plugins.podo.generate(internals.definition)
            .then((res) => {

                expect(res).to.exist();

                return done;
            })
            .catch((err) => {

                expect(err).to.not.exist();

                return done;
            });

    });
});
