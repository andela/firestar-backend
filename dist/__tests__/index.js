"use strict";

var _assert = require("assert");

var _index = _interopRequireDefault(require("../utils/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      (0, _assert.equal)((0, _index["default"])([1, 2, 3], 4), -1);
    });
  });
});