'use strict';

const PackageJson = require('../package.json');

const internals = {
    response: {
        version: PackageJson.version
    }
};

//Plugin
exports.register = function (server, options, next){

    server.route({

        method: 'GET',
        path: '/version',
        config: {
            description: 'Devolvemos la versión del servidor',
            handler: function (request, reply){

                return reply(internals.response);
            }
        }
    });

    return next();
};

// Plugin metadata
exports.register.attributes = {

    name: 'version'
};
