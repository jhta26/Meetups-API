const MeetupsController = require('../controllers/MeetupsController');
const MeetupsService = require('../services/MeetupsService');
const UsersService = require('../services/UsersService');

meetupsController = new MeetupsController({
    meetupsService: MeetupsService,
    usersService: UsersService
});

module.exports = meetupsController;