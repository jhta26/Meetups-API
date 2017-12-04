const ParticipantsValidator = require('./participantsValidator');
const ParticipantsService = require('../services/ParticipantsService');
const UsersRepository = require('./usersRepository');
const ParticipantsRepository = require('./ParticipantsRepository');

module.exports = new ParticipantsService({
  participantsValidator: ParticipantsValidator,
  usersRepository: UsersRepository,
  participantsRepository: ParticipantsRepository
});
