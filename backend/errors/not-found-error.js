const { NOT_FOUND_ERROR_CODE: statusCode } = require('./error-config');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = statusCode;
  }
}

module.exports = NotFoundError;
