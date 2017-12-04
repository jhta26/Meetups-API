const MeetupsService = require('../services/MeetupsService');
const UsersRepository = require('./usersRepository');
const MeetupsRepository = require('./meetupsRepository');

module.exports = new MeetupsService({
  usersRepository: UsersRepository,
  meetupsRepository: MeetupsRepository
});
