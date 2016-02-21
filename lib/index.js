'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');
const Version = require('./version');



const server = new Hapi.Server();
server.connection({ port: process.env.PORT || '8000' });

server.register(Version, (err) => {

    if (err) {
        console.error('Failed to load plugin:', err);
    }
    Hoek.assert(!err, err);

    server.start((err) => {

        if (err) {
            throw err;
        }
        Hoek.assert(!err, err);

        console.log('Server running at:', server.info.uri);
    });
});
