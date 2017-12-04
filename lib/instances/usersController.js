const EntityController = require('../controllers/EntityController');
const UsersService = require('./usersService');

usersController = new EntityController({
  entityName: 'users',
  entityService: UsersService
});

module.exports = usersController;
