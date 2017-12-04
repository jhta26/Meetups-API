const EntityController = require('./EntityController');

class ParticipantsController extends EntityController {
  constructor({ participantsService, usersService }) {
    super({
      entityName: 'participants',
      entityService: participantsService
    });
    this._usersService = usersService;
    this.postByUsersId = this.postByUsersId.bind(this);
    this.findByUsersId = this.findByUsersId.bind(this);
  }
  async findByUsersId(req, res, next) {
    try {
      const user_id = parseInt(req.params.user_id);
      const users = await this._usersService.getById(
        user_id,
        req.authenticatedUserId
      );
      const participants = await this._entityService.findByUserId(users.id);
      res.json(participants);
    } catch (error) {
      if (error.message == 'NO_PERMISSION')
        return res.status(403).send('no permission');
      if (error.message == 'ADMIN_ONLY')
        return res.status(403).send('only admin has privileges');
      res.status(500).send('System Error');
    }
  }

  async postByUsersId(req, res, next) {
    try {
      const user_id = parseInt(req.params.user_id);
      const users = await this._usersService.getById(
        user_id,
        req.authenticatedUserId
      );
      const participants = await this._entityService.postByUserId(
        req.body,
        req.authenticatedUserId
      );
      res.json(participants);
    } catch (error) {
      if (error.message == 'NO_PERMISSION')
        return res.status(403).send('no permission');
      if (error.message == 'ADMIN_ONLY')
        return res.status(403).send('only admin has privileges');
      res.status(500).send('System Error');
    }
  }
}

module.exports = ParticipantsController;
