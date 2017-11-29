const UsersService = require('../services/UsersService');
const UsersRepository = require('./usersRepository');

module.exports = new UsersService({
    usersRepository: UsersRepository
});