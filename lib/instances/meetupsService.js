const MeetupsValidator = require('./meetupsValidator');
const MeetupsService = require('../services/MeetupsService');
const UsersRepository = require('./usersRepository');
const MeetupsRepository = require('./meetupsRepository');

module.exports = new MeetupsService({
  meetupsValidator: MeetupsValidator,
  usersRepository: UsersRepository,
  meetupsRepository: MeetupsRepository
});
