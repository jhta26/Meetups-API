const Yup = require('yup');
const Validator = require('../validators/Validator');

const schemas = {
  forCreate: {
    status: Yup.string().trim().min(0),
    already_there: Yup.string().trim().min(2)
  },
  forUpdate: {
    status: Yup.string().trim().min(6),
    already_there: Yup.string().trim().max(3)
  }
};

module.exports = new Validator({
  name: 'participants',
  schemas
});
