'use strict';

// Load modules

const Hoek = require('hoek');
const Server = require('./index.js');


// Declare internals

const internals = {};


Server.init(8000, (err, server) => {

    if (err) {
        Hoek.assert(!err, err);
    }

    console.log('Server running at:', server.info.uri);
});
