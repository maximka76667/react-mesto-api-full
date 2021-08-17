require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-error');
const ConflictError = require('./errors/conflict-error');
const BadRequestError = require('./errors/bad-request-error');
const { errorMessages, DEFAULT_ERROR_CODE } = require('./errors/error-config');
const { validateLink } = require('./utils/validateLink');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());
app.use(limiter);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).custom(validateLink),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use((req, res, next) => {
  next(new NotFoundError(errorMessages.notFoundErrorMessages.routes));
});

app.use((err, req, res, next) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    throw new ConflictError(errorMessages.conflictErrorMessage);
  }
  if (err.name === 'ValidationError') {
    throw new BadRequestError(errorMessages.validationErrorMessage);
  }
  if (err.message === 'Validation failed') {
    throw new BadRequestError(errorMessages.validationErrorMessage);
  }
  if (err.name === 'CastError') {
    throw new BadRequestError(errorMessages.castErrorMessage);
  }
  next(err);
});

app.use((err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR_CODE, message = errorMessages.defaultErrorMessage } = err;

  res
    .status(statusCode)
    .send({ message });

  next();
});

app.listen(3000);
