const EntityController = require('./EntityController');

class ParticipantsController extends EntityController {
  constructor({ participantsService, usersService,meetupsService }) {
    super({
      entityName: 'participants',
      entityService: participantsService
    });
    this._usersService = usersService;
    this._meetupsService = meetupsService
    this.postByUsersId = this.postByUsersId.bind(this);
    this.findByUsersId = this.findByUsersId.bind(this);
  }
  async findByUsersId(req, res, next) {
    try {
      const users = await this._usersService.getById(
        req.params.user_id,
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
    async findByMeetupsId(req, res, next) {
    try {
      const meetups = await this._meetupsService.getById(
        req.params.meetup_id,
        
      );
      const participants = await this._entityService.findByMeetupId(meetups.id);
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
        console.log('PARTCONTROLLER',req.params,req.body)
      const users = await this._usersService.getById(
        req.params.user_id,
        req.authenticatedUserId
      );
      const participants = await this._entityService.postByUserId(
        req.body,
        req.authenticatedUserId
      );
      console.log('PARTCONTROLLER',participants)
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
