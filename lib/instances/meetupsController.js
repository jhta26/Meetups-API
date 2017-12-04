const MeetupsController = require('../controllers/MeetupsController');
const MeetupsService = require('./meetupsService')
const UsersService = require('./usersService')

module.exports = new MeetupsController({
    meetupsService: MeetupsService,
    usersService: UsersService
});