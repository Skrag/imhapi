'use strict';

const Hoek = require('hoek');
const Start = require('./index');

const internals = {};

Start.init(8000, (err, server) => {

    Hoek.assert(!err, err);

    console.log('hola: ' + server.info.uri);
});
