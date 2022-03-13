require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");

// Validator
const { celebrate, Joi, isCelebrateError } = require("celebrate");
const { validateLink } = require("./utils/validateLink");

// Middlewares
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");

// Controllers
const { login, createUser } = require("./controllers/users");

// Errors
const NotFoundError = require("./errors/not-found-error");
const {
  errorMessages,
  DEFAULT_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
} = require("./errors/error-config");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

const allowedCors = [
  "https://max76667.mesto.nomoredomains.monster",
  "http://max76667.mesto.nomoredomains.monster",
  "localhost:3000",
  "http://localhost:3000",
  "localhost:3001",
  "http://localhost:3001",
  "localhost:5000",
  "http://localhost:5000",
];

const DEFAULT_ALLOWED_METHODS = "GET, HEAD, PUT, PATCH, POST, DELETE";

const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb", {
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

app.use(requestLogger);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedCors.includes(origin)) return callback(null, true);
      return callback(new Error("Ошибка CORS"), true);
    },
    methods: DEFAULT_ALLOWED_METHODS,
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

// User signup
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().min(2).custom(validateLink),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);

// User signin
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);

app.use(auth);

// Routes
app.use("/cards", require("./routes/cards"));
app.use("/users", require("./routes/users"));

app.get("/signout", (req, res) => {
  res.clearCookie("jwt");
});

app.use(errorLogger);

// If route not found
app.use((req, res, next) => {
  next(new NotFoundError(errorMessages.notFoundErrorMessages.routes));
});

// Main Error Handler
app.use((err, req, res, next) => {
  const {
    statusCode = DEFAULT_ERROR_CODE,
    message = errorMessages.defaultErrorMessage,
  } = err;

  if (isCelebrateError(err)) {
    return res
      .status(BAD_REQUEST_ERROR_CODE)
      .send({ message: errorMessages.validationErrorMessage.default });
  }

  res.status(statusCode).send({ message });

  return next();
});

app.listen(3000);
