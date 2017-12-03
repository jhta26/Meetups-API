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
            delete user.hashed_password;
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getAll(authenticatedUserId) {

        try {
            var authenticatedUserId = authenticatedUserId
            var users = await this._usersRepository.getAll(authenticatedUserId);

            users = users.map(user => {
                delete user.hashed_password;
                return user;
            })

            return users;
        } catch (error) {
            throw error;
        }
    }

    async getById(id, authenticatedUserId) {
        const compare = await this._usersRepository.getById(authenticatedUserId);
        try {
            const user = await this._usersRepository.getById(id);
            delete user.hashed_password;
            return user;
        } catch (error) {
            throw error;
        }
    }

    async update(id, attributes, authenticatedUserId) {
        var attributesToUse = Object.assign({}, attributes)
        try {
            var authenticatedUserId = authenticatedUserId
            // attributes = await this._userValidator.validate(attributes, 'forUpdate');
            const user = await this._usersRepository.updateById(id, attributesToUse);
            delete user.hashed_password;
            return user;
        } catch (error) {
            throw error;
        }
    }

    async delete(id, authenticatedUserId) {
        try {
            const user = await this._usersRepository.deleteById(id);
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UsersService;