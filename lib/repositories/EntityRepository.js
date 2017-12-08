class EntityRepository {
  constructor({ entityName, database }) {
    this._entityName = entityName;
    this._database = database;
  }

  async getAll() {
    try {
      const allEnt = await this._database(this._entityName);
      return allEnt;
    } catch (error) {
      throw error;
    }
  }

  async create({ attributes }) {
    try {
      console.log('ENTREP', attributes);
      var [record] = await this._database(this._entityName).insert(
        attributes,
        '*'
      );

      return Object.assign({}, record);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const [oneEnt] = await this._database(this._entityName).where({ id });
      return oneEnt;
    } catch (error) {
      throw error;
    }
  }

  async findAllInvolvedMeetups(id) {
    try {
      const allMeetups = await this._database(this._entityName)
        .from('meetups')
        .innerJoin('participants', 'participants.meetup_id', 'meetups.id')
        .where('user_id', id);

      return allMeetups;
    } catch (error) {
      throw error;
    }
  }

  async findByAttribute(attributeName, attributeValue) {
    try {
      const records = await this._database(this._entityName).where(
        attributeName,
        attributeValue
      );
      return records;
    } catch (error) {
      throw error;
    }
  }

  async updateById(id, body) {
    try {
      const [ent] = await this._database(this._entityName)
        .update(body, '*')
        .where({ id });

      return ent;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const [ent] = await this._database(this._entityName)
        .del('*')
        .where({ id });
      return ent;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = EntityRepository;
