'use strict';

// Load modules

const Hapi = require('hapi');
const Glue = require('glue');

// Declare internals

const internals = {};

const manifest = {
    connections: [
        {
            port: 8000,
            labels: ['web']
        },
        {
            port: 8001,
            labels: ['admin']
        }
    ],
    registrations: [
        {
            plugin: './version',
            options: {
                select: ['web']
            }
        },
        {
            plugin: './private',
            options: {
                select: ['admin']
            }
        }
    ]
};

const options = {
    relativeTo: __dirname
};

internals.init = function (port, next) {

    const server = new Hapi.Server();
    server.connection({ port: port });

    Glue.compose(manifest, options, (err, server) => {

        if (err) {
            return next(err, null);
        }
        server.start(() => {

            return next(err, server);
        });
    });

};

module.exports = internals;
