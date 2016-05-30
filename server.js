// server.js

'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Blipp = require('blipp');
const glob = require('glob');
const path = require('path');
const secret = require('./config');

const server = new Hapi.Server();

// The connection object takes some
// configuration, including the port
server.connection({port: 3000});

server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
}, (err) => {
  if (err) {
    throw err; // something bad happened loading the plugin
  }

});

server.register(Blipp, (err) => {
  if (err) {
    throw err; // something bad happened loading the plugin
  }

});

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
    const route = require(path.join(__dirname, file));
    server.route(route);
  });
});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  server.log('info', 'Server running at: ' + server.info.uri);
});

module.exports = server;