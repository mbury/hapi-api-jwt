"use strict";

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'mysql',
    user     : 'root',
    password : 'password',
    database : 'testDB'
  }
});

module.exports = knex;