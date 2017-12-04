const AuthenticationController = require('../controllers/AuthenticationController');
const authenticationService = require('./authenticationService');

const authenticationController = new AuthenticationController({
  authenticationService
});

module.exports = authenticationController;
