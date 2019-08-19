var testFunc = require('../src/travis_test');
var chai = require('chai');
var assert = chai.assert;
describe('Travis ', function () {
    it('Should be equal', function () {
        assert.equal(testFunc(200), 200, 'The values should be equal');
    });

});