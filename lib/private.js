'use strict';

// Load modules
const Basic = require('hapi-auth-basic');
const Users = require('./users.json');


// Declare internals

const internals = {};

internals.validateFunc = function (request, username, password, callback) {

    const user = Users[username];

    if (!user || user.password !== password) {
        return callback(null, false);
    }

    return callback(null, true, { username: username });
};


exports.register = function (server, options, next) {

    server.register(Basic, (err) => {

        if (err) {
            return next(err);
        }

        server.auth.strategy('basic', 'basic', { validateFunc: internals.validateFunc });
        server.route({
            method: 'GET',
            path: '/private',
            config: {
                auth: 'basic',
                description: 'Returns a greeting message to the authenticated user',
                handler: (request, reply) => {

                    return reply('hello ' + request.auth.credentials.username);
                }
            }
        });

        return next();
    });
};

exports.register.attributes = {
    name: 'Private'
};
