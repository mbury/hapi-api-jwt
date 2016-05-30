'use strict';

// requires for testing
const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab = exports.lab = Lab.script();

// use some BDD verbage instead of lab default
const describe = lab.describe;
const it = lab.it;
const before = lab.before;

// require hapi server
const Server = require('./testServer');

const createToken = require('../api/users/util/token');

const token = createToken({
  id: 1,
  username: 'tester',
  admin: true
});

// tests
describe('functional tests - products', () => {

  before((done) => {
    done();
  });

  it('should authenticate user', (done) => {
    Server.inject({
      method: 'POST',
      url: '/api/users/authenticate',
      payload: {
        username: 'mbury',
        password: 'secret'
      }
    }, (response) => {
      expect(response.statusCode).to.equal(201);
      expect(response.result.id_token).to.be.a.string();
      done();
    });
  });

  it('should return user list', (done) => {
    Server.inject({
      method: 'GET',
      url: '/api/users',
      headers: {
        "Authorization": "Bearer " + token
      }
    }, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.result).to.be.an.array();
      done();
    });
  });

});