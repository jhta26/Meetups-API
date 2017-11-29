const ParticipantsController = require('../controllers/ParticipantsController');
const ParticipantsService = require('../services/ParticipantsService');
const UsersService = require('../services/UsersService');

participantsController = new ParticipantsController({
    participantsService: ParticipantsService,
    usersService: UsersService
});

module.exports = participantsController;