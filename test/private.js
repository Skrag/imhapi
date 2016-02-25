'use strict';

// Load modules

const Lab = require('lab');
const Code = require('code');
const Basic = require('hapi-auth-basic');
const Server = require('../lib/index.js');
const Users = require('../lib/users.json');


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;


describe('/private', () => {

    it('returns a greeting for the authenticated user', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            const request = {
                method: 'GET',
                url: '/private',
                headers: {
                    authorization: internals.header('foo', Users.foo.password)
                }
            };
            server.inject(request, (res) => {

                expect(res.statusCode).to.equal(200);
                expect(res.result, 'result').to.equal('hello foo');

                server.stop(done);
            });
        });
    });

    it('errors on wrong password', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            const request = {
                method: 'GET',
                url: '/private',
                headers: {
                    authorization: internals.header('foo', '')
                }
            };
            server.inject(request, (res) => {

                expect(res.statusCode, 'Status code').to.equal(401);

                server.stop(done);
            });
        });
    });

    it('errors on failed auth', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            const request = {
                method: 'GET',
                url: '/private',
                headers: {
                    authorization: internals.header('I do not exist', '')
                }
            };
            server.inject(request, (res) => {

                expect(res.statusCode, 'Status code').to.equal(401);

                server.stop(done);
            });
        });
    });

    it('errors on failed registering of auth', { parallel: false }, (done) => {

        const orig = Basic.register;

        Basic.register = function (server, options, next) {

            Basic.register = orig;
            return next(new Error('register hapi-auth-basic failed'));
        };

        Basic.register.attributes = {
            name: 'Fake hapi-auth-basic'
        };

        Server.init(0, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.equal('register hapi-auth-basic failed');

            done();
        });
    });
});


internals.header = function (username, password) {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};
