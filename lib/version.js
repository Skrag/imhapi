'use strict';

const internals = {};
internals.PackageJson = require('../package.json');
internals.response = { 'version':  internals.PackageJson.version  };

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
