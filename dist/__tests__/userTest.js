"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _helperUtils = _interopRequireDefault(require("../helpers/helperUtils"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var loginUrl = '/api/v1/users/login';
var userLoginDetails = {
  email: 'example@gmail.com',
  password: 'firestar2019'
};
var userToken = '';
describe('Login Users', function () {
  it('should login a user and generatetoken for user', function (done) {
    _chai["default"].request(_index["default"]).post(loginUrl).send(_objectSpread({}, userLoginDetails)).end(function (err, res) {
      res.status.should.equal(200);
      res.body.should.have.property('data');
      res.body.data.should.have.property('token');
      res.body.data.should.have.property('id');

      var validUser = _helperUtils["default"].verifyToken(userToken, res.body.data);

      validUser.should.be.an('boolean');
      done();
    });
  });
  it('should return 200 for successful Login', function (done) {
    _chai["default"].request(_index["default"]).post(loginUrl).send({
      email: 'example1@gmail.com',
      password: 'firestar2019'
    }).end(function (err, res) {
      res.status.should.equal(200);
      res.body.should.have.property('data');
      res.body.data.should.have.property('token');
      res.body.data.should.have.property('id');
      res.body.message.should.equal('Welcome back, your login was successful');
      done();
    });
  });
  it('should return 400 for undefined Login details', function (done) {
    _chai["default"].request(_index["default"]).post(loginUrl).send({
      email: '',
      password: ''
    }).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error');
      done();
    });
  });
  it('should return 400 for undefined Login password detail', function (done) {
    _chai["default"].request(_index["default"]).post(loginUrl).send({
      email: 'example@gmail.com'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error');
      done();
    });
  });
  it('should return 401 for incorrect password login detail', function (done) {
    _chai["default"].request(_index["default"]).post(loginUrl).send({
      email: 'example@gmail.com',
      password: 'barefoot2020'
    }).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.have.property('error');
      res.body.error.should.equal('Password does not match.');
      done();
    });
  });
  it('should return 401 for email not exist for login detail', function (done) {
    _chai["default"].request(_index["default"]).post(loginUrl).send({
      email: 'sample@gmail.com',
      password: 'barefoot2019'
    }).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.have.property('error');
      res.body.error.should.equal('Email does not exist, Please register an account or signup');
      done();
    });
  });
});