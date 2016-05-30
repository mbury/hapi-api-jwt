'use strict';

const Boom = require('boom');
const bcrypt = require('bcrypt');
const Collection = require('lodash/collection');
const User = require('../model/user');

function verifyUniqueUser(req, res) {
  // Find an entry from the database that
  // matches either the email or username
  User.select('username', 'email')
    .where('username', req.payload.username)
    .orWhere('email', req.payload.email)
    .then((users) => {
      if (users) {
        if (Collection.find(users, {'username': req.payload.username})) {
          res(Boom.badRequest('Username taken'));
        }
        if (Collection.find(users, {'email': req.payload.email})) {
          res(Boom.badRequest('Email taken'));
        }
      }
      // If everything checks out, send the payload through
      // to the route handler
      res(req.payload);
    }).catch((err) => {
    res(Boom.badImplementation('Database internal error'), err);
  });
}

function verifyCredentials(req, res) {

  const password = req.payload.password;
  // Find an entry from the database that
  // matches either the email or username
  User.select('id', 'username', 'password', 'email', 'admin')
    .where('username', req.payload.username)
    .orWhere('email', req.payload.email)
    .then((users) => {
      if (users[0]) {
        bcrypt.compare(password, users[0].password, (err, isValid) => {
          if (isValid) {
            res(users[0]);
          }
          else {
            res(Boom.badRequest('Incorrect password!'));
          }
        });
      } else {
        res(Boom.badRequest('Incorrect username or email!'));
      }
    }).catch((err) => {
    res(Boom.badImplementation('Database internal error', err));
  });
}

module.exports = {
  verifyUniqueUser, verifyCredentials
};
