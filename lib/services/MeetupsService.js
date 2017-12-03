class MeetupsService {
    constructor({ meetupsRepository, usersRepository }) {
        this._meetupsRepository = meetupsRepository;
        this._usersRepository = usersRepository;
    }

    async create(attributes, authenticatedUserId) {
        try {
            if (~~attributes.user_id !== authenticatedUserId)
                throw new Error('NO_PERMISSION');
            const newmeetups = await this._meetupsRepository.create({ attributes });
            return newmeetups;
        } catch (error) {
            throw error;
        }
    }

    async getAll(authenticatedUserId) {
        try {

            const meetups = this._meetupsRepository.getAll();
            return meetups;
        } catch (error) {
            throw error;
        }
    }

    async findByUserId(userId) {
        try {
            const meetups = await this._meetupsRepository.findByAttribute(
                'creator',
                userId
            );
            return meetups;
        } catch (error) {
            throw error;
        }
    }

    async postByUserId(attributes, authenticatedUserId) {
        attributes.user_id = authenticatedUserId;
        if (authenticatedUserId !== attributes.user_id)
            throw new Error('NO_PERMISSION');
        try {
            const newmeetups = await this._meetupsRepository.create({ attributes });
            return newmeetups;
        } catch (error) {
            throw error;
        }
    }

    async update(id, attributes, authenticatedUserId) {
        try {
            const meetups = await this._meetupsRepository.getById(id);
            if (authenticatedUserId !== meetups.user_id)
                throw new Error('NO_PERMISSION');
            meetups = await this_meetupsRepository.updateById(id, attributes);
            return meetups;
        } catch (error) {
            throw error;
        }
    }

    async delete(id, authenticatedUserId) {
        try {
            const meetups = await this._meetupsRepository.getById(id);
            if (authenticatedUserId !== meetups.user_id)
                throw new Error('NO_PERMISSION');
            meetups = await this._meetupsRepository.deleteById(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MeetupsService;