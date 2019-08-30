"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _errorhandler = _interopRequireDefault(require("errorhandler"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _morgan = _interopRequireDefault(require("morgan"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _debug = _interopRequireDefault(require("debug"));

var _routes = _interopRequireDefault(require("./routes"));

var _swagger = _interopRequireDefault(require("../swagger.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */

/* eslint-disable no-unused-vars */
var serverLog = (0, _debug["default"])('server');
var isProduction = process.env.NODE_ENV === 'production';
var app = (0, _express["default"])();
app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"])); // Configure dotEnv

_dotenv["default"].config(); // Normal express config defaults


app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use((0, _methodOverride["default"])());
app.use(_express["default"]["static"]("".concat(__dirname, "/public")));
app.use((0, _expressSession["default"])({
  secret: 'authorshaven',
  cookie: {
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: false
}));

if (!isProduction) {
  app.use((0, _errorhandler["default"])());
}

app.use(_routes["default"]);
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use(function (err, req, res, next) {
    serverLog(err.stack);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});
var server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port ".concat(server.address().port));
});
var _default = app;
exports["default"] = _default;