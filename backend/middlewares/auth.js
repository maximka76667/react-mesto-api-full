const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const ForbiddenError = require('../errors/forbidden-error');
const { errorMessages } = require('../errors/error-config');
const UnauthorizedError = require('../errors/unauthorized-error');

const { forbiddenErrorMessage } = errorMessages;
const { unauthorizedErrorMessage } = errorMessages;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ForbiddenError(forbiddenErrorMessage);
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'jwt-secret');
  } catch (err) {
    throw new UnauthorizedError(unauthorizedErrorMessage);
  }

  req.user = payload;

  return next();
};
