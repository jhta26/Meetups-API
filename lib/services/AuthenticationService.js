const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const signJwt = promisify(jwt.sign);

class AuthenticationService {
  constructor({ JWT_KEY, usersRepository, autheticationValidator }) {
    this._jwtKey = JWT_KEY;
    this._usersRepository = usersRepository;
    this._autheticationValidator = autheticationValidator;
  }
  async authenticate(loginCredentials) {
    try {
      const [user] = await this._usersRepository.findByAttribute(
        'username',
        loginCredentials.username
      );
      if (!user) throw new Error('NO_USER_FOUND');
      const validPw = await bcrypt.compare(
        loginCredentials.password,
        user.hashed_password
      );
      if (!validPw) throw new Error('PASSWORD_NOT_VALID');
      const timeIssued = Math.floor(Date.now() / 1000);
      const timeExpires = timeIssued + 86400 * 14;

      return signJwt(
        {
          iss: 'MeetupsMap',
          aud: 'MeetupsMap',
          iat: timeIssued,
          exp: timeExpires,
          sub: user.id
        },
        this._jwtKey
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthenticationService;
