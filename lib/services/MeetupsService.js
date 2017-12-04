class MeetupsService {
    constructor({ meetupsValidator, meetupsRepository, usersRepository }) {
        this._meetupsValidator = meetupsValidator;
        this._meetupsRepository = meetupsRepository;
        this._usersRepository = usersRepository;
    }

    async create(attributes, authenticatedUserId) {
        try {
            if (~~attributes.user_id !== authenticatedUserId)
                throw new Error('NO_PERMISSION');
            attributes = await this._meetupsValidator.validate(
                attributes,
                'forCreate'
            );
            const newmeetups = await this._meetupsRepository.create({ attributes });
            return newmeetups;
        } catch (error) {
            throw error;
        }
    }
    async getById(id, authenticatedUserId) {
        try {
            const meetups = await this._meetupsRepository.getById(id);

            return meetups;
        } catch (error) {
            throw error;
        }
    }
    async getAll(authenticatedUserId) {
        try {
            var authenticatedUserId = authenticatedUserId;
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

    async findAllInvolvedMeetups(userId) {
        try {
            console.log('MEETUPSSERVICE',userId)
            const allMeetups = await this._meetupsRepository.findAllInvolvedMeetups(userId)
            return allMeetups
        } catch (error) {
            throw error
        }
    }

    async postByUserId(attributes, authenticatedUserId) {
        attributes.creator = authenticatedUserId;
        if (authenticatedUserId !== attributes.creator)
            throw new Error('NO_PERMISSION');
        attributes = Object.assign({}, attributes);
        try {
            const newmeetups = await this._meetupsRepository.create({ attributes });
            return newmeetups;
        } catch (error) {
            throw error;
        }
    }

    async update(id, attributes, authenticatedUserId) {
        var attributesToUse = Object.assign({}, attributes);
        attributesToUse = await this._meetupsValidator.validate(
            attributesToUse,
            'forUpdate'
        );
        try {
            var authenticatedUserId = authenticatedUserId;
            var meetups = await this._meetupsRepository.updateById(
                id,
                attributesToUse
            );
            return meetups;
        } catch (error) {
            throw error;
        }
    }
    async delete(id, authenticatedUserId) {
        try {
            var authenticatedUserId = authenticatedUserId;
            var meetups = await this._meetupsRepository.deleteById(id);
            return meetups;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MeetupsService;