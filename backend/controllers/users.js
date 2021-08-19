const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET, NODE_ENV } = process.env;
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { errorMessages } = require('../errors/error-config');
const handleErrors = require('../errors/handleErrors');

const { forbiddenErrorMessage } = errorMessages;
const notFoundErrorMessage = errorMessages.notFoundErrorMessages.users;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => next(handleErrors(err)));
};

const getMyUser = (req, res, next) => {
  User.find({ _id: req.user._id })
    .then((user) => res.send({ user: user[0] }))
    .catch((err) => next(handleErrors(err)));
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) throw new NotFoundError(notFoundErrorMessage);
      return res.send({ user });
    })
    .catch((err) => next(handleErrors(err)));
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.init()
        .then(
          User.create({
            name, about, avatar, email, password: hash,
          })
            .then((user) => res.send({
              _id: user._id,
              name,
              about,
              avatar,
              email,
            }))
            .catch((err) => next(handleErrors(err))),
        )
        .catch(next);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) throw new NotFoundError(notFoundErrorMessage);
      if (user._id.toString() !== req.user._id) throw new ForbiddenError(forbiddenErrorMessage);
      return res.send({ user });
    })
    .catch((err) => next(handleErrors(err)));
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) throw new NotFoundError(notFoundErrorMessage);
      if (user._id.toString() !== req.user._id) throw new ForbiddenError(forbiddenErrorMessage);
      return res.send({ user });
    })
    .catch((err) => next(handleErrors(err)));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'jwt-secret',
        { expiresIn: '7d' },
      );

      res
        // .cookie('jwt', token, {
        //   maxAge: 3600000 * 24 * 7,
        //   httpOnly: true,
        //   sameSite: true,
        // })
        .send({ message: 'Авторизация прошла успешно', token })
        .end();
    })
    .catch((err) => next(handleErrors(err)));
};

module.exports = {
  getUsers,
  getMyUser,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
