"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _validatorjs = _interopRequireDefault(require("validatorjs"));

var _userService = _interopRequireDefault(require("../services/userService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * UsersValidation
 */
var UsersValidation =
/*#__PURE__*/
function () {
  function UsersValidation() {
    _classCallCheck(this, UsersValidation);
  }

  _createClass(UsersValidation, null, [{
    key: "ValidateUserSignIn",

    /**
     * @returns {object} ValidateUserSignIn
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    value: function () {
      var _ValidateUserSignIn = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var _req$body, email, password, constraint, validation, findIfUserExist;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, password = _req$body.password;
                constraint = {
                  email: 'required|email|min:12|max:30',
                  password: 'required|min:8|max:14|alpha_num'
                };
                validation = new _validatorjs["default"](req.body, constraint);

                if (!validation.fails()) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  error: validation.errors.errors
                }));

              case 5:
                email = email.toLowerCase().trim();
                _context.prev = 6;
                _context.next = 9;
                return _userService["default"].loginAUser(email);

              case 9:
                findIfUserExist = _context.sent;

                if (findIfUserExist) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  error: 'Email does not exist, Please register an account or signup'
                }));

              case 12:
                password = password.trim();
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](6);
                return _context.abrupt("return", res.status(500).json({
                  error: _context.t0.message
                }));

              case 18:
                req.body.email = email;
                req.body.password = password;
                return _context.abrupt("return", next());

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[6, 15]]);
      }));

      function ValidateUserSignIn(_x, _x2, _x3) {
        return _ValidateUserSignIn.apply(this, arguments);
      }

      return ValidateUserSignIn;
    }()
  }]);

  return UsersValidation;
}();

var _default = UsersValidation;
exports["default"] = _default;