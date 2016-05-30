// api/users/routes/getUsers.js

'use strict';

const Boom = require('boom');
const User = require('../model/user');

module.exports = {
  method: 'GET',
  path: '/api/users',
  config: {
    handler: (req, res) => {
      User.select('id', 'username', 'email', 'admin').then((users) => {
        if (!users.length) {
          res(Boom.notFound('No users found!'));
        }
        res(users);
      }).catch((err) => {
        res(Boom.badImplementation('Database internal error'), err);
      });
    },
    // Add authentication to this route
    // The user must have a scope of `admin`
    auth: {
      strategy: 'token',
      scope: ['admin']
    }
  }
};
