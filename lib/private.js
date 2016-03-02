'use strict';

//const Bcrypt = require('bcrypt');
const Basic = require('hapi-auth-basic');
const Users = require('../resources/users.json');

const internals = {};

internals.validate = function (request, username, password, callback) {

    const user = Users.users[username];
    if (user && user.password === password){
        return callback(null, true, { id: user.id, name: user.name });
    }
    return callback(null, false);
};

exports.register = function (server, options, next) {

    server.register(Basic, (err) => {

        if (err){
            return next(err);
        }

        server.auth.strategy('simple', 'basic', { validateFunc: internals.validate });

        server.route({
            method: 'GET',
            path: '/private',
            config: {
                description: 'Area privada',
                auth: 'simple',
                handler: function (request, reply) {

                    return reply('hello, ' + request.auth.credentials.name);
                }
            }
        });
    });

    return next();
};

exports.register.attributes = {
    name: 'Private'
};
