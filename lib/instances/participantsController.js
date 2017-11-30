const ParticipantsController = require('../controllers/ParticipantsController');
const ParticipantsService = require('./participantsService');
const UsersService = require('./usersService');

participantsController = new ParticipantsController({
    participantsService: ParticipantsService,
    usersService: UsersService
});

module.exports = participantsController;