const validator = require('validator');
const isEmpty = require( "./is-empty");

exports = function validateRegisterInput(data) {
  let errors = {}

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'name must be between 2 and 30 characters'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
