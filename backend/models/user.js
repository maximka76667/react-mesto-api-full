const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UnauthorizedError = require('../errors/unauthorized-error');
const { errorMessages } = require('../errors/error-config');

const { unauthorizedErrorMessage } = errorMessages;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Имя слишком короткое'],
    maxlength: [30, 'Имя слишком длинное'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Описание слишком короткое'],
    maxlength: [30, 'Описание слишком длинное'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (link) => /^(https?:\/\/)(www.)?([\w-]{1,32}\.[\w-]{1,32})[^\s]*#?$/.test(link),
      message: 'Ошибка валидации ссылки',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Ошибка валидации почтового адреса',
    },
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен'],
    select: false,
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new UnauthorizedError(unauthorizedErrorMessage);
      return bcrypt.compare(password, user.password)
        .then(((matched) => {
          if (!matched) throw new UnauthorizedError(unauthorizedErrorMessage);
          return user;
        }));
    });
};

module.exports = mongoose.model('user', userSchema);
