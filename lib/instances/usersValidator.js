const Yup = require('yup');

const Validator = require('../validators/Validator');

const schemas = {
  forCreate: {
    name: Yup.string().trim().required().min(2),
    username: Yup.string().trim().required().min(2),
    password: Yup.string().min(6)
  },
  forUpdate: {
    name: Yup.string().trim().min(2),
    username: Yup.string().trim().min(2)
  }
};

module.exports = new Validator({
  name: 'users',
  schemas
});
