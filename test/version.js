'use strict';

// Load modules

const Lab = require('lab');
const Code = require('code');
const Package = require('../package.json');
const Server = require('../lib/index.js');


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;


describe('/version', () => {

    it('should return the package version', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            server.inject('/version', (res) => {

                expect(res.statusCode).to.be.equal(200);
                expect(res.result).to.deep.equal({ version: Package.version });

                server.stop(done);
            });
        });
    });
});
