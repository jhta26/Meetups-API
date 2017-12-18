class EntityController {
  constructor({ entityName, entityService }) {
    this._entityName = entityName;
    this._entityService = entityService;
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res, next) {
    try {
      const entity = await this._entityService.create(
        req.body,
        req.authenticatedUserId
      );
      res.status(201).json(entity);
    } catch (error) {
      if (error.message == 'NO_PERMISSION')
        return res.status(403).send('no permission');
      if (error.message == 'ADMIN_ONLY')
        return res.status(403).send('only admin has privileges');
      res.status(500).send('System Error');
    }
  }
  async getAll(req, res, next) {
    try {
      const entities = await this._entityService.getAll(
        req.authenticatedUserId
      );
      res.status(200).json(entities);
    } catch (error) {
      if (error.message == 'NO_PERMISSION')
        return res.status(403).send('no permission');
      if (error.message == 'ADMIN_ONLY')
        return res.status(403).send('only admin has privileges');
      res.status(500).send('System Error');
    }
  }
  async getById(req, res, next) {
    try {
      const entity = await this._entityService.getById(
        req.params.id,
        req.authenticatedUserId
      );
      res.status(200).json(entity);
    } catch (error) {
      if (error.message == 'NO_PERMISSION')
        return res.status(403).send('no permission');
      if (error.message == 'ADMIN_ONLY')
        return res.status(403).send('only admin has privileges');
      res.status(500).send('System Error');
    }
  }
  async update(req, res, next) {
    console.log('API>>>>>>>>ENTCON',req.params,req.body)
    try {
      const entity = await this._entityService.update(
        req.params.id,
        req.body,
        req.authenticatedUserId
      );

      res.json(entity);
    } catch (error) {
      if (error.message == 'NO_PERMISSION')
        return res.status(403).send('no permission');
      if (error.message == 'ADMIN_ONLY')
        return res.status(403).send('only admin has privileges');
      res.status(500).send('System Error');
    }
  }
  async delete(req, res, next) {
    try {
      const entity = await this._entityService.delete(
        req.params.id,
        req.authenticatedUserId
      );

      res.status(202).json(entity);
    } catch (error) {
      if (error.message == 'NO_PERMISSION')
        return res.status(403).send('no permission');
      if (error.message == 'ADMIN_ONLY')
        return res.status(403).send('only admin has privileges');
      res.status(500).send('System Error');
    }
  }
}

module.exports = EntityController;
