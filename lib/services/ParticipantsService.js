class ParticipantsService {
  constructor({
    participantsValidator,
    participantsRepository,
    usersRepository
  }) {
    this._participantsValidator = participantsValidator;
    this._participantsRepository = participantsRepository;
    this._usersRepository = usersRepository;
  }

  async create(attributes, authenticatedUserId) {
    try {
      if (~~attributes.user_id !== authenticatedUserId)
        throw new Error('NO_PERMISSION');
      attributes = await this._participantsValidator.validate(
        attributes,
        'forCreate'
      );
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
    async findByMeetupId(meetupId) {
    try {
      const participants = await this._participantsRepository.findByAttribute(
        'meetup_id',
        meetupId
      );
      return participants;
    } catch (error) {
      throw error;
    }
  }

  async postByUserId(attributes, authenticatedUserId) {
    // attributes.user_id = authenticatedUserId;
    // if (authenticatedUserId !== attributes.user_id)
    //   throw new Error('NO_PERMISSION');
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
    var attributesToUse = Object.assign({}, attributes);
    attributesToUse = await this._participantsValidator.validate(
      attributesToUse,
      'forUpdate'
    );
    try {
      console.log('PARTSERVICE>>>>>>>',attributesToUse,id)
      var authenticatedUserId = authenticatedUserId;
      var participants = await this._participantsRepository.updateById(
        id,
        attributesToUse
      );
      console.log('PARTSERVICE>>>>>>>',participants)
      return participants;
    } catch (error) {
      throw error;
    }
  }

  async delete(id, authenticatedUserId) {
    try {
      var authenticatedUserId = authenticatedUserId;
      var participants = await this._participantsRepository.deleteById(id);
      return participants;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ParticipantsService;
