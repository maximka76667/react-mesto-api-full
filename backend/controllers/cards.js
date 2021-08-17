const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { errorMessages } = require('../errors/error-config');

const notFoundErrorMessage = errorMessages.notFoundErrorMessages.cards;
const { forbiddenErrorMessage } = errorMessages;

const getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(notFoundErrorMessage);
      }
      if (card.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError(forbiddenErrorMessage);
      }
      return res.send({ card });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: {
        likes: req.user._id,
      },
    }, {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(notFoundErrorMessage);
      }
      return res.send({ card });
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: {
        likes: req.user._id,
      },
    }, {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(notFoundErrorMessage);
      }
      return res.send({ card });
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
