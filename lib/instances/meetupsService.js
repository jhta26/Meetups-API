const MeetupsService = require('../services/MeetupsService');
const UsersRepository = require('./usersRepository');
const MeetupsRepository = require('./MeetupsRepository');

module.exports = new MeetupsService({
    usersRepository: UsersRepository,
    meetupsRepository: MeetupsRepository
});