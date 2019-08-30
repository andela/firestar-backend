"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _helperUtils = _interopRequireDefault(require("../helpers/helperUtils"));

var _userService = _interopRequireDefault(require("../services/userService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class UsersController
 */
var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "loginAUser",

    /** Login User
     * @static
     * @params {*} req
     * @params {*} res
     * @returns {object} loginUsers
     */
    value: function () {
      var _loginAUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, email, password, loggedUser, validPassword, token, id;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, password = _req$body.password;
                _context.prev = 1;
                _context.next = 4;
                return _userService["default"].loginAUser(email);

              case 4:
                loggedUser = _context.sent;

                if (!loggedUser) {
                  _context.next = 12;
                  break;
                }

                validPassword = _helperUtils["default"].verifyPassword(loggedUser.password, password);

                if (!validPassword) {
                  _context.next = 11;
                  break;
                }

                token = _helperUtils["default"].generateToken(loggedUser.dataValues);
                id = loggedUser.dataValues.id;
                return _context.abrupt("return", res.status(200).json({
                  data: {
                    token: token,
                    id: id
                  },
                  message: 'Welcome back, your login was successful'
                }));

              case 11:
                return _context.abrupt("return", res.status(401).json({
                  error: 'Password does not match.'
                }));

              case 12:
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](1);
                res.status(500).json({
                  status: 500,
                  error: _context.t0.message
                });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 14]]);
      }));

      function loginAUser(_x, _x2) {
        return _loginAUser.apply(this, arguments);
      }

      return loginAUser;
    }()
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;