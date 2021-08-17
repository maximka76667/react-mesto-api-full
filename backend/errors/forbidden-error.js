const { FORBIDDEN_ERROR_CODE: statusCode } = require('./error-config');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = statusCode;
  }
}

module.exports = ForbiddenError;
