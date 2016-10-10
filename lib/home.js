'use strict';

const PackageJson = require('../package.json');

const internals = {
    response : {
        version :  PackageJson.version
    }
};

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/home',
        config: {
            description: 'Endpoint home',
            handler: function (request, reply) {

                return reply('Now, You\'re at home');
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Home'
};
