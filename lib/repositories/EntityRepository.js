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
      const [record] = await this._database(this._entityName).insert(
        attributes,
        '*'
      );
      return Object.assign({}, record);
    } catch (error) {
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

  async getGroupByStudent(groupId) {
    try {
      const group = await this._database('groups')
        .join('students', 'students.group_id', '=', 'groups.id')
        .where({ groupId });
      return group;
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
