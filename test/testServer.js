// server.js

'use strict';

const Hapi = require('hapi');
const glob = require('glob');
const path = require('path');
const secret = require('../config');
const mysql = require('mysql');

const server = new Hapi.Server();

// The connection object takes some
// configuration, including the port
server.connection({port: 3000});

server.register(require('hapi-auth-jwt'), (err) => {

  // We're giving the strategy both a name
  // and scheme of 'jwt'
  server.auth.strategy('token', 'jwt', {
    key: secret,
    verifyOptions: {algorithms: ['HS256'], ignoreExpiration: false}
  });

  // Look through the routes in
  // all the subdirectories of API
  // and create a new route for each
  glob.sync('api/**/routes/*.js', {
    root: __dirname
  }).forEach(file => {
    const route = require(path.join(__dirname, '..', file));
    server.route(route);
  });
});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  var db = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'password',
    database: 'testDB'
  });

  db.connect(function(err) {
    if (err) {
      throw err;
    }
  });

  server.decorate('request', 'getDb', function () {
    return db;
  });

  server.log('info', 'Server running at: ' + server.info.uri);
});

module.exports = server;