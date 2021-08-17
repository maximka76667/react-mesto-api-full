const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const DEFAULT_ERROR_CODE = 500;

const errorMessages = {
  validationErrorMessage: 'Переданы некорректные данные',
  unauthorizedErrorMessage: 'Ошибка авторизации',
  forbiddenErrorMessage: 'Отказано в доступе',
  notFoundErrorMessages: {
    cards: 'Карточка с указанным _id не найдена.',
    users: 'Пользователь по указанному _id не найден.',
    routes: 'Запрашиваемый маршрут не найден',
  },
  castErrorMessage: 'Невалидный id ',
  conflictErrorMessage: 'Почтовый адрес уже используется',
  defaultErrorMessage: 'На сервере произошла ошибка',
};

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  errorMessages,
};
