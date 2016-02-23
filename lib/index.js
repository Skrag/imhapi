'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');

const internals = {};
internals.packageJson = require('../package.json');
internals.response = { 'version': internals.packageJson.version };

//Leemos las variables de entorno
const port = typeof process.env.port !== 'undefined' ? process.env.port : 8000;

const server = new Hapi.Server();
server.connection({ port: port });

server.route({
    method: 'GET',
    path: '/version',
    handler:function (request, reply) {

        reply(internals.response);
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }

    Hoek.assert(!err, err);

    console.log('Server running at:', server.info.uri);
});
