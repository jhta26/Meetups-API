const Yup = require('yup');

const Validator = require('../validators/Validator');

const schemas = {
  forCreate: {
    name_of_meetup: Yup.string().trim().required().min(2),
    location_name: Yup.string().trim().required().min(2)
  },
  forUpdate: {
    name_of_meetup: Yup.string().trim().min(2),
    location_name: Yup.string().trim().min(2)
  }
};

module.exports = new Validator({
  name: 'meetups',
  schemas
});
