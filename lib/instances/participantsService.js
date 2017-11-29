const ParticipantsService = require('../services/ParticipantsService');
const UsersRepository = require('./usersRepository');
const ParticipantsRepository = require('./ParticipantsRepository');

module.exports = new ParticipantsService({
    usersRepository: UsersRepository,
    participantsRepository: ParticipantsRepository
});