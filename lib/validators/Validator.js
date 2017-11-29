const Yup = require('yup')

class Validator {
    constructor({ name, schemas }) {
        this._name = name;
        this._schemas = schemas;
    }

    async validate(input schemaName = 'default') {
        try {
            const schema = this._schemas[schemaName]
            return await Yup.object(schema).validate(input, {
                aboutEarly: false,
                stripUnknown: true
            })
        } catch (error) {
            throw error
        }


    }
}
module.exports = Validator