const UsersService = require('../services/UsersService');
const UsersRepository = require('./usersRepository');
const UsersValidator = require('./usersValidator');

module.exports = new UsersService({
  usersValidator: UsersValidator,
  usersRepository: UsersRepository
});
