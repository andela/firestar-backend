const testFunc = require('../src/travis_test');
const chai = require('chai');
const assert = chai.assert;
describe('Travis ', () => {
    it('Should be equal', () => {
        assert.equal(testFunc(200), 200, 'The values should be equal')
    })

})