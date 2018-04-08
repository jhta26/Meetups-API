const EntityController = require('./EntityController');

class MeetupsController extends EntityController {
    constructor({ meetupsService, usersService }) {
        super({
            entityName: 'meetups',
            entityService: meetupsService
        });
        this._usersService = usersService;
        this.postByUsersId = this.postByUsersId.bind(this);
        this.findByUsersId = this.findByUsersId.bind(this);
        this.findAllInvolvedMeetups = this.findAllInvolvedMeetups.bind(this);
    }
    async findByUsersId(req, res, next) {
        try {
            const users = await this._usersService.getById(
                req.params.user_id,
                req.authenticatedUserId
            );
            const meetups = await this._entityService.findByUserId(users.id);

            res.json(meetups);
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
            console.log('POSTBYUSERSIDMEETUPSCONTROLLER');
            const users = await this._usersService.getById(
                req.params.user_id,
                req.authenticatedUserId
            );
            console.log('POSTBYUSERSIDMEETUPSCONTROLLER2', users, req.body);
            const meetups = await this._entityService.postByUserId(
                req.body,
                users.id
            );
            console.log('POSTBYUSERSIDMEETUPSCONTROLLER3', meetups);
            res.json(meetups);
        } catch (error) {
            if (error.message == 'NO_PERMISSION')
                return res.status(403).send('no permission');
            if (error.message == 'ADMIN_ONLY')
                return res.status(403).send('only admin has privileges');
            res.status(500).send('System Error');
        }
    }
    async findAllInvolvedMeetups(req, res, next) {
        try {
            const users = await this._usersService.getById(
                req.params.user_id,
                req.authenticatedUserId
            );

            const meetups = await this._entityService.findAllInvolvedMeetups(
                users.id
            );
            res.json(meetups);
        } catch (error) {
            if (error.message == 'NO_PERMISSION')
                return res.status(403).send('no permission');
            if (error.message == 'ADMIN_ONLY')
                return res.status(403).send('only admin has privileges');
        }
    }
}

module.exports = MeetupsController;