const { CONFLICT_ERROR_CODE: statusCode } = require('./error-config');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = statusCode;
  }
}

module.exports = ConflictError;
