import sayHello from '../src/travis_test';
import chai from 'chai';
const assert = chai.assert;
describe('Travis ', () => {
    it('Should be equal', () => {
        assert.equal(sayHello(200), 200, 'The values should be equal');
    });

});