'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');
const Version = require('./version');

//Leemos las variables de entorno
const port = typeof process.env.port !== 'undefined' ? process.env.port : 8000;

const internals = {};

internals.init = function (){

    const server = new Hapi.Server();
    server.connection({ port: port });
    server.register(Version, (err) => {

        Hoek.assert(!err, err);
        server.start((err) => {

            Hoek.assert(!err, err);
            console.log('Server running at:', server.info.uri);
        });
    });
};

internals.init();
