const ParticipantsController = require('../controllers/ParticipantsController');
const ParticipantsService = require('./participantsService');
const UsersService = require('./usersService');
const MeetupsService = require('./meetupsService');

participantsController = new ParticipantsController({
  participantsService: ParticipantsService,
  usersService: UsersService,
  meetupsService:MeetupsService
});

module.exports = participantsController;
