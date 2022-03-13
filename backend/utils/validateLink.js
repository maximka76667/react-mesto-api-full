const validator = require('validator');
const BadRequestError = require('../errors/bad-request-error');
const { errorMessages } = require('../errors/error-config');

const validateLink = (value) => {
  const result = validator.isURL(value);
  if (result) return value;
  throw new BadRequestError(errorMessages.validationErrorMessage.default);
};

module.exports = { validateLink };
