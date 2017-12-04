const AuthenticationService = require('../services/AuthenticationService');
const usersRepository = require('./usersRepository');
const { JWT_KEY } = require('../../env');

const authenticationService = new AuthenticationService({
  JWT_KEY,
  usersRepository
});

module.exports = authenticationService;
