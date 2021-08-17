const { BAD_REQUEST_ERROR_CODE: statusCode } = require('./error-config');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = statusCode;
  }
}

module.exports = BadRequestError;
