'use strict';

const internals = {
    response: {
        version: require('../package.json').version
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
