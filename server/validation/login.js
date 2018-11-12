const Validator = require('validator');
const isEmpty = require( "./is-empty");

module.exports = function validateLoginInput(data, e, req) {
  let errors = {}

  // ensure empty string if empty
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // email validations
  if (Validator.isEmpty(data.email)) {
    errors.email = 'email field is required'
  }

  // password validations
  if (Validator.isEmpty(data.password)) {
    errors.password = 'password field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
