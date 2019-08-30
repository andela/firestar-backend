"use strict";

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var arrayTest = function arrayTest(array, index) {
  return array.indexOf(index);
};

var _default = arrayTest;
exports["default"] = _default;