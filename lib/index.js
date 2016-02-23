'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');
const Package = require('../package.json');

//Leemos las variables de entorno
const port = process.env.port;

const server = new Hapi.Server();
server.connection({ port: port });

server.route({
    method: 'GET',
    path: '/version',
    handler:function (request, reply) {

        reply({ 'version': Package.version });
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }

    Hoek.assert(!err, err);

    console.log('Server running at:', server.info.uri);
});
