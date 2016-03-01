'use strict';

const Code = require('code');   // assertion library
const Lab = require('lab');
const Server = require('../lib/index.js');

const PackageJson = require('../package.json');

const internals = {};


const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;

describe('/version', () => {

    it('returns the package name', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();
            server.inject('/version', (res) => {

                expect(res.statusCode).to.be.equal(200);
                expect(res.result).to.deep.equal({ version : PackageJson.version });

                server.stop(done);
            });
        });
    });
});
