class ParticipantsService {
  constructor({ participantsRepository, usersRepository }) {
    this._participantsRepository = participantsRepository;
    this._usersRepository = usersRepository;
  }

  async create(attributes, authenticatedUserId) {
    try {
      if (~~attributes.user_id !== authenticatedUserId)
        throw new Error('NO_PERMISSION');
      const newparticipants = await this._participantsRepository.create({
        attributes
      });
      return newparticipants;
    } catch (error) {
      throw error;
    }
  }

  async getAll(authenticatedUserId) {
    try {
      const participants = this._participantsRepository.getAll();
      return participants;
    } catch (error) {
      throw error;
    }
  }

  async findByUserId(userId) {
    try {
      const participants = await this._participantsRepository.findByAttribute(
        'user_id',
        userId
      );
      return participants;
    } catch (error) {
      throw error;
    }
  }

  async postByUserId(attributes, authenticatedUserId) {
    attributes.user_id = authenticatedUserId;
    if (authenticatedUserId !== attributes.user_id)
      throw new Error('NO_PERMISSION');
    try {
      const newparticipants = await this._participantsRepository.create({
        attributes
      });
      return newparticipants;
    } catch (error) {
      throw error;
    }
  }

  async update(id, attributes, authenticatedUserId) {
    try {
      const participants = await this._participantsRepository.getById(id);
      if (authenticatedUserId !== participants.user_id)
        throw new Error('NO_PERMISSION');
      participants = await this_participantsRepository.updateById(
        id,
        attributes
      );
      return participants;
    } catch (error) {
      throw error;
    }
  }

  async delete(id, authenticatedUserId) {
    try {
      const participants = await this._participantsRepository.getById(id);
      if (authenticatedUserId !== participants.user_id)
        throw new Error('NO_PERMISSION');
      participants = await this._participantsRepository.deleteById(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ParticipantsService;
