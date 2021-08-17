const { UNAUTHORIZED_ERROR_CODE: statusCode } = require('./error-config');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = statusCode;
  }
}

module.exports = UnauthorizedError;
