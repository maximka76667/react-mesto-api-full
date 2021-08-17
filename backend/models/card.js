const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Имя слишком короткое'],
    maxlength: [30, 'Имя слишком длинное'],
    required: [true, 'Имя обязательное поле'],
  },
  link: {
    type: String,
    validate: {
      validator: (link) => /^(https?:\/\/)(www.)?([\w-]{1,32}\.[\w-]{1,32})[^\s]*#?$/.test(link),
      message: 'Ошибка валидации ссылки',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('card', cardSchema);
