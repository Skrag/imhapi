'use strict';

// Load modules

const Hapi = require('hapi');
const Lab = require('lab');
const Code = require('code');
const Server = require('../lib/index');
const Version = require('../lib/version');


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;


describe('/', () => {

    it('should return a Hapi server', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();
            expect(server).to.be.instanceof(Hapi.Server);

            server.stop(done);
        });
    });

    it('starts server on provided port', (done) => {

        Server.init(5000, (err, server) => {

            expect(err).to.not.exist();
            expect(server.info.port).to.equal(5000);

            server.stop(done);
        });
    });

    it('handles register plugin errors', (done) => {

        const orig = Version.register;

        Version.register = function (server, options, next) {

            Version.register = orig;
            return next(new Error('register version failed'));
        };

        Version.register.attributes = {
            name: 'Fake Version'
        };

        Server.init(0, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.equal('register version failed');

            done();
        });
    });
});
