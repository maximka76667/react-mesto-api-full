const BadRequestError = require('./bad-request-error');
const ConflictError = require('./conflict-error');
const { errorMessages } = require('./error-config');

const handleErrors = (err) => {
  if (err.name === 'MongoError' && err.code === 11000) return new ConflictError(errorMessages.conflictErrorMessage);
  if (err.name === 'CastError') return new BadRequestError(errorMessages.castErrorMessage);
  if (err.name === 'ValidationError') return new BadRequestError(errorMessages.validationErrorMessage);
  return err;
};

module.exports = handleErrors;
