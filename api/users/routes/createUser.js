'use strict';

const Boom = require('boom');

const createUserSchema = require('../schemas/createUser');
const verifyUniqueUser = require('../util/userFunctions').verifyUniqueUser;
const hashPassword = require('../util/hashPassword');
const createToken = require('../util/token');
const User = require('../model/user');

module.exports = {
  method: 'POST',
  path: '/api/users',
  config: {
    // Before the route handler runs, verify that
    // the user is unique and assign the result to 'user'
    pre: [
      {method: verifyUniqueUser, assign: 'user'}
    ],
    handler: (req, res) => {
      let user = {
        email: req.payload.email,
        username: req.payload.username,
        admin: false
      };
      hashPassword(req.payload.password, (err, hash) => {
        if (err) {
          res(Boom.badImplementation('Authentication module internal error'));
        }
        user.password = hash;

        User.insert(user)
          .returning('id').then((userId) => {
          user.id = userId;
          res({id_token: createToken(user)}).code(201);
        }).catch((err) => {
          res(Boom.badImplementation('Database internal error'), err);
        });
      });
    },
    // Validate the payload against the Joi schema
    validate: {
      payload: createUserSchema
    }
  }
};
