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
        path: '/version',
        config: {
            description: 'Devuelve la version del servidor',
            handler: function (request, reply) {

                return reply(internals.response);
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Version'
};
