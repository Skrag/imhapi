'use strict';

const Hapi = require('hapi');
//const Hoek = require('hoek');
const Version = require('./version');

const server = new Hapi.Server();

const internals = {
    init: (port, next) => {

        server.connection({ port: port });

        server.register(Version, (err) => {

            if (err){
                next(err);
            }

            server.start((err) => {

                next(err, server);
            });
        });
    }
};
