const MeetupsController = require('../controllers/MeetupsController');


module.exports = new MeetupsController({
    meetupsService: require('./meetupsService'),
    usersService: require('./usersService')
});