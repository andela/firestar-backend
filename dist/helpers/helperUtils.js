"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var secretKey = process.env.SECRET_KEY;
var salt = +process.env.SALT;
/**
 * @class Helper
 * @exports Helper
 */

var Helper =
/*#__PURE__*/
function () {
  function Helper() {
    _classCallCheck(this, Helper);
  }

  _createClass(Helper, null, [{
    key: "generateToken",

    /**
     * @method generateToken
     * @param {string} payload
     * @returns token
     */
    value: function generateToken(payload) {
      var token = _jsonwebtoken["default"].sign(payload, secretKey);

      return token;
    }
    /**
     * @method verifyToken
     * @param {string} token
     * @returns payload
     */

  }, {
    key: "verifyToken",
    value: function verifyToken(token) {
      try {
        var payload = _jsonwebtoken["default"].verify(token, secretKey);

        return payload;
      } catch (error) {
        return false;
      }
    }
    /**
     * @method hashPassword
     * @param {string} password
     * @returns {sring} hash password
     */

  }, {
    key: "hashPassword",
    value: function hashPassword(password) {
      return _bcryptjs["default"].hashSync(password, salt);
    }
    /**
     * @method verifyPassword
     * @param {string} password
     * @param hash
     * @returns
     */

  }, {
    key: "verifyPassword",
    value: function verifyPassword(hashPassword, password) {
      return _bcryptjs["default"].compareSync(password, hashPassword);
    }
  }]);

  return Helper;
}();

exports["default"] = Helper;