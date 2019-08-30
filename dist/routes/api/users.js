"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userController = _interopRequireDefault(require("../../controllers/userController"));

var _userValidation = _interopRequireDefault(require("../../validation/userValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/users/login', _userValidation["default"].ValidateUserSignIn, _userController["default"].loginAUser);
var _default = router;
exports["default"] = _default;