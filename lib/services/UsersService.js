const bcrypt = require('bcryptjs');

class UsersService {
    constructor({ usersRepository }) {
        this._usersRepository = usersRepository;
    }

    async create(attributes, authenticatedUserId) {
        try {
            attributes = Object.assign({}, attributes);
            // attributes = await this._userValidator.validate(attributes, 'forCreate');
            const hashedPassword = await bcrypt.hash(attributes.password, 10);
            delete attributes.password;
            attributes.hashed_password = hashedPassword;
            const user = await this._usersRepository.create({ attributes });
            delete user.hashedPassword;
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getAll(authenticatedUserId) {
        try {
            const users = await this._usersRepository.getAll();
            return (users = users.map(user => {
                delete user.hashedPassword;
                return user;
            }));
        } catch (error) {
            throw error;
        }
    }

    async getById(id, authenticatedUserId) {
        const compare = await this._usersRepository.getById(authenticatedUserId);
        try {
            const user = await this._usersRepository.getById(id);
            delete user.hashedPassword;
            return user;
        } catch (error) {
            throw error;
        }
    }

    async update(id, attributes, authenticatedUserId) {
        try {
            // attributes = await this._userValidator.validate(attributes, 'forUpdate');
            const user = await this._userRepository.update(id, attributes);
            delete user.hashedPassword;
            return user;
        } catch (error) {
            throw error;
        }
    }

    async delete(id, authenticatedUserId) {
        try {
            const user = await this._userRepository.deleteById(id);
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UsersService;